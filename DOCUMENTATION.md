# Campus Vision Bot - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Purpose and Goals](#purpose-and-goals)
3. [Technologies and Languages](#technologies-and-languages)
4. [Architecture](#architecture)
5. [Features and Functionalities](#features-and-functionalities)
6. [Project Structure](#project-structure)
7. [Data Sources](#data-sources)
8. [Setup and Installation](#setup-and-installation)
9. [Key Components](#key-components)
10. [Configuration](#configuration)
11. [Team](#team)

---

## 🎯 Project Overview

**Campus Vision Bot** is an intelligent web application designed for **TecXplore 3.0**, the technical fest of **AMTICS (Asha M. Tarsadia Institute of Computer Science and Technology)**. It serves as a comprehensive information platform providing AI-powered search, filtering, and data retrieval capabilities for campus events, faculty information, student records, and institute details.

### Key Highlights

- **Real-time AI Chatbot** with natural language understanding
- **Voice-enabled interaction** for hands-free queries
- **Smart event filtering** by budget, team size, category, and AI allowance
- **Event comparison** tool for side-by-side analysis
- **Live data integration** from CSV files (faculty, students, divisions)
- **SQLite database** for efficient student data queries
- **Responsive glassmorphism UI** with dark theme

---

## 🎓 Purpose and Goals

### Primary Purpose

To create an intelligent, user-friendly information portal that helps TecXplore 3.0 participants, students, and faculty quickly find relevant information about:

- **Technical and non-technical events** at TecXplore 3.0
- **Faculty members** and their expertise areas
- **Student records** including enrollment, branches, and electives
- **Institute information** including programs, placements, and facilities
- **Event rules, fees, and judging criteria**

### Goals

1. **Accessibility**: Make campus information easily accessible through conversational AI
2. **Efficiency**: Reduce information search time with smart filtering and comparison tools
3. **Innovation**: Showcase AI/ML capabilities in a real-world campus application
4. **User Experience**: Provide modern, glassmorphic UI with smooth animations
5. **Real-time Data**: Integrate live CSV data for up-to-date information

---

## 💻 Technologies and Languages

### Frontend Framework

- **React 18.3.1** - Core UI library for building component-based interfaces
- **TypeScript** - Static typing for improved code quality and developer experience
- **Vite 5.4.19** - Fast build tool and development server

### UI/UX Libraries

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality React component library built on Radix UI
- **Framer Motion 12.34.2** - Animation library for smooth transitions
- **Lucide React** - Modern icon library
- **React Markdown** - Markdown rendering for chatbot responses

### Routing and State Management

- **React Router DOM 6.30.1** - Client-side routing
- **TanStack Query (React Query) 5.83.0** - Server state management and caching
- **React Hook Form 7.61.1** - Form state management with validation

### Data Processing

- **SQL.js 1.14.0** - In-browser SQLite database for student data queries
- **CSV Parsing** - Custom CSV parser for faculty and student data
- **Date-fns 3.6.0** - Date manipulation library

### Development Tools

- **ESLint** - Code linting and quality checks
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing utilities
- **PostCSS & Autoprefixer** - CSS processing

### Build and Deployment

- **Vite** - Module bundler and build tool
- **Lovable Tagger** - Component tagging (development mode)
- **GitHub** - Version control and deployment

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         React Application (SPA)         │
├─────────────────────────────────────────┤
│  React Router (Client-side routing)     │
├─────────────────────────────────────────┤
│         Page Components Layer           │
│  - HomePage                             │
│  - ChatPage (AI Chatbot)               │
│  - EventsPage                           │
│  - FilterPage                           │
│  - ComparePage                          │
│  - InstitutePage                        │
│  - ProgramsPage                         │
│  - MagazinePage                         │
│  - DashboardPage                        │
└─────────────────────────────────────────┘
          ↓                    ↓
┌──────────────────┐  ┌──────────────────┐
│   Data Layer     │  │   UI Components  │
│  - campusData.ts │  │  - EventCard     │
│  - campusDb.ts   │  │  - Layout        │
│  - events.ts     │  │  - GlassCard     │
│  - institute.ts  │  │  - Navbar        │
└──────────────────┘  │  - shadcn/ui     │
          ↓           └──────────────────┘
┌─────────────────────────────────────────┐
│            Data Sources                  │
│  - SQLite Database (SQL.js)             │
│  - CSV Files (Facultydata.csv,          │
│    Division CSV, Events Rules)          │
│  - Static Data (events.ts, institute.ts)│
└─────────────────────────────────────────┘
```

### Data Flow

1. **User Interaction** → React Components
2. **Components** → Data Fetching (campusData.ts / campusDb.ts)
3. **Data Layer** → CSV/SQLite/Static Data
4. **Response** → Component State Update
5. **UI Re-render** → Display Results

---

## ✨ Features and Functionalities

### 1. AI-Powered Chatbot (ChatPage)

**Location**: `/chat`

#### Core Capabilities

- **Natural Language Processing**: Understands conversational queries
- **Multi-domain Knowledge**: Events, faculty, students, institute info
- **Context-aware Responses**: Understands intent and provides relevant answers
- **Voice Input**: Speech-to-text for hands-free interaction
- **Markdown Rendering**: Formatted responses with tables, lists, and headings

#### Query Types Supported

| Query Category | Examples | Data Source |
|----------------|----------|-------------|
| **Events** | "Events under ₹100", "AI allowed events" | events.ts |
| **Faculty** | "Expertise of Dr. Vishvajit Bakrola", "Faculty email list" | Facultydata.csv |
| **Students** | "Students in CSE", "Cyber Security elective" | Division CSV + SQLite |
| **Institute** | "Tell me about AMTICS", "Programs offered" | institute.ts |
| **Comparison** | "Compare two events", "Event differences" | events.ts |

#### Smart Features

- **Name Recognition**: Fuzzy matching for faculty/student names
- **Context Detection**: Disambiguates "students" vs "faculty" queries
- **Field Extraction**: Returns specific fields (email, expertise, elective)
- **Conversation History**: Maintains chat context
- **Export Chat**: Download conversation as text file
- **Suggested Questions**: Quick-start prompts

### 2. Smart Event Filtering (FilterPage)

**Location**: `/filter`

#### Filter Options

- **Budget Slider**: Filter events by maximum fee (₹0 - ₹1000)
- **Individual Events**: Show only individual participation events
- **Team Events**: Show only team-based events
- **AI Allowed**: Filter events that permit AI tool usage
- **Category Filter**: Technical, Non-technical, Robotics, E-sports, Fun Zone

#### Real-time Results

- Instant filtering without page reload
- Dynamic event count display
- Responsive grid layout

### 3. Event Comparison Tool (ComparePage)

**Location**: `/compare`

#### Comparison Features

- Side-by-side comparison of two events
- Compare:
  - Synopsis and rules
  - Team size requirements
  - Registration fees
  - AI allowance policy
  - Judging criteria
  - Contact information

### 4. Complete Event Catalog (EventsPage)

**Location**: `/events`

#### Event Categories

1. **Technical Events** (5 events)
   - Figma Forge (Design)
   - Chatbot Challenge (AI/ML)
   - Tech Olympic (Coding Marathon)
   - Reverse Challenge (Logic)
   - CTF (Capture The Flag)

2. **Non-Technical Events**
   - Reel-a-Twist (Video Creation)
   - Timeless Tadka (Creative Writing)
   - More...

3. **Robotics Events**
   - Line Follower, Robo Soccer, etc.

4. **E-Sports Events**
   - Gaming competitions

5. **Fun Zone Events**
   - Entertainment activities

#### Event Details

Each event card displays:

- Event name and category
- Synopsis
- Team size
- Registration fee
- AI allowance badge
- Judging criteria
- Rules and regulations
- Contact person details

### 5. Institute Information (InstitutePage)

**Location**: `/institute`

#### Information Sections

- **About AMTICS**: History, mission, vision
- **University Affiliation**: Uka Tarsadia University
- **Accreditation**: NAAC status
- **Facilities**: Labs, library, research centers
- **Contact Information**: Email and blog
- **Admission Process**: ACPC and direct admission

### 6. Programs Catalog (ProgramsPage)

**Location**: `/programs`

#### Program Types

- **Undergraduate (B.Tech)** - 7 specializations
  - Computer Science Engineering
  - Computer Engineering
  - Software Engineering
  - AI & Machine Learning
  - Cyber Security
  - Cloud Computing
  - Information Technology
  
- **Postgraduate (M.Tech)**
  - M.Tech CSE (2 years, 120 intake)
  
- **Integrated**
  - Integrated M.Tech CSE (5 years)

#### Program Information

- Duration
- Total fees
- Program description
- Specialization focus

### 7. Magazine and Placements (MagazinePage)

**Location**: `/magazine`

- **Articles**: Student contributions, event coverage
- **Placement News**: Recent company drives
- **Achievements**: Student and faculty highlights

### 8. Dashboard (DashboardPage)

**Location**: `/dashboard`

- Quick statistics overview
- Recent activities
- Shortcuts to major features

### 9. Voice Interaction

- **Speech-to-Text**: Click microphone to speak queries
- **Real-time Transcription**: See your query as you speak
- **Browser API**: Uses Web Speech API
- **Multi-language Support**: Primarily English

### 10. Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Glassmorphism UI**: Modern glass-effect cards
- **Dark Theme**: Eye-friendly dark mode
- **Smooth Animations**: Framer Motion transitions
- **Neon Accents**: Cyberpunk-inspired glow effects

---

## 📁 Project Structure

```
campus-vision-bot/
├── data/                                    # CSV data files
│   ├── Facultydata.csv                     # Faculty information
│   ├── 2_1_25 Sem 4 Updated Division.csv   # Student division data
│   └── TecXplore 3.0 Events Rules.txt      # Event rules text
│
├── public/                                  # Static assets
│   └── robots.txt
│
├── scripts/                                 # Build scripts
│   └── copy-data.mjs                       # Data copying script
│
├── src/
│   ├── components/                         # Reusable UI components
│   │   ├── ui/                            # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   └── ... (30+ components)
│   │   ├── EventCard.tsx                  # Event display card
│   │   ├── EventDetailModal.tsx           # Event popup modal
│   │   ├── GlassCard.tsx                  # Glassmorphism card
│   │   ├── Layout.tsx                     # Page layout wrapper
│   │   ├── Navbar.tsx                     # Navigation bar
│   │   ├── NavLink.tsx                    # Navigation link
│   │   └── PageHeader.tsx                 # Page title component
│   │
│   ├── data/                              # Static data and types
│   │   ├── events.ts                      # Event definitions
│   │   ├── institute.ts                   # Institute info
│   │   └── types.ts                       # TypeScript types
│   │
│   ├── lib/                               # Utility libraries
│   │   ├── campusData.ts                  # CSV data loader
│   │   ├── campusDb.ts                    # SQLite database
│   │   └── utils.ts                       # Helper functions
│   │
│   ├── pages/                             # Route pages
│   │   ├── ChatPage.tsx                   # AI Chatbot
│   │   ├── ComparePage.tsx                # Event comparison
│   │   ├── DashboardPage.tsx              # Dashboard
│   │   ├── EventsPage.tsx                 # Event catalog
│   │   ├── FilterPage.tsx                 # Smart filtering
│   │   ├── HomePage.tsx                   # Landing page
│   │   ├── InstitutePage.tsx              # Institute info
│   │   ├── MagazinePage.tsx               # Magazine/placements
│   │   ├── NotFound.tsx                   # 404 page
│   │   ├── ProgramsPage.tsx               # Programs catalog
│   │   └── Index.tsx                      # Fallback page
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── use-mobile.tsx                 # Mobile detection
│   │   └── use-toast.ts                   # Toast notifications
│   │
│   ├── test/                              # Test files
│   │   ├── example.test.ts
│   │   └── setup.ts
│   │
│   ├── App.tsx                            # Main app component
│   ├── main.tsx                           # App entry point
│   ├── index.css                          # Global styles
│   └── vite-env.d.ts                      # Vite types
│
├── index.html                             # HTML entry point
├── package.json                           # Dependencies
├── vite.config.ts                         # Vite configuration
├── vitest.config.ts                       # Test configuration
├── tailwind.config.ts                     # Tailwind configuration
├── postcss.config.js                      # PostCSS configuration
├── tsconfig.json                          # TypeScript configuration
├── eslint.config.js                       # ESLint configuration
├── components.json                        # shadcn/ui config
└── README.md                              # Project readme
```

---

## 📊 Data Sources

### 1. CSV Files (Dynamic Data)

#### Facultydata.csv

**Columns**: Name, Designation, Email, Areas of Interest/Expertise

**Sample**:

```csv
Name,Designation,Email,Areas of Interest
Dr. Vishvajit Bakrola,I/C Director,vishvajit.bakrola@utu.ac.in,ML, Deep Learning, AI
Ms. Vidhi Sutaria,Assistant Professor,vidhi.sutaria@utu.ac.in,Cloud Computing
```

**Used in**: ChatPage for faculty queries

#### 2_1_25 Sem 4 Updated Division.csv

**Columns**: Name, Enrollment No, Branch, Programme Elective IV, Programme Elective II, Industrial Practice Elective

**Purpose**: Student division and elective data for Semester 4

**Used in**: ChatPage for student queries, SQLite database generation

#### TecXplore 3.0 Events Rules.txt

**Purpose**: Full text of event rules for natural language search

**Used in**: ChatPage for event rule queries

### 2. Static Data (TypeScript Files)

#### events.ts

**Content**: Complete TecXplore 3.0 event catalog

- Technical events (5)
- Non-technical events
- Robotics events
- E-sports events
- Fun zone events

**Structure**:

```typescript
interface TecXploreEvent {
  id: string;
  name: string;
  category: string;
  synopsis: string;
  teamSize: string;
  fee: string;
  aiAllowed: boolean;
  individual: boolean;
  judgingCriteria: string[];
  rules: string[];
  contactPerson: string;
  contactPhone: string;
}
```

#### institute.ts

**Content**:

- Institute information (name, location, accreditation)
- Programs (9 programs with details)
- Faculty (18 faculty members with expertise)
- Magazine articles
- Placement records

### 3. SQLite Database (Runtime)

**Generated**: On application build via `campusDb.ts`

**Table**: `students`

**Schema**:

```sql
CREATE TABLE students (
  name TEXT,
  enrollmentNo TEXT,
  branch TEXT,
  elective4 TEXT,
  elective2 TEXT,
  industrialPractice TEXT
);
```

**Query Functions**:

- `queryAllStudents()` - Get all student records
- `queryStudentsByProgram(program)` - Filter by program/elective
- `isDbAvailable()` - Check database status

---

## 🚀 Setup and Installation

### Prerequisites

- **Node.js** 16+ and npm (or Bun)
- **Git**
- Modern web browser

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/RJan1405/campus-vision-bot.git
   cd campus-vision-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Place CSV data files**
   Ensure these files exist in the `data/` directory:
   - `Facultydata.csv`
   - `2_1_25 Sem 4 Updated Division.csv`
   - `TecXplore 3.0 Events Rules.txt`

4. **Start development server**

   ```bash
   npm run dev
   ```

   Application will run at: `http://localhost:8080`

5. **Build for production**

   ```bash
   npm run build
   ```

   Output directory: `dist/`

6. **Run tests**

   ```bash
   npm test
   # or for watch mode
   npm run test:watch
   ```

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 8080 |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run copy-data` | Copy CSV files to public |
| `npm run build-db` | Generate SQLite database |
| `npm test` | Run Vitest tests |

---

## 🔑 Key Components

### 1. ChatPage Component

**File**: `src/pages/ChatPage.tsx`

**Responsibilities**:

- Message state management
- AI response generation (`getAIResponse()`)
- Voice input handling
- Chat history export
- Markdown rendering

**Key Functions**:

- `getAIResponse(query, campus)` - Processes user queries
- `extractNameFromQuery()` - Name extraction from natural language
- `matchesName()` - Fuzzy name matching
- `getRequestedField()` - Determines what user wants (email, expertise, etc.)

**State Management**:

```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState("");
const [isListening, setIsListening] = useState(false);
const [campus, setCampus] = useState<CampusData | null>(null);
```

### 2. campusData.ts Library

**File**: `src/lib/campusData.ts`

**Functions**:

- `loadCampusData()` - Main data loader
- `loadFaculty()` - Parse Facultydata.csv
- `loadEventsRules()` - Load event rules text
- `loadStudents()` - Parse division CSV
- `parseCSV()` - CSV parsing with quote handling

**Export**:

```typescript
interface CampusData {
  faculty: FacultyMember[];
  eventsRulesText: string;
  students: StudentRecord[];
  loaded: boolean;
  error: string | null;
}
```

### 3. campusDb.ts Library

**File**: `src/lib/campusDb.ts`

**SQL.js Integration**:

- Loads division CSV into SQLite database
- Provides SQL query interface
- Efficient filtering and searching

**API**:

```typescript
export async function queryAllStudents(): Promise<StudentRecord[]>
export async function queryStudentsByProgram(program: string): Promise<StudentRecord[]>
export function isDbAvailable(): boolean
```

### 4. Layout Component

**File**: `src/components/Layout.tsx`

**Features**:

- Responsive navigation
- Glassmorphism background
- Mobile-friendly sidebar
- Consistent page structure

### 5. EventCard Component

**File**: `src/components/EventCard.tsx`

**Props**:

```typescript
interface EventCardProps {
  event: TecXploreEvent;
}
```

**Features**:

- Hover animations
- Click to view details
- AI-allowed badge
- Category color coding

---

## ⚙️ Configuration

### Vite Configuration

**File**: `vite.config.ts`

```typescript
{
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        path.resolve(__dirname),  // Allow project root
        path.resolve(__dirname, "data"),  // Allow data folder
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // @ alias for src/
    },
  },
}
```

### Tailwind Configuration

**File**: `tailwind.config.ts`

**Custom Colors**:

- `primary`: Cyan accent color
- `neon-blue`: Bright blue glow
- `neon-purple`: Purple accents

**Custom Animations**:

- `float`: Floating effect for background elements
- `glow`: Pulsing glow effect

### TypeScript Configuration

**File**: `tsconfig.json`

- Strict mode enabled
- Path aliases configured (`@/*` → `src/*`)
- React JSX support
- ES2020 target

---

## 👥 Team

### Development Team

- **AbdulKadir Shaikh** - Team Lead & Developer
- **Pratham Khatri** - Developer

### Contact

- **Email**: <excusemeamtics@gmail.com>
- **Blog**: excusemeamtics.blog
- **Repository**: <https://github.com/RJan1405/campus-vision-bot>

---

## 📝 Technical Implementation Details

### AI Response Logic

The chatbot uses pattern matching and context detection:

1. **Query Normalization**: Convert to lowercase, remove extra spaces
2. **Intent Recognition**: Detect query type (event, faculty, student, institute)
3. **Entity Extraction**: Extract names, programs, or keywords
4. **Data Retrieval**: Fetch from appropriate data source
5. **Response Formatting**: Generate markdown-formatted response
6. **Context Maintenance**: Remember conversation history

### Voice Input Flow

1. User clicks microphone button
2. Web Speech API starts listening
3. Real-time transcription displayed
4. On speech end, query is submitted
5. AI processes and responds

### Event Filtering Algorithm

```javascript
filtered = events.filter(event => {
  const fee = extractFee(event.fee);
  return (
    fee <= budget &&
    (individual ? event.individual : true) &&
    (aiAllowed ? event.aiAllowed : true) &&
    (category === 'all' || event.category === category)
  );
});
```

### Data Loading Strategy

1. **Lazy Loading**: CSV data loaded on ChatPage mount
2. **Caching**: Data cached after first load
3. **Error Handling**: Graceful fallback to static data
4. **Progressive Enhancement**: App works without CSV files

---

## 🔒 Security Considerations

- No authentication required (public information)
- CSV files served via Vite middleware
- No sensitive data exposed
- CSP-compliant implementation
- XSS protection via React's escape mechanisms

---

## 🚀 Performance Optimizations

1. **Code Splitting**: React Router lazy loading
2. **Memoization**: useMemo for filtered results
3. **Virtual DOM**: React's efficient rendering
4. **CSS Purging**: Tailwind removes unused styles
5. **Tree Shaking**: Vite eliminates dead code
6. **Lazy Image Loading**: Native lazy loading attribute
7. **Debounced Search**: Prevents excessive re-renders

---

## 📈 Future Enhancements

- **Authentication**: User login for personalized experience
- **Admin Panel**: Manage events and data via UI
- **Real-time Updates**: WebSocket for live event updates
- **Mobile App**: React Native version
- **Analytics**: User interaction tracking
- **Multi-language**: i18n support for regional languages
- **PDF Export**: Generate event reports
- **Calendar Integration**: Add events to calendar
- **Notifications**: Push notifications for event updates
- **Advanced AI**: Integration with GPT API for better responses

---

## 📄 License

This project is created for TecXplore 3.0 at AMTICS, Uka Tarsadia University.

---

## 🙏 Acknowledgments

- **AMTICS** - For organizing TecXplore 3.0
- **Uka Tarsadia University** - For institutional support
- **Lovable.dev** - For development platform
- **shadcn/ui** - For component library
- **Open Source Community** - For amazing tools and libraries

---

**Last Updated**: February 19, 2026

**Version**: 1.0.0

**Status**: Production Ready ✅
