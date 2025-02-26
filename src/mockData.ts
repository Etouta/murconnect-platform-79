interface TeamMember {
  role: string;
  name: string;
  company: string;
}

interface Project {
  id: number;
  title: string;
  address: string;
  price: number;
  status: string;
  client: string;
  dueDate: string;
  progress: number;
  team: TeamMember[];
  description: string;
  unreadMessages: number;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "15 Rue de la Paix",
    address: "Paris 75002",
    price: 25000,
    status: "In Progress",
    client: "Jean Dupont",
    dueDate: "2024-04-15",
    progress: 65,
    team: [
      { role: "Architect", name: "John Architect", company: "Atelier Architecture" },
      { role: "Engineer", name: "Sarah Engineer", company: "Bureau d'études TEP" },
      { role: "Constructor", name: "Marc Laurent", company: "Construction Pro" }
    ],
    description: "Load-bearing wall modification for open space concept",
    unreadMessages: 2,
  },
  {
    id: 2,
    title: "28 Avenue Victor Hugo",
    address: "Lyon 69006",
    price: 18500,
    status: "Blocked",
    client: "Marie Martin",
    dueDate: "2024-05-01",
    progress: 30,
    team: [
      { role: "Architect", name: "Thomas Bernard", company: "Studio Architectes" },
      { role: "Constructor", name: "Marc Constructor", company: "Construction Plus" }
    ],
    description: "Structural reinforcement for wall removal",
    unreadMessages: 1,
  },
  {
    id: 3,
    title: "42 Boulevard Haussmann",
    address: "Paris 75009",
    price: 35000,
    status: "In Progress",
    client: "Pierre Durand",
    dueDate: "2024-06-30",
    progress: 15,
    team: [
      { role: "Architect", name: "Antoine Dubois", company: "Dubois Architectes" },
      { role: "Engineer", name: "Lucas Engineer", company: "Leroy Engineering" },
      { role: "Designer", name: "Emilie Designer", company: "Design Plus" }
    ],
    description: "Complete renovation of historic building facade",
    unreadMessages: 3,
  },
  {
    id: 4,
    title: "8 Place Bellecour",
    address: "Lyon 69002",
    price: 28000,
    status: "Archived",
    client: "Sophie Bernard",
    dueDate: "2024-07-15",
    progress: 100,
    team: [
      { role: "Architect", name: "Paul Roux", company: "Architecture Moderne" },
      { role: "Engineer", name: "Julie Blanc", company: "Expert Engineering" },
      { role: "Designer", name: "Nicolas Petit", company: "Interior Design Co" }
    ],
    description: "Modern office space conversion",
    unreadMessages: 0,
  }
];

export const mockMessages = [
  {
    id: 1,
    sender: "John Architect",
    role: "Architect",
    projectId: 1,
    projectName: "15 Rue de la Paix",
    message: "The wall modification plans have been updated. Please review the latest changes.",
    timestamp: "2024-03-20T10:30:00",
    read: false,
  },
  {
    id: 2,
    sender: "Sarah Engineer",
    role: "Engineer",
    projectId: 1,
    projectName: "15 Rue de la Paix",
    message: "I've reviewed the structural calculations. We need to reinforce the support beams.",
    timestamp: "2024-03-20T11:15:00",
    read: false,
  },
  {
    id: 3,
    sender: "Marc Constructor",
    role: "Constructor",
    projectId: 2,
    projectName: "28 Avenue Victor Hugo",
    message: "Team is ready to start on the support beam reinforcement next week.",
    timestamp: "2024-03-20T14:20:00",
    read: false,
  },
  {
    id: 4,
    sender: "Emilie Designer",
    role: "Designer",
    projectId: 3,
    projectName: "42 Boulevard Haussmann",
    message: "New facade design proposals are ready for review.",
    timestamp: "2024-03-21T09:30:00",
    read: false,
  },
  {
    id: 5,
    sender: "Lucas Engineer",
    role: "Engineer",
    projectId: 3,
    projectName: "42 Boulevard Haussmann",
    message: "Structural analysis of the historic facade completed.",
    timestamp: "2024-03-21T11:45:00",
    read: false,
  },
  {
    id: 6,
    sender: "Antoine Dubois",
    role: "Architect",
    projectId: 3,
    projectName: "42 Boulevard Haussmann",
    message: "Historic preservation requirements need immediate attention.",
    timestamp: "2024-03-21T15:20:00",
    read: false,
  }
];

export const mockDocuments = [
  {
    id: 1,
    title: "Structural Analysis Report",
    type: "PDF",
    size: "2.5 MB",
    date: "2024-03-18T14:30:00",
    project: "15 Rue de la Paix",
    projectId: 1,
    author: "John Architect",
    stage: "Planning",
    stakeholders: ["Architect", "Engineer"],
  },
  {
    id: 2,
    title: "Building Permit Application",
    type: "PDF",
    size: "1.8 MB",
    date: "2024-03-19T09:15:00",
    project: "15 Rue de la Paix",
    projectId: 1,
    author: "Sarah Engineer",
    stage: "Permitting",
    stakeholders: ["Architect", "Engineer", "City Official"],
  },
  {
    id: 3,
    title: "Construction Timeline",
    type: "PDF",
    size: "1.2 MB",
    date: "2024-03-20T11:45:00",
    project: "28 Avenue Victor Hugo",
    projectId: 2,
    author: "Marc Constructor",
    stage: "Execution",
    stakeholders: ["Constructor", "Project Manager"],
  },
  {
    id: 4,
    title: "Facade Design Proposal",
    type: "PDF",
    size: "3.5 MB",
    date: "2024-03-21T09:30:00",
    project: "42 Boulevard Haussmann",
    projectId: 3,
    author: "Emilie Designer",
    stage: "Design",
    stakeholders: ["Designer", "Architect"],
  },
  {
    id: 5,
    title: "Historic Building Assessment",
    type: "PDF",
    size: "4.2 MB",
    date: "2024-03-21T14:15:00",
    project: "42 Boulevard Haussmann",
    projectId: 3,
    author: "Lucas Engineer",
    stage: "Analysis",
    stakeholders: ["Engineer", "Architect", "Historic Preservation Expert"],
  }
];

export const mockTimeline = [
  {
    id: 1,
    projectId: 1,
    title: "Wall Verification",
    description: "Initial assessment of load-bearing wall structure",
    dueDate: "2024-03-15",
    status: "completed",
  },
  {
    id: 2,
    projectId: 1,
    title: "Permit Processing",
    description: "Obtaining necessary permits from local authorities",
    dueDate: "2024-03-20",
    status: "in-progress",
  },
  {
    id: 3,
    projectId: 2,
    title: "Engineering Studies",
    description: "Detailed structural analysis and calculations",
    dueDate: "2024-04-01",
    status: "pending",
  },
  {
    id: 4,
    projectId: 3,
    title: "Facade Assessment",
    description: "Historic facade condition evaluation",
    dueDate: "2024-04-10",
    status: "in-progress",
  },
  {
    id: 5,
    projectId: 3,
    title: "Design Approval",
    description: "Review and approval of renovation plans",
    dueDate: "2024-05-01",
    status: "pending",
  }
];
