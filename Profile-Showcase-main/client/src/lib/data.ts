import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const personalInfo = {
  name: "Ansh Karwa",
  role: "AI/ML Engineer & Data Scientist",
  tagline: "Transforming raw data into intelligent solutions.",
  about: "I build predictive systems and data products that connect the messy reality of data with decisions people can actually make. My work spans machine learning, IoT analytics, cloud workflows, and full-stack development.",
  email: "anshkarwa2403@gmail.com",
  location: "Pune, Maharashtra, India",
  social: [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ansh-karwa"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/anshkarwa"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:anshkarwa2403@gmail.com"
    }
  ]
};

export const experience = [
  {
    id: 1,
    company: "Shalaka Connected Devices",
    role: "IoT and Cloud Intern",
    period: "5 Jan 2026 – 4 Jul 2026",
    location: "Pune, Maharashtra, India",
    certificateLink: "/shalaka-internship-certificate.pdf",
    description: "Contributed to IoT telemetry data analysis, cloud deployment workflows, and dashboard development for connected product lines.",
    achievements: [
      "Built cloud-hosted services and full-stack data pipelines bridging physical device telemetry with cloud systems.",
      "Analyzed device data streams to derive actionable insights and support product readiness.",
      "Supported deployment pipelines and cloud portal development with React and Flask.",
      "Applied full-stack development, containerized deployments, and data engineering practices."
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "TenantOS — Full-Stack Property Management SaaS",
    category: "Full Stack SaaS",
    period: "January 2026 – Present",
    tech: ["React", "TypeScript", "Node.js", "Fastify", "PostgreSQL", "Prisma", "TailwindCSS", "Razorpay"],
    description: "Built a scalable property management platform using React, TypeScript, Fastify, and PostgreSQL to streamline multi-property leasing, tenant tracking, and automated rent collection. Integrated Razorpay payments and background cron jobs to automate monthly invoicing, automated payment receipt generation (PDFKit), and late-fee calculations. Architected real-time analytics dashboards using Recharts and TanStack Query, enabling landlords to track occupancy rates, revenue trends, and pending dues."
  },
  {
    id: 2,
    title: "Travel Recommendation System",
    category: "Full Stack AI",
    period: "June 2025 – August 2025",
    tech: ["Python", "Flask", "React", "PostgreSQL", "Docker", "OpenCV"],
    description: "Architected a full-stack, containerized web application with a Flask REST API and React interface. Engineered a CNN-based image recognition feature using OpenCV that achieved 92% accuracy in identifying key landmarks from photos."
  },
  {
    id: 3,
    title: "Malware Detection System",
    category: "Cybersecurity ML",
    period: "January 2025 – April 2025",
    tech: ["Python", "Machine Learning", "Scikit-learn"],
    description: "Developed a malware detection engine using static file analysis in Python, achieving 85% detection accuracy across sample datasets with pattern recognition and feature extraction."
  },
  {
    id: 4,
    title: "Tourism Analysis",
    category: "Data Engineering",
    period: "August 2024 – October 2024",
    tech: ["Python", "Pandas", "Data Visualization"],
    description: "Developed a data engineering framework analyzing over 10,000 tourism datasets to uncover trends and enhance management strategies for local tourist attractions."
  }
];

export const education = [
  {
    id: 1,
    school: "MIT World Peace University",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "August 2022 – May 2026",
    details: "CGPA: 7.6/10"
  }
];

export const skills = [
  { category: "Languages", items: ["Python", "C/C++", "Java", "JavaScript", "SQL", "HTML/CSS"] },
  { category: "ML & AI", items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Generative AI"] },
  { category: "Frameworks & Libraries", items: ["Flask", "FastAPI", "React", "Node.js", "REST APIs"] },
  { category: "Databases & Data Engineering", items: ["MySQL", "MongoDB", "PostgreSQL", "ETL Pipelines", "Data Wrangling", "Statistical Analysis"] },
  { category: "Cloud & DevOps", items: ["Google Cloud Platform", "Docker", "Git", "CI/CD"] },
  { category: "Developer Tools", items: ["VS Code", "PyCharm", "IntelliJ", "Eclipse", "Visual Studio"] },
  { category: "Core Competencies", items: ["Predictive Modeling", "Anomaly Detection", "IoT Analytics", "Data Visualization", "Full-Stack Development"] }
];

export const certifications = [
  {
    name: "IoT & Cloud Internship Certificate",
    provider: "Shalaka Connected Devices LLP",
    period: "July 2026",
    link: "/shalaka-internship-certificate.pdf"
  },
  {
    name: "Data Visualisation: Empowering Business with Effective Insights",
    provider: "Tata Group (Forage)",
    period: "February 2025",
    link: "/data-visualisation-certificate.pdf"
  },
  {
    name: "GenAI Powered Data Analytics Job Simulation",
    provider: "Tata Group (Forage)",
    period: "January 2026",
    link: "/genai-data-analytics-certificate.pdf"
  },
  {
    name: "Data Analytics Job Simulation",
    provider: "Deloitte",
    period: "July 2026",
    link: "/deloitte-data-analytics-certificate.pdf"
  }
];
