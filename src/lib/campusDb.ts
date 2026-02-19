/**
 * Load campus SQLite DB (public/campus.db) and run queries.
 * DB is built by scripts/build-db.mjs from data/ CSVs.
 */
import type { FacultyMember, StudentRecord } from "@/data/types";

let db: import("sql.js").Database | null = null;
let initPromise: Promise<void> | null = null;

async function getDb(): Promise<import("sql.js").Database> {
  if (db) return db;
  if (initPromise) await initPromise;
  initPromise = (async () => {
    const initSqlJs = (await import("sql.js")).default;
    const SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });
    const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
    const res = await fetch(`${base}/campus.db`);
    if (!res.ok) throw new Error("campus.db not found. Run: npm run build-db");
    const buf = await res.arrayBuffer();
    db = new SQL.Database(new Uint8Array(buf));
  })();
  await initPromise;
  return db!;
}

export interface StudentRow {
  id: number;
  sr_no: string;
  email: string;
  name: string;
  enrollment_no: string;
  branch: string;
  elective_4: string;
  elective_2: string;
  industrial_practice: string;
}

function rowToStudent(r: StudentRow): StudentRecord {
  return {
    srNo: r.sr_no,
    email: r.email,
    name: r.name,
    enrollmentNo: r.enrollment_no,
    branch: r.branch,
    elective4: r.elective_4,
    elective2: r.elective_2,
    industrialPractice: r.industrial_practice,
  };
}

/** Fetch all students matching a program/elective/branch (e.g. "cyber security", "CSE", "machine learning") */
export async function queryStudentsByProgram(programOrElective: string): Promise<StudentRecord[]> {
  const database = await getDb();
  const like = `%${programOrElective.replace(/'/g, "''")}%`;
  const stmt = database.prepare(`
    SELECT id, sr_no, email, name, enrollment_no, branch, elective_4, elective_2, industrial_practice
    FROM students
    WHERE branch LIKE ? OR elective_4 LIKE ? OR elective_2 LIKE ? OR industrial_practice LIKE ?
    ORDER BY name
  `);
  stmt.bind([like, like, like, like]);
  const rows: StudentRecord[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as unknown as StudentRow;
    rows.push(rowToStudent(row));
  }
  stmt.free();
  return rows;
}

/** Fetch all students (optional filter by branch) */
export async function queryAllStudents(branchFilter?: string): Promise<StudentRecord[]> {
  const database = await getDb();
  let sql = `SELECT id, sr_no, email, name, enrollment_no, branch, elective_4, elective_2, industrial_practice FROM students ORDER BY name`;
  if (branchFilter?.trim()) {
    const like = `%${branchFilter.replace(/'/g, "''")}%`;
    sql = `SELECT id, sr_no, email, name, enrollment_no, branch, elective_4, elective_2, industrial_practice FROM students WHERE branch LIKE ? OR elective_4 LIKE ? OR elective_2 LIKE ? ORDER BY name`;
    const stmt = database.prepare(sql);
    stmt.bind([like, like, like]);
    const rows: StudentRecord[] = [];
    while (stmt.step()) rows.push(rowToStudent(stmt.getAsObject() as unknown as StudentRow));
    stmt.free();
    return rows;
  }
  const stmt = database.prepare(sql);
  const rows: StudentRecord[] = [];
  while (stmt.step()) rows.push(rowToStudent(stmt.getAsObject() as unknown as StudentRow));
  stmt.free();
  return rows;
}

/** Fetch one student by enrollment number */
export async function queryStudentByEnrollment(enrollmentNo: string): Promise<StudentRecord | null> {
  const database = await getDb();
  const normalized = enrollmentNo.replace(/\s/g, "");
  const stmt = database.prepare(
    `SELECT id, sr_no, email, name, enrollment_no, branch, elective_4, elective_2, industrial_practice FROM students WHERE REPLACE(enrollment_no, ' ', '') = ?`
  );
  stmt.bind([normalized]);
  const row = stmt.step() ? (stmt.getAsObject() as unknown as StudentRow) : null;
  stmt.free();
  return row ? rowToStudent(row) : null;
}

/** Fetch one student by name (fuzzy) */
export async function queryStudentByName(name: string): Promise<StudentRecord[]> {
  const database = await getDb();
  const like = `%${name.replace(/'/g, "''")}%`;
  const stmt = database.prepare(
    `SELECT id, sr_no, email, name, enrollment_no, branch, elective_4, elective_2, industrial_practice FROM students WHERE name LIKE ? ORDER BY name`
  );
  stmt.bind([like]);
  const rows: StudentRecord[] = [];
  while (stmt.step()) rows.push(rowToStudent(stmt.getAsObject() as unknown as StudentRow));
  stmt.free();
  return rows;
}

export interface FacultyRow {
  id: number;
  name: string;
  designation: string;
  email: string;
  expertise: string;
}

function rowToFaculty(r: FacultyRow): FacultyMember {
  return { name: r.name, designation: r.designation, email: r.email, expertise: r.expertise };
}

/** Fetch all faculty */
export async function queryAllFaculty(): Promise<FacultyMember[]> {
  const database = await getDb();
  const stmt = database.prepare(`SELECT id, name, designation, email, expertise FROM faculty ORDER BY name`);
  const rows: FacultyMember[] = [];
  while (stmt.step()) rows.push(rowToFaculty(stmt.getAsObject() as unknown as FacultyRow));
  stmt.free();
  return rows;
}

/** Fetch faculty by name (fuzzy) */
export async function queryFacultyByName(name: string): Promise<FacultyMember[]> {
  const database = await getDb();
  const like = `%${name.replace(/'/g, "''")}%`;
  const stmt = database.prepare(`SELECT id, name, designation, email, expertise FROM faculty WHERE name LIKE ? ORDER BY name`);
  stmt.bind([like]);
  const rows: FacultyMember[] = [];
  while (stmt.step()) rows.push(rowToFaculty(stmt.getAsObject() as unknown as FacultyRow));
  stmt.free();
  return rows;
}

/** Check if DB is available (e.g. after build-db) */
export async function isDbAvailable(): Promise<boolean> {
  try {
    await getDb();
    return true;
  } catch {
    return false;
  }
}
