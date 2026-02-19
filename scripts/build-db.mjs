#!/usr/bin/env node
/**
 * Builds SQLite DB from data/ CSVs and writes public/campus.db for the frontend.
 * Run: node scripts/build-db.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import initSqlJs from "sql.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const outPath = path.join(root, "public", "campus.db");

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = [];
    let current = "";
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') inQuotes = !inQuotes;
      else if ((c === "," && !inQuotes) || (c === "\n" && !inQuotes)) {
        values.push(current.trim());
        current = "";
      } else current += c;
    }
    values.push(current.trim());
    rows.push(values);
  }
  return { headers, rows };
}

function findCol(headers, ...keys) {
  const h = headers.map((x) => x.toLowerCase());
  for (const k of keys) {
    const i = h.findIndex((x) => x.includes(k.toLowerCase()));
    if (i >= 0) return i;
  }
  return -1;
}

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE faculty (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      designation TEXT,
      email TEXT,
      expertise TEXT
    );
  `);
  db.run(`
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sr_no TEXT,
      email TEXT,
      name TEXT NOT NULL,
      enrollment_no TEXT,
      branch TEXT,
      elective_4 TEXT,
      elective_2 TEXT,
      industrial_practice TEXT
    );
  `);
  db.run(`CREATE INDEX idx_students_branch ON students(branch);`);
  db.run(`CREATE INDEX idx_students_elective_4 ON students(elective_4);`);
  db.run(`CREATE INDEX idx_students_elective_2 ON students(elective_2);`);
  db.run(`CREATE INDEX idx_faculty_name ON faculty(name);`);

  const facultyPath = path.join(dataDir, "Facultydata.csv");
  if (fs.existsSync(facultyPath)) {
    const { headers, rows } = parseCSV(fs.readFileSync(facultyPath, "utf-8"));
    const nameIdx = findCol(headers, "name");
    const desIdx = findCol(headers, "designation");
    const emailIdx = findCol(headers, "email");
    const expIdx = findCol(headers, "expertise", "interest", "areas");
    if (nameIdx >= 0 && emailIdx >= 0) {
      const ins = db.prepare(
        "INSERT INTO faculty (name, designation, email, expertise) VALUES (?, ?, ?, ?)"
      );
      for (const row of rows) {
        if (row.length <= nameIdx) continue;
        const name = row[nameIdx]?.trim();
        if (!name) continue;
        ins.run([
          name,
          String((row[desIdx] ?? "").trim() || "Assistant Professor"),
          String((row[emailIdx] ?? "").trim()),
          String((row[expIdx] ?? "").trim()),
        ]);
      }
      ins.free();
      console.log("Inserted", rows.filter((r) => r[nameIdx]?.trim()).length, "faculty");
    }
  }

  const divisionFiles = [
    "2_1_25  Sem 4 Updated Division.csv",
    "2_1_25  Sem 4 Updated Division(1).csv",
    "2_1_25  Sem 4 Updated Division(2).csv",
  ];
  let studentsInserted = 0;
  for (const name of divisionFiles) {
    const p = path.join(dataDir, name);
    if (!fs.existsSync(p)) continue;
    const { headers, rows } = parseCSV(fs.readFileSync(p, "utf-8"));
    const get = (row, ...keys) => {
      const i = findCol(headers, ...keys);
      return (i >= 0 ? row[i] : "").trim();
    };
    const ins = db.prepare(`
      INSERT INTO students (sr_no, email, name, enrollment_no, branch, elective_4, elective_2, industrial_practice)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const row of rows) {
      const enrollment = get(row, "enrollment");
      const nameVal = get(row, "student name", "name");
      if (!enrollment && !nameVal) continue;
      ins.run([
        get(row, "sr", "no"),
        get(row, "email"),
        nameVal || "—",
        enrollment,
        get(row, "branch", "admitted"),
        get(row, "programme elective iv", "programe elective iv", "elective iv"),
        get(row, "programme elective ii", "programe elective ii", "elective ii"),
        get(row, "industrial", "skills"),
      ]);
      studentsInserted++;
    }
    ins.free();
    if (studentsInserted > 0) break;
  }
  console.log("Inserted", studentsInserted, "students");

  const buf = db.export();
  const dir = path.dirname(outPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(buf));
  db.close();
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
