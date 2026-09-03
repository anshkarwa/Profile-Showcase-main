import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Clock } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

const ROLES = [
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Data Scientist"
];

function LocalTimeWidget() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
      <Clock className="h-3 w-3 text-primary" />
      <span className="mono">{time || "Loading..."} IST</span>
    </div>
  );
}

function TypingEffect() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="inline-block min-w-[180px] text-primary">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="hero-stage relative flex items-end overflow-hidden pb-8 pt-32 h-[120vh]">
      <motion.div 
        style={{ y, opacity }}
        className="section-wrap relative z-10 flex min-h-[calc(max(720px,100svh)-10rem)] w-full flex-col sticky top-32"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-topline items-center"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <LocalTimeWidget />
            <p className="hero-intro">
              <TypingEffect /> <em className="font-serif text-muted-foreground">building</em> intelligent systems, data products, and full-stack solutions.
            </p>
          </div>
          <p className="mono hidden sm:block max-w-[210px] text-right text-[0.65rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
            {personalInfo.location}<br />Available for roles
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-auto pt-20 pb-10"
        >
          <p className="section-kicker mb-6">01 / Hello, I’m</p>
          <h1 className="hero-name" aria-label={personalInfo.name}>
            Ansh<br /><span>Karwa.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="hero-footer mt-auto"
        >
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Building at the intersection of <span className="text-foreground">machine learning, IoT, and cloud.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects" className="solid-button">
              Explore work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="outline-button">
              Contact me
            </a>
          </div>
          <a href="#about" aria-label="Scroll to explore" className="hidden text-muted-foreground transition-colors hover:text-primary sm:block animate-bounce">
            <ArrowDown className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
