// ============================================================================
// PORTFOLIO DATA — Edit this file to update all content on the site.
// Adding a new experience or project? Just add an object to the array below.
// ============================================================================

// --- Site-wide config -------------------------------------------------------
export const siteConfig = {
  name: "Binyam Mulat Abegaz",
  title: "AI Engineer / Full Stack Developer",
  email: "binyammulat244@gmail.com",
  phone: "+1 437-757-8690",
  github: "https://github.com/dipherent1",
  linkedin: "https://www.linkedin.com/in/binyam-mulat-abegaz",
  location: "Toronto, ON, Canada",
  resumePath: "/files/resume.pdf",
  heroTagline:
    "I build production AI systems, agentic automation, and full-stack applications that bridge software and hardware.",
  about: [
    "I'm an AI Engineer and Full Stack Developer with a BSc in Electromechanical Engineering from Addis Ababa Science and Technology University (AASTU). My passion for innovation led me to blend hardware and software — from embedded IoT systems to scalable cloud APIs.",
    "Currently I focus on building AI-driven automation and agentic systems that streamline workflows and optimize costs. I've built several systems with Python, Go, Laravel, and modern frontend frameworks.",
  ],
};

// --- Stats shown in the About section ---------------------------------------
export const stats = [
  { value: "800+", label: "DSA Problems Solved" },
  { value: "10+", label: "Projects Built" },
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Technologies" },
];

// --- Experience entries (most recent first) ---------------------------------
export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  link?: string;
}

export const experiences: Experience[] = [
  {
    title: "AI Engineer",
    company: "Mella Software Solutions PLC",
    period: "Jun 2026 – Sep 2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "Deployed generative AI and document-processing pipelines for video, image, text, and RAG workloads.",
    achievements: [
      "Deployed LTX-based video and image generation pipelines and Qwen multimodal models with FastAPI on a remote production server for video, text, and image generation",
      "Implemented logging and retry handling in the workflows to help diagnose failures and improve resilience during processing",
      "Automated extraction from multiple 1,000+ page technical datasheets containing images and tables using Docling, reducing processing time to under 10 minutes per datasheet for a RAG system",
    ],
    skills: ["Python", "FastAPI", "LTX", "Qwen", "Docling", "RAG"],
  },
  {
    title: "AI System Engineer",
    company: "Budera",
    period: "Sep 2025 – Nov 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built multi-agent systems for financial data analysis and cost optimization.",
    achievements: [
      "Built a hybrid multi-agent system with Laravel, Laragent, and Vizra to categorize and analyze thousands of financial transaction records, replacing a largely manual categorization process",
      "Built a FastAPI and LangChain microservice with MCP support to connect LLMs to 30+ external financial data sources and work with live financial data",
    ],
    skills: [
      "Laravel",
      "Laragent",
      "Vizra",
      "FastAPI",
      "LangChain",
      "MCP",
      "Docker",
    ],
  },
  {
    title: "AI and Machine-Learning Intern",
    company: "iCog Labs",
    period: "Jan 2025 – May 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built bioinformatics AI agents and ML models, and integrated genetic data visualization tools.",
    achievements: [
      "Designed and developed a bioinformatics AI agent using a custom-built MCP server and BioBlend, with a FastAPI backend supporting Gemini, OpenAI, and Groq",
      "Engineered a React platform to integrate and test genetic data visualization tools including JBrowse and LocusZoom, validating more than 100 integrated tools for research applications",
      "Implemented regression, classification, clustering, and neural-network models across 10+ machine-learning projects, applying end-to-end model development during the training program",
    ],
    skills: [
      "Python",
      "FastAPI",
      "MCP",
      "BioBlend",
      "React",
      "PyTorch",
      "Scikit-learn",
      "Gemini",
      "OpenAI",
      "Groq",
    ],
    link: "https://www.icog-labs.com/",
  },
  {
    title: "Backend Developer",
    company: "Enmamar",
    period: "Jan 2025 – Mar 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built and maintained backend systems for Enmamar's learning platform with RESTful APIs and optimized database performance.",
    achievements: [
      "Designed and implemented a scalable RESTful API architecture",
      "Optimized database queries using Redis, improving response times by 30%",
      "Improved security with rate limiting by IP and input validation",
      "Implemented security best practices, reducing vulnerabilities by 40%",
    ],
    skills: ["FastAPI", "Redis", "PostgreSQL", "Chapa"],
    link: "https://enmamar.com/",
  },
  {
    title: "Backend Intern",
    company: "Eskalate LLC",
    period: "Jun 2024 – Sep 2024",
    location: "Addis Ababa, Ethiopia",
    description:
      "Developed RESTful APIs using Django and FastAPI, optimized queries, and collaborated with frontend teams.",
    achievements: [
      "Built 10+ RESTful API endpoints with comprehensive documentation",
      "Optimized database queries resulting in 25% faster response times",
      "Implemented authentication and authorization systems using JWT",
    ],
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Git",
    ],
    link: "https://www.eskalate.io/",
  },
  {
    title: "CGI Club Vice President",
    company: "Addis Ababa University",
    period: "Sep 2021 – Jun 2022",
    location: "Addis Ababa, Ethiopia",
    description:
      "Led a team of 15 members organizing coding competitions, workshops, and mentoring junior students.",
    achievements: [
      "Organized 5 coding competitions with 100+ participants each",
      "Conducted 10+ workshops on programming fundamentals and web development",
      "Increased club membership by 40% through outreach",
    ],
    skills: ["Leadership", "Event Management", "Public Speaking", "Mentoring"],
    link: "https://www.aau.edu.et/",
  },
];

