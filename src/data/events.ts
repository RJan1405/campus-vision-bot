import { TecXploreEvent } from "./types";

export const technicalEvents: TecXploreEvent[] = [
  {
    id: "figma-forge",
    name: "Figma Forge",
    category: "technical",
    synopsis: "Participants are given a problem statement. Within a limited time, they create wireframes, UI screens, or prototypes using Figma. Designs are judged on creativity, usability, layout, color scheme, and user experience.",
    teamSize: "Individual",
    fee: "₹70",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Creativity & Innovation", "UI Design (Visual Appeal)", "User Experience (UX)", "Problem Understanding", "Functionality & Layout", "Time Management", "Overall Presentation"],
    rules: ["All work must be original", "Use of third-party assets allowed if properly licensed", "Copying from existing designs → disqualification", "AI-generated content is prohibited", "Must submit before deadline", "No pre-made templates"],
    contactPerson: "Neha Bhanushali",
    contactPhone: "9408810123"
  },
  {
    id: "chatbot",
    name: "Chatbot Challenge",
    category: "technical",
    synopsis: "Participants build a chatbot using programming languages, frameworks, or no-code platforms that can understand user queries and respond intelligently. Evaluated on functionality, accuracy, UX, innovation, and technical implementation.",
    teamSize: "2-3 members",
    fee: "₹100",
    aiAllowed: true,
    individual: false,
    judgingCriteria: ["Problem Understanding & Use Case", "Functionality & Accuracy", "Innovation & Creativity", "Performance & Reliability", "Presentation & Demonstration", "Time Management"],
    rules: ["Clearly inform users they're interacting with AI", "Include content moderation and safety filters", "2 min and 3 max members per team", "Respect intellectual property"],
    contactPerson: "AbdulKadir Shaikh",
    contactPhone: "7434043381"
  },
  {
    id: "tech-olympic",
    name: "Tech Olympic",
    category: "technical",
    synopsis: "Three-event coding marathon: Error (Fix the Code), Code Sprint, and Code War. Tests debugging, speed coding, teamwork, and competitive coding under pressure with a unique Ally-to-Enemy format in the finale.",
    teamSize: "Individual → Team → Solo",
    fee: "₹100",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Output Accuracy", "Code Correctness", "Time Efficiency", "Code Quality", "Problems Solved", "Logical Approach"],
    rules: ["No Internet access", "No AI tools", "No external help", "Only successfully running programs evaluated", "Malpractice → disqualification"],
    contactPerson: "Mann Patel",
    contactPhone: "9313471482"
  },
  {
    id: "reverse-challenge",
    name: "The Reverse Challenge",
    category: "technical",
    synopsis: "Participants receive output samples without seeing the original code. They must analyze the logic and write a program that produces the exact same output. Tests reverse engineering and programming fundamentals.",
    teamSize: "Individual",
    fee: "₹60",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Correctness of Output", "Logic & Problem Understanding", "Code Efficiency", "Code Quality & Readability", "Edge Case Handling", "Time Management", "Execution Without Errors"],
    rules: ["Only provided system/compiler can be used", "No Internet access", "Code must be written individually", "Output must exactly match including format", "No pre-written code or external libraries"],
    contactPerson: "Nishad Nakrani",
    contactPhone: "7043441460"
  },
  {
    id: "ctf",
    name: "Catch Me If You Can (CTF)",
    category: "technical",
    synopsis: "An exciting problem-solving and treasure-hunt style event. Solve a series of clues involving technical questions, logical reasoning, and puzzles. Each clue leads to the next challenge.",
    teamSize: "Individual or Team",
    fee: "₹70",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Completion Time", "Accuracy", "Rule Compliance", "Fair Play", "Discipline & Conduct"],
    rules: ["Clues must be solved in sequence", "No skipping clues", "No Internet unless organizers allow", "Don't damage property", "Stay within allowed area", "Don't share clues"],
    contactPerson: "Sarthak Yerpude",
    contactPhone: "9359990884"
  }
];

