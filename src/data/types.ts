export interface TecXploreEvent {
  id: string;
  name: string;
  category: "technical" | "non-technical" | "robotics" | "esports" | "funzone";
  synopsis: string;
  teamSize: string;
  fee: string;
  aiAllowed: boolean;
  individual: boolean;
  judgingCriteria: string[];
  rules: string[];
  contactPerson?: string;
  contactPhone?: string;
  additionalInfo?: Record<string, string>;
}

export interface Program {
  name: string;
  duration: string;
  fee: string;
  type: "UG" | "PG" | "Integrated";
  description: string;
}

export interface FacultyMember {
  name: string;
  designation: string;
  email: string;
  expertise: string;
}

export interface MagazineArticle {
  title: string;
  author: string;
  summary: string;
}

export interface PlacementEntry {
  company: string;
  roles: string;
  date: string;
}

export interface StudentRecord {
  srNo: string;
  email: string;
  name: string;
  enrollmentNo: string;
  branch: string;
  elective4: string;
  elective2: string;
  industrialPractice: string;
}

export interface SeniorProfile {
  name: string;
  branch: string;
  year: string;
  role: string;
  cgpa?: string;
  company?: string;
  focus: string[];
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description: string;
  }>;
  achievements: string[];
  bio: string;
}
