import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowUpRight, Search } from "lucide-react";
import ProjectModal from "@/components/ProjectModal";

// ── Types ────────────────────────────────────────────────────────────────────
type Project = (typeof projects)[number];

const ALL_CATEGORIES = [
  "All",
  "Full Stack SaaS",
  "Full Stack AI",
  "Cybersecurity ML",
  "Data Engineering",
] as const;

type Category = (typeof ALL_CATEGORIES)[number];

// Map category → accent classes for badges & card highlight
const CATEGORY_ACCENT: Record<string, string> = {
  "Full Stack SaaS": "border-emerald-400/30 text-emerald-400 bg-emerald-400/10",
  "Full Stack AI":   "border-cyan-400/30 text-cyan-400 bg-cyan-400/10",
  "Cybersecurity ML":"border-violet-400/30 text-violet-400 bg-violet-400/10",
  "Data Engineering":"border-amber-400/30 text-amber-400 bg-amber-400/10",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: Category;
  onChange: (c: Category) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
    >
      {ALL_CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            id={`project-tab-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => onChange(cat)}
            className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.12em] border transition-all duration-200 active:scale-95 ${
              isActive
                ? "bg-primary text-black border-primary shadow-lg shadow-primary/20"
                : "bg-white/[0.04] border-white/10 text-white/55 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span
                className={`ml-1.5 text-[0.6rem] font-bold ${isActive ? "opacity-60" : "opacity-40"}`}
              >
                {counts[cat] ?? 0}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onInspect,
}: {
  project: Project;
  index: number;
  onInspect: (p: Project) => void;
}) {
  const isFeatured = project.id === 1;
  const accentClass = CATEGORY_ACCENT[project.category] ?? "border-primary/30 text-primary bg-primary/10";
  const parts = project.title.split(" — ");
  const mainTitle = parts[0];
  const subTitle = parts.length > 1 ? parts[1] : null;

  return (
    <motion.article
      layout
      key={project.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.38, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 sm:p-8 transition-all duration-500 ${
        isFeatured
          ? "border-primary/40 bg-gradient-to-br from-primary/10 via-white/[0.04] to-white/[0.02] shadow-2xl shadow-primary/10"
          : "border-white/[0.09] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
      aria-label={`Project: ${mainTitle}`}
    >
      {/* Featured glow blob */}
      {isFeatured && (
        <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      )}

      {/* ── Top: badges + number ── */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="mono text-xs font-bold text-primary/70">0{project.id}</span>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <span className="mono rounded-full border border-white/12 bg-white/5 backdrop-blur-sm px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-white/60 whitespace-nowrap">
              {project.period}
            </span>
            <span className={`rounded-full border backdrop-blur-sm px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] whitespace-nowrap ${accentClass}`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h3
            className={`font-extrabold tracking-tight text-white transition-colors group-hover:text-primary ${
              isFeatured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
            }`}
          >
            {mainTitle}
          </h3>
          {subTitle && (
            <p className="text-sm text-white/55 mt-1">{subTitle}</p>
          )}
        </div>

        {/* Description — truncated, 4 lines */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4 mb-6">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs text-white/65 transition-colors group-hover:border-primary/25"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="rounded-full border border-white/8 px-3 py-1 text-xs text-white/35">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ── Bottom: actions ── */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
        <button
          onClick={() => onInspect(project)}
          id={`inspect-project-${project.id}`}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-primary hover:text-black hover:border-primary active:scale-95 backdrop-blur-sm"
        >
          <Search className="h-3.5 w-3.5" />
          Inspect Project
        </button>
        {"githubUrl" in project && (project as any).githubUrl && (
          <a
            href={(project as any).githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${mainTitle} GitHub repository`}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 transition-colors hover:text-primary group/lnk"
          >
            Code
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const counts = Object.fromEntries(
    ALL_CATEGORIES.filter((c) => c !== "All").map((c) => [
      c,
      projects.filter((p) => p.category === c).length,
    ])
  );

  return (
    <>
      {/* ── Project Detail Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <section id="projects" className="section-rule py-28 relative overflow-hidden">
        <div className="section-wrap relative z-10">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
          >
            <div>
              <p className="section-kicker mb-5">03 / Selected work</p>
              <h2 className="text-5xl font-bold sm:text-6xl tracking-tight text-white">
                Featured<br />Projects.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-right">
              A curated collection of full-stack platforms, machine learning systems, and data analytics engines. Click{" "}
              <span className="text-primary font-semibold">Inspect Project</span> to view architecture & metrics.
            </p>
          </motion.div>

          {/* ── Category Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <FilterTabs
              active={activeCategory}
              onChange={setActiveCategory}
              counts={counts}
            />
          </motion.div>

          {/* ── Project Grid with AnimatePresence ── */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onInspect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center text-white/30 text-sm"
              >
                No projects in this category yet.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
