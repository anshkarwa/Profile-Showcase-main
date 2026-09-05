import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, CornerDownLeft, RefreshCw, ArrowUpRight } from "lucide-react";
import { personalInfo, experience, projects, skills, certifications, education } from "@/lib/data";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "Why did you build TenantOS?",
  "Tell me about your IoT internship",
  "What ML & Data Science skills do you have?",
  "What are your strengths & career goals?",
  "Can I download your resume?",
];

// Knowledge base response generator
function getAIResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 0. Security Guard / Jailbreak
  if (
    q.includes("ignore previous") ||
    q.includes("system prompt") ||
    q.includes("jailbreak") ||
    q.includes("dan mode") ||
    q.includes("forget all")
  ) {
    return `I am Ansh's AI Portfolio Assistant, designed specifically to answer questions about Ansh Karwa's engineering work, projects, and skills. How can I help you explore Ansh's portfolio?`;
  }

  // 1. Practical / Navigation & Links
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return `You can view and download Ansh's official resume here: [Download Resume](/resume.pdf)`;
  }

  if (q.includes("github") || q.includes("repo") || q.includes("source code")) {
    return `You can explore Ansh's repositories and code on GitHub: [github.com/anshkarwa](https://github.com/anshkarwa)!`;
  }

  if (q.includes("linkedin") || q.includes("connect") || q.includes("social")) {
    return `You can connect with Ansh on LinkedIn here: [linkedin.com/in/ansh-karwa](https://www.linkedin.com/in/ansh-karwa)!`;
  }

  if (q.includes("blog") || q.includes("write-up") || q.includes("article")) {
    return `Ansh writes project documentation and case studies directly alongside his builds! You can inspect his deep-dive project breakdowns right here on this portfolio or on GitHub.`;
  }

  if (
    q.includes("are you an ai") ||
    q.includes("is this an ai") ||
    q.includes("are you human") ||
    q.includes("is this you talking") ||
    q.includes("real ansh")
  ) {
    return `I am an **AI Portfolio Assistant** trained on Ansh Karwa's resume, technical experience, and project documentation! If you'd like to get in touch directly with Ansh, feel free to send him an email at **${personalInfo.email}**.`;
  }

  // 2. Project Deep-Dives — TenantOS
  if (q.includes("why") && (q.includes("tenantos") || q.includes("tenant") || q.includes("build tenantos"))) {
    return `Ansh built **TenantOS** to solve the real-world friction landlords face managing multi-property leases, tracking overdue rent, and issuing receipts manually. It automates monthly billing cycles, late fee calculations, and instant PDF receipt generation.`;
  }

  if (
    q.includes("hardest part") ||
    q.includes("challenge in tenantos") ||
    q.includes("cron") ||
    q.includes("razorpay integration")
  ) {
    return `The hardest part of building **TenantOS** was ensuring **idempotent cron job execution** for monthly invoicing and handling asynchronous webhooks with **Razorpay**. Ansh architected fail-safe database transactions in Prisma so rent fees are never double-billed.`;
  }

  if (q.includes("payment flow") || q.includes("how payment works")) {
    return `In **TenantOS**, when rent is due, a background cron job generates an invoice. The tenant receives a payment link powered by **Razorpay API**. Upon payment confirmation via webhook, TenantOS marks the invoice paid and automatically generates a PDF receipt via **PDFKit**.`;
  }

  if (q.includes("tenantos") || q.includes("tenant") || q.includes("property")) {
    return `**TenantOS** is Ansh's flagship Full-Stack SaaS platform! Built with React, TypeScript, Fastify, PostgreSQL (Prisma), TailwindCSS, and Razorpay. It features multi-property leasing, tenant tracking, automated monthly invoicing (PDFKit), late-fee calculations, and real-time occupancy dashboards with Recharts & TanStack Query.`;
  }

  // 3. Project Deep-Dives — Travel Recommendation System
  if (q.includes("travel") || q.includes("92%") || q.includes("accuracy") || q.includes("landmark") || q.includes("opencv")) {
    if (q.includes("why 92") || q.includes("improve") || q.includes("higher")) {
      return `The **Travel Recommendation System** achieved **92% accuracy** classifying landmarks using an OpenCV CNN model. To reach 98%+, Ansh notes that expanding dataset diversity under varied lighting/angles and leveraging transfer learning (ResNet/EfficientNet) would yield higher precision.`;
    }
    return `Ansh built a **Travel Recommendation System** featuring a CNN image recognition engine using OpenCV & Python that achieved **92% accuracy** in identifying key landmarks from user photos!`;
  }

  // 4. Project Deep-Dives — Tourism & Malware & Pride/Rebuild
  if (q.includes("tourism") || q.includes("dataset") || q.includes("insight")) {
    return `The **Tourism Analysis** project analyzed over **10,000+ records** to uncover visitor footfall trends, seasonal patterns, and demographic shifts, providing data-driven recommendations for attraction management.`;
  }

  if (q.includes("malware") || q.includes("cyber") || q.includes("security")) {
    return `Ansh developed a **Malware Detection System** using static file analysis and Scikit-learn pattern recognition, achieving **85% detection accuracy**.`;
  }

  if (q.includes("proud") || q.includes("favorite project") || q.includes("favourite project")) {
    return `Ansh is most proud of **TenantOS**. It bridges full-stack engineering with real-world financial automation—combining complex backend workflows (Fastify, Prisma, PostgreSQL), third-party payments (Razorpay), and slick frontend analytics (Recharts).`;
  }

  if (q.includes("rebuild") || q.includes("change today") || q.includes("if you rebuilt")) {
    return `If rebuilding **TenantOS** today, Ansh would integrate **WebSockets** for real-time tenant notifications and implement **Redis caching** for analytics query optimization under heavy landlord traffic.`;
  }

  // 5. Work Experience & Internship
  if (q.includes("shalaka") || q.includes("internship") || q.includes("experience") || q.includes("work")) {
    const exp = experience[0];
    return `Ansh worked as an **IoT and Cloud Intern** at **${exp.company}** in Pune (${exp.period}). He engineered full-stack data pipelines bridging physical IoT device telemetry with cloud dashboards, developed services with React & Flask, and handled containerized deployments.`;
  }

  // 6. About Ansh / Soft Skills / Strengths
  if (
    q.includes("tell me about yourself") ||
    q.includes("who is ansh") ||
    q.includes("about ansh") ||
    q.includes("introduce")
  ) {
    return `Ansh Karwa is an **AI/ML Engineer & Data Scientist** based in Thane, Maharashtra. He combines predictive machine learning models, data engineering pipelines, and modern full-stack development to solve real-world problems.`;
  }

  if (q.includes("strength") || q.includes("superpower")) {
    return `Ansh's greatest strengths are his **end-to-end technical adaptability** (bridging ML models with full-stack products), **problem-solving clarity**, and **dedication to clean architecture** and user experience.`;
  }

  if (q.includes("how do you learn") || q.includes("learning new") || q.includes("new tech")) {
    return `Ansh learns by **building production-ready projects**. He dives straight into official documentation, constructs a working prototype (like TenantOS for Fastify/Prisma), and iterates based on real constraints.`;
  }

  if (
    q.includes("outside of coding") ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("design") ||
    q.includes("graphic")
  ) {
    return `Outside of machine learning and code, Ansh enjoys **UI/UX design, graphic design, and logo crafting**. This design sensibility is why his technical projects feature clean typography, glassmorphism, and intuitive interfaces.`;
  }

  if (q.includes("team") || q.includes("leadership") || q.includes("collaboration")) {
    return `During his internship at **Shalaka Connected Devices**, Ansh collaborated closely with hardware engineers and cloud teams to deliver IoT device telemetry dashboards. He values clear documentation and agile communication.`;
  }

  if (q.includes("failure") || q.includes("challenge faced") || q.includes("handle challenge")) {
    return `Early in building data pipelines, Ansh faced unexpected telemetry data loss due to network dropouts. He solved this by implementing **local queue buffering and exponential backoff retry mechanisms**, ensuring 99.9% data delivery reliability.`;
  }

  // 7. Career & Goals & Notice Period
  if (q.includes("career goal") || q.includes("long term") || q.includes("future")) {
    return `Ansh aims to grow as a **Lead AI/ML Engineer**, architecting scalable intelligent systems that seamlessly connect state-of-the-art machine learning models with robust cloud and full-stack software.`;
  }

  if (q.includes("ai/ml vs") || q.includes("why ai") || q.includes("why ml")) {
    return `Ansh loves **AI/ML** because it transforms raw, unstructured data into predictive intelligence, while **full-stack engineering** provides the vehicle to deliver that intelligence to end-users seamlessly.`;
  }

  if (
    q.includes("notice period") ||
    q.includes("start date") ||
    q.includes("when can you start") ||
    q.includes("joining")
  ) {
    return `Ansh completes his B.Tech in **May 2026** and finishes his active internship in **July 2026**. He is available for full-time joining immediately upon graduation/completion.`;
  }

  // 8. General Tech Stack & Education & Certifications
  if (q.includes("skill") || q.includes("ml") || q.includes("python") || q.includes("tech") || q.includes("stack") || q.includes("tool")) {
    return `Ansh specializes in **AI/ML & Full-Stack Systems**!\n\n• **Languages**: Python, SQL, C/C++, Java, JavaScript\n• **AI/ML**: TensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy\n• **Full Stack**: React, Node.js, Fastify, Flask, PostgreSQL, Prisma, TailwindCSS\n• **Cloud & DevOps**: GCP, Docker, Git, REST APIs, ETL Pipelines`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("university") || q.includes("gpa")) {
    const edu = education[0];
    return `Ansh is pursuing a **${edu.degree}** at **${edu.school}** (${edu.period}) with a CGPA of 7.6/10.`;
  }

  if (q.includes("certif") || q.includes("deloitte") || q.includes("tata") || q.includes("forage")) {
    return `Ansh holds certifications in:\n\n1. **Data Visualisation: Empowering Business** (Tata Group / Forage)\n2. **GenAI Powered Data Analytics Job Simulation** (Tata Group / Forage)\n3. **Data Analytics Job Simulation** (Deloitte)\n4. **IoT & Cloud Internship Certificate** (Shalaka Connected Devices)`;
  }

  if (q.includes("role") || q.includes("hiring") || q.includes("available") || q.includes("job") || q.includes("contact") || q.includes("email")) {
    return `Yes! Ansh is **Open to Full-Time Roles & Opportunities** in AI/ML, Full-Stack SaaS, and Data Engineering. He is based in Thane, Maharashtra, and available for remote & relocation. You can reach out directly at **${personalInfo.email}** or connect on LinkedIn!`;
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("who")) {
    return `Hello! 👋 I'm Ansh's AI Portfolio Assistant. I can answer questions about Ansh Karwa's engineering projects, technical stack, internship experience, soft skills, or career goals. What would you like to know?`;
  }

  // 9. Fallback for Unrelated Topics (Weather, Jokes, Sports)
  if (
    q.includes("weather") ||
    q.includes("joke") ||
    q.includes("sport") ||
    q.includes("movie") ||
    q.includes("recipe") ||
    q.includes("game")
  ) {
    return `I'm specifically trained to assist with **Ansh Karwa's portfolio, AI/ML background, and software engineering experience**! Ask me about projects like **TenantOS**, his **Shalaka internship**, or **technical skills**.`;
  }

  // 10. Default Fallback
  return `I don't have that specific detail in my knowledge base, but Ansh would be happy to answer! You can reach out directly to Ansh at **${personalInfo.email}**.`;
}

