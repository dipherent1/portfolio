// ============================================================================
// PORTFOLIO DATA — Edit this file to update all content on the site.
// Adding a new experience or project? Just add an object to the array below.
// ============================================================================

// --- Site-wide config -------------------------------------------------------
export const siteConfig = {
  name: "Binyam Mulat Abegaz",
  title: "Fullstack Developer & Electromechanical Engineer",
  email: "binyammulat244@gmail.com",
  github: "https://github.com/dipherent1",
  linkedin: "https://www.linkedin.com/in/binyam-mulat-abegaz",
  location: "Addis Ababa, Ethiopia",
  resumePath: "/files/resume.pdf",
  heroTagline:
    "I build robust backend systems, AI-driven automation, and things that bridge software and hardware.",
  about: [
    "I'm a Fullstack Engineer with a BSc in Electromechanical Engineering from Addis Ababa Science and Technology University (AASTU). My passion for innovation led me to blend hardware and software — from embedded IoT systems to scalable cloud APIs.",
    "Currently I focus on building AI-driven automation and agentic systems that streamline workflows and optimize costs. I've shipped production systems with Python, Go, Laravel, and modern frontend frameworks.",
    "With 800+ DSA problems solved and experience across backend, AI/ML, and mechatronics, I bring a unique cross-disciplinary perspective to every project I work on.",
  ],
};

// --- Stats shown in the About section ---------------------------------------
export const stats = [
  { value: "800+", label: "DSA Problems Solved" },
  { value: "10+", label: "Projects Built" },
  { value: "3+", label: "Years Experience" },
  { value: "6+", label: "Technologies" },
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
    title: "AI System Engineer",
    company: "Budera",
    period: "Oct 2025 – Nov 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Architected backend infrastructure and built agentic systems for financial data analysis and cost optimization.",
    achievements: [
      "Architected the core backend infrastructure using Laravel to orchestrate autonomous multi-agent workflows for cost optimization",
      "Engineered a hybrid agentic architecture using Laravel, Laragent, and Vizra to autonomously categorize thousands of financial transaction records",
      "Developed a specialized microservice using FastAPI and LangChain with MCP support for high-performance context exchange between LLMs and external data tools",
    ],
    skills: ["Laravel", "Laragent", "Vizra", "FastAPI", "LangChain", "MCP", "Docker"],
  },
  {
    title: "AI Engineer",
    company: "ICOG Labs",
    period: "Jan 2025 – Apr 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built MCP servers, trained AI models, and optimized machine learning pipelines across multiple applications.",
    achievements: [
      "Developed and deployed 5+ AI models improving prediction accuracy by 30%",
      "Optimized ML pipelines reducing inference time by 40%",
      "Collaborated with research teams on state-of-the-art NLP solutions",
      "Mentored 3 junior engineers in AI development practices",
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Docker", "Kubernetes"],
    link: "https://www.icog-labs.com/",
  },
  {
    title: "Kifiya AI Mastery Program",
    company: "Kifiya Financial Technology",
    period: "Sep 2025 – Nov 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      "Completed an intensive 3-month AI Mastery program focused on ML engineering, data engineering, deployment, and generative AI for fintech.",
    achievements: [
      "Data Engineering: ETL, DBT transformations, DVC and infrastructure setup for data pipelines",
      "Deployment & MLOps: Docker, GitHub CI/CD, model deployment, unit testing and dashboard building",
      "ML & Generative AI: predictive modeling, RAG, prompt engineering, and LLM fine-tuning",
    ],
    skills: ["Python", "SQL", "Data Engineering", "Docker", "CI/CD", "MLOps", "RAG"],
    link: "https://kifiya.com/",
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
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker", "Git"],
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
      "Relevant Courses: Introduction to Programming (cpp), Object Oriented Programming, Machine Learning, Mechatronics System, Computer Vision, Numerics (Computational Methods), Robotics, Embedded Systems.",
  },
  {
    degree: "Coding School — A2SV",
    school: "Africa to Silicon Valley",
    period: "Nov 2023 – Nov 2024",
    description:
      "Solved 800+ problems on Leetcode/Codeforces. 1,000+ hours of DSA training.",
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
    githubUrl: "https://github.com/dipherent1/PHP_learning/tree/main/PHP/phase3/support-hub-ai",
    image: "/image/supporthub-ai-1.jpg",
  },
  {
    title: "Hyprland AI Assistant",
    description:
      "Native AI desktop assistant for Linux built with Golang and Flyt. Reduces workflow friction for AI tasks by 75% by integrating directly with Google's Gemini API for multimodal interactions.",
    techStack: ["Golang", "Flyt", "Linux", "Gemini API"],
    githubUrl: "https://github.com/dipherent1/ai_wraper",
    image: "/image/fedora-copilot.jpg",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7385968582125576192/",
  },
  {
    title: "Info-Stream: AI Alert Engine for Telegram",
    description:
      "Production-ready Telegram bot that transforms high-volume chats into a personalized intelligence feed. AI-powered semantic search with Gemini & pgvector, decoupled microservices architecture.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "SQLAlchemy", "AWS"],
    githubUrl: "https://github.com/dipherent1/Tg_wrapper",
    image: "/image/info-image-1.jpg",
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
      "Golang", "Python", "TypeScript", "C/C++", "PHP",
      "FastAPI", "Django", "Laravel", "React", "Next.js",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "AI Agent Development", "LangChain", "MCP",
      "TensorFlow", "PyTorch", "NLP", "Computer Vision",
      "RAG", "Prompt Engineering",
    ],
  },
  {
    title: "Databases & Infrastructure",
    skills: [
      "PostgreSQL", "MongoDB", "Redis",
      "Docker", "Kubernetes", "CI/CD",
      "Linux", "Git", "AWS",
    ],
  },
  {
    title: "Mechatronics & IoT",
    skills: [
      "Arduino", "ESP-32", "Robotics",
      "Embedded Systems", "Solidworks",
      "PCB Design", "MQTT",
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
