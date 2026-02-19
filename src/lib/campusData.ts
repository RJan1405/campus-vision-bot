import type { FacultyMember, StudentRecord } from "@/data/types";

const DATA_BASE = "/data";

/** Parse a CSV line respecting quoted fields */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if ((c === "," && !inQuotes) || (c === "\n" && !inQuotes)) {
      result.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

/** Parse CSV text into rows (first row = headers) */
function parseCSV(csvText: string): { headers: string[]; rows: string[][] } {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map((l) => parseCSVLine(l));
  return { headers, rows };
}

export interface CampusData {
  faculty: FacultyMember[];
  eventsRulesText: string;
  students: StudentRecord[];
  loaded: boolean;
  error: string | null;
}

const emptyCampusData: CampusData = {
  faculty: [],
  eventsRulesText: "",
  students: [],
  loaded: false,
  error: null,
};

let cached: CampusData = { ...emptyCampusData };

async function fetchText(path: string): Promise<string> {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.text();
}

/** Load faculty from Facultydata.csv */
async function loadFaculty(): Promise<FacultyMember[]> {
  const text = await fetchText(`${DATA_BASE}/Facultydata.csv`);
  const { headers, rows } = parseCSV(text);
  const nameIdx = headers.findIndex((h) => /name/i.test(h));
  const designationIdx = headers.findIndex((h) => /designation/i.test(h));
  const emailIdx = headers.findIndex((h) => /email/i.test(h));
  const expertiseIdx = headers.findIndex((h) => /interest|expertise|areas/i.test(h));
  if (nameIdx < 0 || emailIdx < 0) return [];
  return rows
    .filter((row) => row[nameIdx]?.trim())
    .map((row) => ({
      name: (row[nameIdx] ?? "").trim(),
      designation: (row[designationIdx] ?? "Assistant Professor").trim(),
      email: (row[emailIdx] ?? "").trim(),
      expertise: (row[expertiseIdx] ?? "").trim(),
    }));
}

/** Load TecXplore events rules as raw text for search */
async function loadEventsRules(): Promise<string> {
  try {
    return await fetchText(`${DATA_BASE}/TecXplore%203.0%20Events%20Rules.txt`);
  } catch {
    return "";
  }
}

/** Load students from Sem 4 division CSV (first file found) */
async function loadStudents(): Promise<StudentRecord[]> {
  const names = [
    "2_1_25%20%20Sem%204%20Updated%20Division.csv",
    "2_1_25%20%20Sem%204%20Updated%20Division(1).csv",
    "2_1_25%20%20Sem%204%20Updated%20Division(2).csv",
  ];
  for (const name of names) {
    try {
      const text = await fetchText(`${DATA_BASE}/${name}`);
      const { headers, rows } = parseCSV(text);
      const get = (row: string[], key: string) => {
        const i = headers.findIndex((h) => h.toLowerCase().includes(key));
        return (i >= 0 ? row[i] : "").trim();
      };
      const list: StudentRecord[] = rows
        .filter((r) => get(r, "enrollment") || get(r, "name"))
        .map((row) => ({
          srNo: get(row, "sr") || get(row, "no"),
          email: get(row, "email"),
          name: get(row, "student name") || get(row, "name"),
          enrollmentNo: get(row, "enrollment"),
          branch: get(row, "branch") || get(row, "admitted"),
          elective4: get(row, "elective iv") || get(row, "programme elective iv"),
          elective2: get(row, "elective ii") || get(row, "programme elective ii"),
          industrialPractice: get(row, "industrial") || get(row, "skills"),
        }));
      if (list.length > 0) return list;
    } catch {
      continue;
    }
  }
  return [];
}

/** Load all campus data from the data folder. Results are cached. */
export async function loadCampusData(): Promise<CampusData> {
  if (cached.loaded && !cached.error) return cached;
  const result: CampusData = {
    faculty: [],
    eventsRulesText: "",
    students: [],
    loaded: true,
    error: null,
  };
  try {
    const [faculty, eventsRulesText, students] = await Promise.all([
      loadFaculty().catch(() => []),
      loadEventsRules(),
      loadStudents().catch(() => []),
    ]);
    result.faculty = faculty;
    result.eventsRulesText = eventsRulesText;
    result.students = students;
    cached = { ...result };
  } catch (e) {
    result.loaded = true;
    result.error = e instanceof Error ? e.message : "Failed to load data";
    cached = { ...result };
  }
  return result;
}

/** Get cached campus data (may not be loaded yet) */
export function getCampusData(): CampusData {
  return cached;
}

/** Reset cache (e.g. for reload) */
export function clearCampusDataCache(): void {
  cached = { ...emptyCampusData };
}
