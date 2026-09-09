import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import NeuralBackground from "@/components/NeuralBackground";

const ROLES = [
  "AI/ML Engineer",
  "Data Analyst",
  "Full-Stack Dev",
  "Data Scientist"
];

function TypingEffect() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2200);
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
  // Only enable parallax on pointer-precise (mouse) devices
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mouse Parallax Effect (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const portraitX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const portraitY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerFine || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hero-stage relative flex items-end overflow-hidden pb-10 pt-20 sm:pt-28 min-h-screen"
    >
      {/* Live Interactive Neural Node Field Background */}
      <NeuralBackground />

      {/* Background Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-primary/10 blur-3xl pointer-events-none z-0"
      />

      <div className="section-wrap relative z-10 flex w-full flex-col justify-between">
        {/* ── Centre: metadata + kicker + name ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-4 sm:pt-6 pb-6"
        >
          {/* ── Mobile: avatar + status pill row ── */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:block">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <p className="mono text-[0.68rem] uppercase tracking-[0.15em] text-muted-foreground">
                {personalInfo.location} — Open to Opportunities
              </p>
            </motion.div>

            {/* Mobile-only round avatar (replaces the hidden portrait) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hero-portrait-mobile sm:hidden"
              aria-hidden="true"
            >
              <img
                src="/images/profile-color.jpg"
                alt="Ansh Karwa"
                width={96}
                height={96}
                className="select-none"
              />
            </motion.div>
          </div>

          {/* Kicker + inline role (visible on all screen sizes) */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <p className="section-kicker">01 / Hello, I'm</p>
            <span className="mono text-xs text-muted-foreground">
              — <TypingEffect />
            </span>
          </div>

          {/* Staggered Name + Portrait */}
          <div className="flex items-end justify-between gap-8">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.25 },
                },
              }}
              className="hero-name"
              aria-label={personalInfo.name}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="inline-block text-white"
              >
                Ansh
              </motion.span>
              <br />
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="inline-block text-primary"
              >
                Karwa.
              </motion.span>
            </motion.h1>

            {/* Interactive Parallax Portrait — desktop only */}
            <motion.div
              style={isPointerFine ? { x: portraitX, y: portraitY } : {}}
              initial={{ opacity: 0, scale: 0.88, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hero-portrait ml-auto hidden sm:block shadow-2xl"
            >
              <img
                src="/images/profile-color.jpg"
                alt="Ansh Karwa"
                width={330}
                height={470}
                className="select-none"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground"
          >
            Building intelligent systems, data products, and full-stack solutions at the intersection of{" "}
            <span className="text-foreground font-medium">machine learning, IoT, and cloud.</span>
          </motion.p>
        </motion.div>

        {/* ── Footer: CTA buttons + scroll hint ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="hero-footer mt-auto"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92, rotate: -1 }}
              className="solid-button shadow-lg shadow-primary/10"
            >
              Explore work <ArrowUpRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92, rotate: -1 }}
              className="outline-button"
            >
              Contact me
            </motion.a>
          </div>

          <motion.a
            href="#about"
            aria-label="Scroll to explore"
            whileHover={{ y: 4 }}
            className="hidden text-muted-foreground transition-colors hover:text-primary sm:block animate-bounce"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