export const nonTechnicalEvents: TecXploreEvent[] = [
  {
    id: "reel-a-twist",
    name: "Reel-a-Twist",
    category: "non-technical",
    synopsis: "A reel making competition where participants get random themes via a twist wheel, then film and edit on-site. Create a 30-60 second reel within 90-120 minutes.",
    teamSize: "1-3 members",
    fee: "₹100",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Creativity and originality", "Humor and entertainment value", "Execution and editing quality", "Adherence to the twist/theme"],
    rules: ["Reel must be filmed and edited on-site", "Pre-made reels → disqualification", "Content must be family-friendly", "Submit via pen drive", "Duration: 30-60 seconds"],
    contactPerson: "Bhupendra Sharma",
    contactPhone: "8733090192"
  },
  {
    id: "timeless-tadka",
    name: "Timeless Tadka: Rewind & Caption",
    category: "non-technical",
    synopsis: "Two-round creative event. Round 1: Imagine History – creatively reinterpret a historical event. Round 2: Caption Contest – create an innovative caption for a photograph.",
    teamSize: "1-2 members",
    fee: "₹70",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Relevance to theme", "Creativity and originality", "Humor and relatability", "Presentation and delivery", "Clarity and conciseness"],
    rules: ["No offensive language or hate speech", "3-5 minutes to present", "Captions must be original", "Max 20 words for captions"],
    contactPerson: "Srusti Patel",
    contactPhone: "8511523125"
  },
  {
    id: "people-got-talent",
    name: "People Got Talent",
    category: "non-technical",
    synopsis: "Showcase your unique skills, creativity, and confidence. From performances to entertaining acts, this event celebrates talent in all its forms.",
    teamSize: "Individual",
    fee: "₹40",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Talent and skill level", "Creativity and originality", "Stage presence and confidence", "Audience engagement", "Overall performance impact"],
    rules: ["Individual participation only", "Fixed time limit", "No offensive content", "Props allowed with approval", "Must report on time"],
    contactPerson: "Rehan Multani",
    contactPhone: "9998647247"
  },
  {
    id: "canvaverse",
    name: "CanvaVerse",
    category: "non-technical",
    synopsis: "A Canva Designing Challenge that tests creativity and design skills under time pressure. Receive a surprise design brief and bring it to life using Canva.",
    teamSize: "Individual",
    fee: "₹60",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Creativity and originality", "Adherence to theme", "Visual appeal and layout", "Color usage and typography", "Overall design quality"],
    rules: ["Must use Canva exclusively", "No AI tools", "Surprise theme given on spot", "No pre-made templates", "Complete within time limit"],
    contactPerson: "Rudra Patel",
    contactPhone: "8401693584"
  },
  {
    id: "rocketry",
    name: "Rocketry",
    category: "non-technical",
    synopsis: "Build and launch your own water-powered rocket! Learn about forces, aerodynamics, and creativity in design. Compete for maximum altitude and distance.",
    teamSize: "Individual or Team",
    fee: "₹70",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Maximum airtime", "Distance covered", "Design quality", "Build originality"],
    rules: ["Build from scratch – no kits", "Nozzle diameter: 2.5cm", "Only water as propellant", "No glass materials", "Must present at venue"],
    contactPerson: "Gulshan Tiwari",
    contactPhone: "9130054768"
  }
];

export const roboticsEvents: TecXploreEvent[] = [
  {
    id: "robo-soccer",
    name: "FootBots (Robo Soccer)",
    category: "robotics",
    synopsis: "Two single robots from each team compete in a match mimicking a football game. Showcase robotics skills and strategy in competitive Robo Soccer.",
    teamSize: "1-10 players",
    fee: "₹1000 (all 3 events)",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Goals scored", "Strategy", "Robot performance", "Team coordination"],
    rules: ["1 robot per team on field", "8 min game + 1.5 min break", "Robot size: 30x30cm", "Attachment: 15x30cm", "No readymade bots", "Semi-readymade base allowed"],
    additionalInfo: { "Robot Size": "30x30cm", "Attachment": "15x30cm", "Match Duration": "8 min + 1.5 min break", "Ball": "Standard soccer ball" }
  },
  {
    id: "track-race",
    name: "Turbo Tracks (Track Race)",
    category: "robotics",
    synopsis: "Robots navigate a challenging track showcasing speed, agility, and precision. Features obstacles, balancing, control and speed challenges.",
    teamSize: "1-10 players",
    fee: "₹1000 (all 3 events)",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Fastest completion time", "Track navigation", "Obstacle handling"],
    rules: ["Robot size: 30x30cm", "Wired or wireless allowed", "Must verify with coordinators 1 day prior", "No readjustment during run", "No readymade bots"],
    additionalInfo: { "Robot Size": "30x30cm", "Track": "Obstacles + balancing + speed", "Connection": "Wired or Wireless" }
  },
  {
    id: "robo-war",
    name: "Robo Clash (Robo War)",
    category: "robotics",
    synopsis: "Two robots engage in combat in a battlefield scenario. Deploy one robot at a time, exhibit robotics prowess and tactical acumen in fierce competition.",
    teamSize: "1-10 players",
    fee: "₹1000 (all 3 events)",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Combat effectiveness", "Robot durability", "Strategy", "Points system (1st:10, 2nd:7, 3rd:5)"],
    rules: ["Robot size: 30x30cm", "No cutters, flamethrowers, electric shockers", "5 min match duration", "Damage caused is not organizer's responsibility", "No readymade bots"],
    additionalInfo: { "Robot Size": "30x30cm", "Arena": "4ft x 4ft x 2.5ft (Nylon Net)", "Match Duration": "5 minutes", "Forbidden": "Cutters, flamethrowers, electric shockers" }
  }
];