// --- Education --------------------------------------------------------------
export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export const education: Education[] = [
  {
    degree: "BSc in Electromechanical Engineering",
    school: "Addis Ababa Science and Technology University (AASTU)",
    period: "05/2022 – 06/2026",
    description:
      "Took courses in: Introduction to Programming (C++), Machine Learning, Mechatronics Systems, Computer Vision, Numerics (Computational Methods), Robotics, Embedded Systems, Modern Control.",
  },
  {
    degree: "Coding School — A2SV",
    school: "Africa to Silicon Valley",
    period: "11/2023 – 11/2024",
    description:
      "Advanced Data Structures and Algorithms and backend engineering technical fellowship; solved 800+ problems on LeetCode and Codeforces.",
  },
  {
    degree: "Kifiya AI Mastery (KAIM) Training Program",
    school: "10 Academy",
    period: "05/2025 – 08/2025",
    description:
      "Selected for an intensive 3-month AI engineering residency focused on Generative AI, Machine Learning, and Data Engineering.",
  },
];

// --- Projects ---------------------------------------------------------------
export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  linkedinUrl?: string;
  period?: string;
}

export const projects: Project[] = [
  {
    title: "Echo — Activity Logger & Analytics",
    description:
      "A Chrome extension & Next.js platform that captures browsing metadata, visualizes patterns with focus heatmaps, and uses AI to calculate signal-to-noise ratios distinguishing deep work from distractions.",
    techStack: ["Next.js", "MongoDB", "Chrome Extension", "AI"],
    githubUrl: "https://github.com/dipherent1/Echo-platform",
    liveUrl: "https://v0-personal-productivity-tracker-kd.vercel.app/",
    image: "/image/echo.png",
  },
  {
    title: "SupportHub AI",
    description:
      "AI co-pilot for support agents using Gemini for automated ticket triage and summarization. Real-time SPA front-end with Vue.js/Inertia.js, secure multi-tenancy, and background jobs with Laravel.",
    techStack: ["Laravel", "Vue.js", "Inertia.js", "Gemini", "Laragents"],
    githubUrl:
      "https://github.com/dipherent1/PHP_learning/tree/main/PHP/phase3/support-hub-ai",
    image: "/image/supporthub-ai-1.jpg",
  },
  {
    title: "Hyprland AI Assistant",
    description:
      "Native AI desktop assistant for Linux built with Golang and Flyt. Reduces workflow friction for common AI tasks by 75% by integrating directly with Google's Gemini API for multimodal text, image, and web-search interactions.",
    techStack: ["Golang", "Flyt", "Linux", "Gemini API"],
    githubUrl: "https://github.com/dipherent1/ai_wraper",
    image: "/image/fedora-copilot.jpg",
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7385968582125576192/",
    period: "10/2025 – 01/2026",
  },
  {
    title: "Info-Stream: AI Alert Engine for Telegram",
    description:
      "Real-time message filtering and alerting system for Telegram. Uses a personal account as the listener and a bot as the UI, transforming 100+ high-volume channels into personalized semantic intelligence feeds with Gemini embeddings and pgvector.",
    techStack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "SQLAlchemy",
      "Gemini",
    ],
    githubUrl: "https://github.com/dipherent1/Tg_wrapper",
    image: "/image/info-image-1.jpg",
    period: "08/2025 – 10/2025",
  },
  {
    title: "Kesbekes 2.0",
    description:
      "Real-time Telegram Bot with Redis, Go, and AI filtering capabilities for content moderation and user interaction.",
    techStack: ["Go", "Redis", "Telegram API", "AI", "Docker"],
    githubUrl: "https://github.com/dipherent1/Kesbekes-2.0",
  },
  {
    title: "Smart Bike Rack",
    description:
      "IoT system with ESP32 and Python backend for monitoring and managing bike racks with real-time status updates.",
    techStack: ["ESP32", "Python", "MQTT", "MongoDB", "React"],
    githubUrl: "https://github.com/IETP-Project-Smart-Bike-Rack/Smart-Rack",
    liveUrl: "https://sites.google.com/view/smartbikerack/description",
  },
];

// --- Skills (grouped by category) -------------------------------------------
export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      "Golang",
      "Python",
      "TypeScript",
      "C/C++",
      "PHP",
      "FastAPI",
      "Django",
      "Laravel",
      "Gin",
      "React",
      "Next.js",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "AI Agent Development",
      "LangChain",
      "MCP",
      "PyTorch",
      "Scikit-learn",
      "TensorFlow",
      "NLP",
      "Computer Vision",
      "RAG",
      "Prompt Engineering",
    ],
  },
  {
    title: "Databases & Infrastructure",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Linux",
      "Git",
      "AWS",
    ],
  },
  {
    title: "Mechatronics & IoT",
    skills: [
      "Arduino",
      "ESP-32",
      "Robotics",
      "Embedded Systems",
      "Solidworks",
      "PCB Design",
      "MQTT",
    ],
  },
];

// --- Navigation items -------------------------------------------------------
export const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];
