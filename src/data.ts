// ============================================================
//  data.ts  –  EDIT THIS FILE TO UPDATE YOUR ENTIRE PORTFOLIO
// ============================================================

// ── Personal Info ────────────────────────────────────────────
export const personal = {
    name: "Barath Suresh",
    greeting: "Hi, I am",
    tagline: "Nice to meet you",
    role: "Software Engineer",
    location: "Tempe, AZ",
    email: "bsures11@asu.edu",
    phone: "+1 (623) 212-9705",
    openTo: "Open to collaborations & new opportunities",
    about: `I'm a Computer Science graduate student at Arizona State University with a passion for
building robust, scalable backend systems. My experience spans microservices architecture,
distributed systems, real-time communication, and cloud-native tooling. I love turning
complex engineering problems into clean, observable, and maintainable solutions.`,
    interests: ["Backend Systems", "Distributed Computing", "AI/ML Infrastructure"],
    // ── DROP your photo in the public/ folder, then set filename here ──
    profileImage: "/profile.jpg", // e.g. "/profile.jpg"  →  public/profile.jpg
    // ── DROP your resume PDF in the public/ folder, then set filename here ──
    resumeUrl: "/Barath_Suresh_Resume.pdf",    // e.g. "/Barath_Suresh_Resume.pdf" → public/Barath_Suresh_Resume.pdf
};

// ── Social Links ─────────────────────────────────────────────
export const socials = {
    github: "https://github.com/barathsuresh",
    linkedin: "https://linkedin.com/in/barath-suresh",
    twitter: "https://x.com/baraxh_s", // Update with your X handle
    email: `mailto:${personal.email}`,
};

// ── Navigation ───────────────────────────────────────────────
export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

// ── Experience ───────────────────────────────────────────────
export interface ExperienceItem {
    title: string;
    organization: string;
    location: string;
    period: string;
    bullets: string[];
}

export const experience: ExperienceItem[] = [
    {
        title: "Software Development Engineer",
        organization: "Tata Elxsi Ltd.",
        location: "Chennai, India",
        period: "Dec 2024 – Jul 2025",
        bullets: [
            "Built Java Spring APIs backed by MongoDB to process Excel-based employee datasets, reducing parsing time by 20% and streamlining workforce data ingestion.",
            "Containerized services with Docker and integrated Prometheus & Grafana, improving CI/CD pipeline reliability and enabling real-time observability across six containerized services.",
            "Automated log anomaly detection by containerizing a Spring AI + Gemma 3 service that summarizes and flags abnormal logs, reducing manual log triage.",
            "Led weekly code reviews in a 5–8 member Agile team, reducing production bugs and improving overall code quality.",
        ],
    },
    {
        title: "Software Development Engineer Intern",
        organization: "Tata Elxsi Ltd.",
        location: "Bengaluru, India",
        period: "Jan 2024 – Jun 2024",
        bullets: [
            "Built and containerized backend applications with Node.js, Express.js, and MongoDB, reducing deployment time by 50% and improving scalability.",
            "Developed and dockerized a product catalog management microservice as a demo project, serving as a reference for building scalable services.",
            "Integrated real-time communication using MQTT and WebSocket, reducing dropped messages and improving synchronization reliability.",
        ],
    },
];

// ── Education ────────────────────────────────────────────────
export interface EducationItem {
    degree: string;
    major: string;
    organization: string;
    location: string;
    period: string;
    bullets: string[];
}

export const education: EducationItem[] = [
    {
        degree: "Master of Science",
        major: "Computer Science",
        organization: "Arizona State University – Ira A. Fulton Schools of Engineering",
        location: "Tempe, AZ",
        period: "Aug 2025 – May 2027",
        bullets: ["GPA: 3.67 / 4.00", "Fulton Schools of Engineering"],
    },
    {
        degree: "Bachelor of Technology",
        major: "Computer Science and Engineering",
        organization: "SASTRA Deemed University",
        location: "Thanjavur, Tamil Nadu, India",
        period: "2020 – 2024",
        bullets: ["GPA: 3.176 / 4.00"],
    },
];

// ── Projects ─────────────────────────────────────────────────
export interface Project {
    name: string;
    description: string;
    longDescription: string;
    tags: string[];
    url: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        name: "Prism",
        description: "Distributed Video Streaming Platform",
        longDescription:
            "Asynchronous RabbitMQ-based microservices platform with 8 Spring Boot services. Reduces video upload latency by 70% by offloading FFmpeg transcoding to background workers that generate 4 HLS quality variants.",
        tags: ["Spring Boot", "RabbitMQ", "FFmpeg", "MinIO", "Prometheus", "Docker", "JWT"],
        url: "https://github.com/barathsuresh/prism", // Update with actual repo URL
        featured: true,
    },
    {
        name: "HexScript",
        description: "Secure Note-Taking App",
        longDescription:
            "Flutter-based secure note-taking app with offline support and AES-encrypted local storage. Features biometric authentication and a Material You-inspired UI with dark mode and custom theming.",
        tags: ["Flutter", "Dart", "AES Encryption", "Biometric Auth", "Firebase"],
        url: "https://github.com/barathsuresh/HexScript", // Update with actual repo URL
        featured: true,
    },
    // ── Add more projects below ─────────────────────────────────
    // {
    //   name: "Project Name",
    //   description: "One-line tagline",
    //   longDescription: "A short paragraph describing the project.",
    //   tags: ["Tag1", "Tag2"],
    //   url: "https://github.com/...",
    //   featured: false,
    // },
];

// ── Skills ───────────────────────────────────────────────────
export interface SkillCategory {
    category: string;
    items: { name: string; level: number }[]; // level: 0–100
}

export const skills: SkillCategory[] = [
    {
        category: "Languages",
        items: [
            { name: "Java", level: 92 },
            { name: "Python", level: 82 },
            { name: "TypeScript / JavaScript", level: 80 },
            { name: "C / C++", level: 70 },
            { name: "Dart", level: 74 },
            { name: "HTML / CSS", level: 85 },
        ],
    },
    {
        category: "Backend & Frameworks",
        items: [
            { name: "Spring Boot", level: 90 },
            { name: "Spring WebFlux", level: 82 },
            { name: "Node.js / Express.js", level: 80 },
            { name: "Flutter", level: 74 },
            { name: "Spring Cloud Gateway", level: 78 },
            { name: "REST APIs & Microservices", level: 90 },
        ],
    },
    {
        category: "DevOps & Tools",
        items: [
            { name: "Docker", level: 88 },
            { name: "Prometheus & Grafana", level: 80 },
            { name: "Git", level: 90 },
            { name: "RabbitMQ / MQTT", level: 82 },
            { name: "MongoDB", level: 85 },
            { name: "MinIO / Object Storage", level: 76 },
        ],
    },
    {
        category: "Concepts",
        items: [
            { name: "Distributed Systems", level: 88 },
            { name: "JWT / OAuth 2.0 / RBAC", level: 85 },
            { name: "Observability & Tracing", level: 82 },
            { name: "CI/CD Pipelines", level: 78 },
            { name: "Spring AI / LLM Integration", level: 72 },
            { name: "Agile / Code Review", level: 90 },
        ],
    },
];

// ── GA4 Measurement ID ───────────────────────────────────────
// Replace with your actual ID from Google Analytics dashboard
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
