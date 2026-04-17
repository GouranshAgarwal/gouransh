interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  leetcode: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  cpi: string;
  coursework: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface Project {
  id: number;
  title: string;
  year: string;
  status: "live" | "wip";
  liveUrl: string | null;
  codeUrl: string | null;
  description: string;
  highlights: string[];
  tags: string[];
  color: string;
}

interface Skills {
  [category: string]: string[];
}

export interface Achievement {
  icon: string;
  title: string;
  detail: string;
}

export const personalInfo: PersonalInfo = {
  name: "Gouransh Agarwal",
  title: "Full Stack Developer & ML Engineer",
  tagline: "Building systems at the intersection of data, intelligence, and scale.",
  email: "gouranshagarwal97@gmail.com",
  phone: "+91-6397748086",
  location: "Agra, India",
  github: "https://github.com/gouranshagarwal",
  leetcode: "https://leetcode.com/u/m1z7m5J7iT",
};

export const education: EducationItem[] = [
  {
    degree: "B.Tech, Computer Science",
    institution: "GLA University, India",
    period: "Aug 2023 – Aug 2027",
    cpi: "8.42 / 10",
    coursework: ["DSA", "DBMS", "Operating Systems", "Machine Learning", "GenAI"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Research Intern",
    company: "NITK Surathkal",
    period: "Jun 2025 – Sep 2025",
    bullets: [
      "Built a real-time data pipeline to process and integrate multi-sensor inputs into an Autoware-based autonomous system.",
      "Designed data preprocessing workflows including data transformation and validation for depth-camera inputs.",
      "Worked with unstructured sensor data and designed preprocessing pipelines for reliable downstream processing.",
      "Developed a Qt/C++ HMI and performed debugging, ensuring consistent data flow across system components.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Exoplanet Detection & Characterization System",
    year: "2026",
    status: "live",
    liveUrl: "https://identify-real-exoplanets-95x4.vercel.app",
    codeUrl: null,
    description:
      "ML pipeline for exoplanet detection and radius prediction using Random Forest classifier + regressor with SHAP interpretability.",
    highlights: [
      "93% accuracy, ROC-AUC 0.98",
      "Regression RMSE: 0.98, MAE: 0.21",
      "React + FastAPI deployment",
      "SHAP interpretability",
    ],
    tags: ["Python", "React", "FastAPI", "Random Forest", "SHAP", "ML"],
    color: "#6366f1",
  },
  {
    id: 2,
    title: "BillFlow — PDF Processing & Optimization SaaS",
    year: "2026 – Ongoing",
    status: "wip",
    liveUrl: "https://space-squeeze.vercel.app",
    codeUrl: null,
    description:
      "FastAPI-based backend to process bulk PDFs and generate optimized layouts, reducing paper usage and printing costs by 75%.",
    highlights: [
      "75% paper/cost reduction",
      "Modular pipeline (load → crop → layout → export)",
      "PyMuPDF batch processing",
      "Template-based cropping support",
    ],
    tags: ["Python", "FastAPI", "PyMuPDF", "SaaS", "PDF Processing"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Video Streaming Platform",
    year: "2026 – Ongoing",
    status: "wip",
    liveUrl: null,
    codeUrl: "https://github.com/GouranshAgarwal/personal-youtube",
    description:
      "YouTube-inspired modular & scalable backend system with REST APIs for auth, video handling, and user interactions.",
    highlights: [
      "Node.js + Express + MongoDB",
      "REST APIs for auth & video",
      "Scalable architecture",
      "AWS cloud deployment ready",
    ],
    tags: ["Node.js", "Express", "MongoDB", "AWS", "REST API"],
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Anonymous Messaging Platform",
    year: "2024",
    status: "live",
    liveUrl: "https://anonymous-messaging-app-4nqu.vercel.app",
    codeUrl: null,
    description:
      "Full-stack anonymous platform with LLM-based AI suggestions using prompt engineering for contextual message generation.",
    highlights: [
      "Next.js + TypeScript + MongoDB",
      "LLM-based suggestions",
      "Prompt engineering",
      "Contextual AI responses",
    ],
    tags: ["Next.js", "TypeScript", "MongoDB", "LLM", "GenAI"],
    color: "#10b981",
  },
];

export const skills: Skills = {
  "Languages": ["Python", "Java", "C++", "JavaScript"],
  "Data & Backend": ["SQL", "MongoDB", "Node.js", "Express", "FastAPI"],
  "Data Engineering": ["ETL Pipelines", "Data Modeling", "Data Cleaning", "Validation"],
  "Cloud & DevOps": ["AWS S3", "AWS EC2", "IAM", "Nginx", "Apache", "Docker"],
  "Tools & Systems": ["Linux", "ROS", "Qt", "Git"],
  "ML / Analytics": ["TensorFlow", "XGBoost", "SHAP", "Random Forest"],
  "LLM / GenAI": ["Prompt Engineering", "Transformers (BERT, GPT)", "LangChain", "RAG", "Embeddings"],
};

export const achievements: Achievement[] = [
  {
    title: "Smart India Hackathon 2024",
    detail: "Finalist & Team Leader",
    icon: "🚀",
  },
  {
    title: "Research Intern at NITK",
    detail: "Real-time autonomous data pipeline",
    icon: "🔬",
  },
];