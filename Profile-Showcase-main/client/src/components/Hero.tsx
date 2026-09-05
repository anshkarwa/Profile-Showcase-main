import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

const ROLES = [
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Data Scientist"
];

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
    <span className="text-primary font-semibold">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="hero-stage relative flex items-end overflow-hidden pb-8 pt-32 h-[120vh]"
    >
      <motion.div
        style={{ y, opacity }}
        className="section-wrap relative z-10 flex min-h-[calc(max(720px,100svh)-10rem)] w-full flex-col sticky top-32"
      >
        {/* ── Centre: metadata + kicker + name ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-auto pt-16 pb-6"
        >
          {/* Compact metadata strip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <p className="mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              {personalInfo.location} — Available for roles
            </p>
          </motion.div>

          {/* Kicker + inline role */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <p className="section-kicker">01 / Hello, I'm</p>
            <span className="mono text-xs text-muted-foreground hidden sm:inline">
              — currently: <TypingEffect />
            </span>
          </div>

          {/* Giant name + portrait side by side */}
          <div className="flex items-end justify-between gap-8">
            <h1 className="hero-name" aria-label={personalInfo.name}>
              Ansh<br />
              <span>Karwa.</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hero-portrait ml-auto hidden sm:block"
            >
              <img
                src="/images/profile-color.jpg"
                alt="Ansh Karwa"
                width={330}
                height={470}
              />
            </motion.div>
          </div>

          {/* Description sits cleanly below name */}
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Building intelligent systems, data products, and full-stack solutions at the intersection of{" "}
            <span className="text-foreground">machine learning, IoT, and cloud.</span>
          </p>
        </motion.div>

        {/* ── Footer: CTA buttons + scroll hint ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="hero-footer mt-auto"
        >
          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects" className="solid-button">
              Explore work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="outline-button">
              Contact me
            </a>
          </div>
          <a
            href="#about"
            aria-label="Scroll to explore"
            className="hidden text-muted-foreground transition-colors hover:text-primary sm:block animate-bounce"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
