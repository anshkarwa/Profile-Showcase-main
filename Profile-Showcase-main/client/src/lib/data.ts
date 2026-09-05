import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const personalInfo = {
  name: "Ansh Karwa",
  role: "AI/ML Engineer & Data Scientist",
  tagline: "Transforming raw data into intelligent solutions.",
  about: "I build predictive systems and data products that connect the messy reality of data with decisions people can actually make. My work spans machine learning, IoT analytics, cloud workflows, and full-stack development.",
  email: "anshkarwa2403@gmail.com",
  location: "Thane, Maharashtra, India",
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
    description: "Built a scalable property management platform using React, TypeScript, Fastify, and PostgreSQL to streamline multi-property leasing, tenant tracking, and automated rent collection. Integrated Razorpay payments and background cron jobs to automate monthly invoicing, automated payment receipt generation (PDFKit), and late-fee calculations. Architected real-time analytics dashboards using Recharts and TanStack Query, enabling landlords to track occupancy rates, revenue trends, and pending dues.",
    problem: "Landlords managing multiple properties faced fragmented workflows — scattered spreadsheets for rent tracking, manual invoice generation, and no unified view of occupancy or dues across their portfolio.",
    solution: "Designed a multi-tenant SaaS platform where each landlord gets an isolated workspace. Automated billing via Razorpay webhooks + cron jobs, PDF receipts via PDFKit, and real-time dashboards via TanStack Query + Recharts.",
    metrics: [
      "Automated 100% of monthly invoicing via background cron jobs",
      "PDF receipts generated on payment confirmation in < 2s",
      "Real-time occupancy & revenue dashboards with 30-day trend charts",
      "Late-fee auto-calculation with configurable grace period rules"
    ],
    architectureSteps: [
      { step: "Frontend", detail: "React + TypeScript SPA with TanStack Query for server state caching" },
      { step: "API Layer", detail: "Fastify REST API with Zod schema validation and JWT auth" },
      { step: "Database", detail: "PostgreSQL with Prisma ORM — multi-tenant row-level isolation" },
      { step: "Payments", detail: "Razorpay integration with webhook-driven invoice & receipt automation" },
      { step: "Background Jobs", detail: "Cron-based monthly billing engine with late-fee computation" }
    ],
    githubUrl: "https://github.com/anshkarwa",
    liveUrl: ""
  },
  {
    id: 2,
    title: "Travel Recommendation System",
    category: "Full Stack AI",
    period: "June 2025 – August 2025",
    tech: ["Python", "Flask", "React", "PostgreSQL", "Docker", "OpenCV"],
    description: "Architected a full-stack, containerized web application with a Flask REST API and React interface. Engineered a CNN-based image recognition feature using OpenCV that achieved 92% accuracy in identifying key landmarks from photos.",
    problem: "Tourists lacked a personalized way to discover destinations that matched their taste based on visual inputs — existing tools relied only on text search with no image-based discovery.",
    solution: "Built a CNN-powered landmark recognition pipeline (OpenCV + custom trained model) exposed via a Flask REST API. Users upload photos; the system identifies landmarks and recommends related travel itineraries from a PostgreSQL destination store.",
    metrics: [
      "92% CNN landmark recognition accuracy on test dataset",
      "Full-stack containerized with Docker Compose — one-command deployment",
      "React frontend with drag-and-drop image upload + instant recommendations",
      "RESTful Flask API with < 400ms average inference response time"
    ],
    architectureSteps: [
      { step: "Image Ingestion", detail: "React drag-and-drop uploader → Flask /predict endpoint" },
      { step: "CNN Pipeline", detail: "OpenCV preprocessing → custom trained CNN model inference" },
      { step: "Recommendation Engine", detail: "Landmark label → PostgreSQL fuzzy-match → ranked itinerary results" },
      { step: "Containerization", detail: "Docker Compose orchestrating Flask API + React frontend + PostgreSQL" }
    ],
    githubUrl: "https://github.com/anshkarwa",
    liveUrl: ""
  },
  {
    id: 3,
    title: "Malware Detection System",
    category: "Cybersecurity ML",
    period: "January 2025 – April 2025",
    tech: ["Python", "Machine Learning", "Scikit-learn"],
    description: "Developed a malware detection engine using static file analysis in Python, achieving 85% detection accuracy across sample datasets with pattern recognition and feature extraction.",
    problem: "Traditional signature-based antivirus tools fail against polymorphic and zero-day malware. A behaviour-agnostic static analysis engine was needed to catch novel threats before execution.",
    solution: "Extracted static features (PE header metadata, entropy, import tables, byte n-grams) from executable files and trained a Random Forest classifier with Scikit-learn. Applied SMOTE to handle class imbalance in the training dataset.",
    metrics: [
      "85% detection accuracy across held-out sample datasets",
      "Precision 0.88 / Recall 0.82 on malware class",
      "Feature importance analysis revealed top 12 PE header indicators",
      "SMOTE-balanced training — reduced false-negative rate by ~18%"
    ],
    architectureSteps: [
      { step: "Feature Extraction", detail: "PE header parser → entropy analysis → byte n-gram frequency vectors" },
      { step: "Preprocessing", detail: "SMOTE oversampling to balance benign vs malware class ratios" },
      { step: "Model Training", detail: "Random Forest classifier via Scikit-learn with 5-fold cross-validation" },
      { step: "Evaluation", detail: "Confusion matrix, precision/recall, ROC-AUC analysis on held-out test set" }
    ],
    githubUrl: "https://github.com/anshkarwa",
    liveUrl: ""
  },
  {
    id: 4,
    title: "Tourism Analysis",
    category: "Data Engineering",
    period: "August 2024 – October 2024",
    tech: ["Python", "Pandas", "Data Visualization"],
    description: "Developed a data engineering framework analyzing over 10,000 tourism datasets to uncover trends and enhance management strategies for local tourist attractions.",
    problem: "Local tourism boards had siloed, inconsistently formatted datasets across regions with no unified pipeline to surface actionable seasonal trends or visitor behaviour insights.",
    solution: "Built a Python ETL pipeline using Pandas to ingest, normalize, and merge 10k+ tourism records across multiple sources. Produced interactive visualizations (Matplotlib / Seaborn) and a summary report with trend forecasts.",
    metrics: [
      "Processed 10,000+ multi-source tourism records via automated ETL pipeline",
      "Identified top 5 seasonal demand peaks across 12 tourist attraction categories",
      "Reduced manual data consolidation time from days to under 10 minutes",
      "Delivered insights report adopted for regional tourism strategy planning"
    ],
    architectureSteps: [
      { step: "Ingestion", detail: "Multi-format CSV/XLSX reader with Pandas — schema normalization layer" },
      { step: "Transformation", detail: "Deduplication, null imputation, date parsing, and category standardization" },
      { step: "Analysis", detail: "Seasonal trend decomposition, visitor flow clustering, attraction ranking" },
      { step: "Visualization", detail: "Matplotlib + Seaborn charts — heatmaps, line forecasts, bar rankings" }
    ],
    githubUrl: "https://github.com/anshkarwa",
    liveUrl: ""
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