export const esportsEvents: TecXploreEvent[] = [
  {
    id: "valorant",
    name: "Valorant Immortal Clutch",
    category: "esports",
    synopsis: "Open tournament welcoming gaming enthusiasts. Teams of five compete in knockout format with Standard Matches.",
    teamSize: "5 players (+1 sub)",
    fee: "₹500",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Match win"],
    rules: ["Cheats/third-party software → banned", "Disconnect before Round 3 → Rematch", "After Round 3 → Match continues", "Must bring own laptop"],
    additionalInfo: { "Mode": "Standard Matches", "Format": "Knockouts", "Maps": "Decided by organizers / Map voting", "Early Rounds": "Best of 1", "Semi/Final": "Best of 3" }
  },
  {
    id: "free-fire",
    name: "Free Fire",
    category: "esports",
    synopsis: "Battle royale where up to 48 participants compete. Squads of 4 play across Bermuda and Purgatory maps. 6-8 matches with placement + kill points.",
    teamSize: "Squad (4 players)",
    fee: "₹200",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Points Table (Placement + Kill points)"],
    rules: ["Custom Room mode", "Characters/Skills allowed", "Hacks → immediate disqualification", "Age 16+"],
    additionalInfo: { "Mode": "Custom Room", "Maps": "Bermuda / Purgatory", "Matches": "6-8", "Scoring": "Placement + Kill points" }
  },
  {
    id: "bgmi",
    name: "BGMI",
    category: "esports",
    synopsis: "Battle royale with up to 100 participants. Squads of 4 compete across Erangel and Sanhok in TPP mode. 6-8 matches with rank + kill scoring.",
    teamSize: "Squad (4 players)",
    fee: "₹300",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Points Table (Rank Points + Kills)"],
    rules: ["Custom Room – TPP", "No emulators", "Teaming/glitches → prohibited", "Age 16+"],
    additionalInfo: { "Mode": "Custom Room – TPP", "Maps": "Erangel / Sanhok", "Matches": "6-8", "Scoring": "Rank Points + Kills" }
  }
];

export const funZoneEvents: TecXploreEvent[] = [
  {
    id: "ipl-royale",
    name: "IPL Royale: Battle of the Bidders",
    category: "funzone",
    synopsis: "Step into the shoes of IPL franchise owners, strategically bidding on players to form the strongest team within 50 Crore Points budget. Blind bidding above 9 Crore!",
    teamSize: "5 members (incl. 1 female)",
    fee: "₹200",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Highest combined player rating", "Strategic budget management"],
    rules: ["50 Crore Points budget", "Blind bidding above 9 Crore", "Must include at least 1 female player", "Exceeding budget → penalties"],
    additionalInfo: { "Budget": "50 Crore Points", "Blind Bidding": "Above 9 Crore Points", "Team": "5 members (min 1 female)", "Twist": "Revealed during live event" }
  },
  {
    id: "roadies",
    name: "Roadies Challenge",
    category: "funzone",
    synopsis: "Ultimate test of strength, strategy, and teamwork. Physical challenges, mental puzzles, problem-solving activities, and creative tasks across 5-6 rounds.",
    teamSize: "5-6 members",
    fee: "₹30",
    aiAllowed: false,
    individual: false,
    judgingCriteria: ["Physical task performance", "Mental puzzle solving", "Teamwork", "Creative tasks", "Cumulative performance"],
    rules: ["5-6 rounds of mixed tasks", "Teams may be eliminated after rounds", "Some rounds may be vote-outs", "Solo and team both can participate"],
    additionalInfo: { "Rounds": "5-6", "Tasks": "Physical, Mental, Teamwork, Creative", "Elimination": "Round-based" }
  },
  {
    id: "traitors",
    name: "The Traitors Game",
    category: "funzone",
    synopsis: "Strategic role-based deduction game. Players are assigned as Killers, Doctors, or Citizens. Night and day phases with hidden actions and open discussions determine survival.",
    teamSize: "Group event",
    fee: "₹30",
    aiAllowed: false,
    individual: true,
    judgingCriteria: ["Survival", "Deduction skills", "Strategic play"],
    rules: ["Roles assigned secretly", "Night: Killers select target, Doctors save", "Day: 2 min discussion + voting", "No communication during night phase", "Eliminated players can't reveal roles"],
    additionalInfo: { "Killers": "3-4 participants", "Doctors": "1-2 participants", "Citizens": "Remaining", "Win (Citizens)": "Eliminate all Killers", "Win (Killers)": "Outnumber remaining" }
  }
];

export const allEvents = [...technicalEvents, ...nonTechnicalEvents, ...roboticsEvents, ...esportsEvents, ...funZoneEvents];
