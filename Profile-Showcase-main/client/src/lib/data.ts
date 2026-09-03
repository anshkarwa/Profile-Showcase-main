import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const personalInfo = {
  name: "Ansh Karwa",
  role: "AI/ML Engineer & Data Scientist",
  tagline: "Transforming raw data into intelligent solutions.",
  about: "I build predictive systems and data products that connect the messy reality of data with decisions people can actually make. My work spans machine learning, IoT analytics, cloud workflows, and full-stack development.",
  email: "anshkarwa2403@gmail.com",
  phone: "+91 9892735234",
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
      url: "#" // Placeholder as specific URL wasn't in the text
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
    title: "Travel Recommendation System",
    category: "Full Stack AI",
    period: "June 2025 – August 2025",
    tech: ["Python", "Flask", "React", "PostgreSQL", "Docker", "OpenCV"],
    description: "Architected a full-stack, containerized web application with a Flask REST API and React interface. Engineered a CNN-based image recognition feature using OpenCV that achieved 92% accuracy in identifying key landmarks from photos."
  },
  {
    id: 2,
    title: "Malware Detection System",
    category: "Cybersecurity ML",
    period: "January 2025 – April 2025",
    tech: ["Python", "Machine Learning", "Scikit-learn"],
    description: "Developed a malware detection engine using static file analysis in Python, achieving 85% detection accuracy across sample datasets with pattern recognition and feature extraction."
  },
  {
    id: 3,
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
    name: "Tata Group Data Analytics Job Simulation",
    provider: "Forage",
    period: "January 2026",
  },
  {
    name: "Tata Data Visualisation: Empowering Business with Effective Insights",
    provider: "Forage",
    period: "February 2025",
  }
];
