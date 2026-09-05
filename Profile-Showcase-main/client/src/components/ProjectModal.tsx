import { useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Lightbulb,
  Target,
} from "lucide-react";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Full Stack SaaS": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Full Stack AI": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  "Cybersecurity ML": "text-violet-400 border-violet-400/30 bg-violet-400/10",
  "Data Engineering": "text-amber-400 border-amber-400/30 bg-amber-400/10",
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, handleKeyDown]);

  const categoryClass =
    CATEGORY_COLORS[project?.category ?? ""] ??
    "text-primary border-primary/30 bg-primary/10";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="project-modal-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="project-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[201] flex items-end justify-center sm:items-center p-0 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-modal-panel w-full max-w-3xl max-h-[92dvh] sm:max-h-[88vh] overflow-y-auto flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#0a0a0c] border border-white/10 shadow-2xl shadow-black/60 scrollbar-none">

              {/* ── Header ── */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-7 py-6 bg-[#0a0a0c]/95 backdrop-blur-lg border-b border-white/[0.07]">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] ${categoryClass}`}
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      {project.category}
                    </span>
                    <span className="mono text-[0.65rem] text-white/40 uppercase tracking-widest">
                      {project.period}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                    {project.title.split(" — ")[0]}
                  </h2>
                  {project.title.includes(" — ") && (
                    <p className="text-sm text-white/50 mt-0.5">
                      {project.title.split(" — ")[1]}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close project details"
                  className="flex-none flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="flex flex-col gap-8 px-7 py-8">

                {/* Overview */}
                <p className="text-sm sm:text-base leading-relaxed text-white/70">
                  {project.description}
                </p>

                {/* Problem / Solution */}
                {"problem" in project && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-4 w-4 text-red-400" />
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-red-400">
                          Problem
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/65">
                        {(project as any).problem}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">
                          Solution
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/65">
                        {(project as any).solution}
                      </p>
                    </div>
                  </div>
                )}

                {/* Architecture Pipeline */}
                {"architectureSteps" in project && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                        System Architecture
                      </span>
                    </div>
                    <div className="relative flex flex-col gap-0">
                      {(project as any).architectureSteps.map(
                        (
                          s: { step: string; detail: string },
                          i: number,
                          arr: any[]
                        ) => (
                          <div key={s.step} className="flex items-stretch gap-4">
                            {/* Timeline spine */}
                            <div className="flex flex-col items-center">
                              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-bold shadow-md shadow-primary/10">
                                {i + 1}
                              </div>
                              {i < arr.length - 1 && (
                                <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent my-1" />
                              )}
                            </div>
                            {/* Content */}
                            <div className={`pb-5 ${i === arr.length - 1 ? "pb-0" : ""}`}>
                              <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                                {s.step}
                              </p>
                              <p className="text-sm text-white/55 leading-relaxed">
                                {s.detail}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Metrics */}
                {"metrics" in project && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                        Key Results & Metrics
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(project as any).metrics.map((m: string) => (
                        <li
                          key={m}
                          className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-primary flex-none mt-0.5" />
                          <span className="text-sm leading-relaxed text-white/70">
                            {m}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-3 block">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/70 backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Footer Actions ── */}
              <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 px-7 py-5 bg-[#0a0a0c]/95 backdrop-blur-lg border-t border-white/[0.07]">
                {"githubUrl" in project && (project as any).githubUrl && (
                  <a
                    href={(project as any).githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-white hover:text-black hover:border-white active:scale-95"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
                {"liveUrl" in project && (project as any).liveUrl && (
                  <a
                    href={(project as any).liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-black hover:border-primary active:scale-95"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Close — Esc
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