function FormattedText({ text }: { text: string }) {
  // Strip outer ** around markdown links if present
  const cleanedText = text.replace(/\*\*(\[.*?\]\(.*?\))\*\*/g, "$1");
  const tokenRegex = /(\[.*?\]\(.*?\)|`.*?`|\*\*.*?\*\*)/g;
  const parts = cleanedText.split(tokenRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const [, label, url] = linkMatch;
          const isDownload = url.endsWith(".pdf") || url.includes("resume");
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              download={isDownload ? "Ansh_Karwa_Resume.pdf" : undefined}
              className="inline-flex items-center gap-1 font-bold text-primary underline underline-offset-4 hover:text-white transition-colors"
            >
              <span>{label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }

        return part;
      })}
    </>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi! I'm Ansh's AI Assistant. Ask me anything about his projects, tech stack, or work experience!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate AI thinking & response
    setTimeout(() => {
      const responseText = getAIResponse(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-primary/40 bg-[#0a0a0a]/90 backdrop-blur-xl px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-primary/20 transition-all hover:border-primary hover:bg-[#111] ${isOpen ? "hidden" : "flex"
          }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        <span>Ask AI</span>
      </motion.button>

      {/* Modal Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[min(520px,calc(100vh-6.5rem))] max-h-[calc(100vh-6.5rem)] flex flex-col rounded-3xl border border-white/15 bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-4 px-6 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    Ansh's AI Assistant
                    <span className="mono rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[0.6rem] text-primary uppercase font-bold">
                      Interactive
                    </span>
                  </h3>
                  <p className="text-[0.7rem] text-muted-foreground">Trained on Ansh's projects & background</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 px-5 space-y-4 scrollbar-none">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary mt-1">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[82%] rounded-2xl p-3.5 px-4 text-xs leading-relaxed ${msg.sender === "user"
                    ? "bg-primary text-black font-medium rounded-tr-none"
                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none whitespace-pre-line"
                    }`}>
                    <FormattedText text={msg.text} />
                    <div className={`text-[0.6rem] mt-1.5 text-right opacity-60 ${msg.sender === "user" ? "text-black" : "text-muted-foreground"}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white mt-1">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className="bg-white/5 border border-white/10 text-muted-foreground rounded-2xl rounded-tl-none p-3 px-4 text-xs flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse delay-150" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse delay-300" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Questions */}
            <div className="p-3 px-5 border-t border-white/10 bg-white/[0.01]">
              <p className="text-[0.65rem] mono uppercase tracking-wider text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] text-white/80 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 px-4 border-t border-white/10 bg-[#0a0a0a] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about TenantOS, skills, ML models..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`p-2.5 rounded-full transition-all ${input.trim()
                  ? "bg-primary text-black hover:scale-105 active:scale-95"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
