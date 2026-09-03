import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="section-rule py-28 relative">
      <div className="section-wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="section-kicker mb-5">03 / Selected work</p>
            <h2 className="text-5xl font-bold sm:text-6xl tracking-tight text-white">A few things<br />I’ve built.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Projects where modeling, engineering, and a real-world problem had to meet in the middle.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`project-card group relative flex h-full flex-col overflow-hidden p-8 sm:p-10 ${index === 0 ? "project-card-featured md:col-span-2 md:min-h-[400px]" : ""}`}
            >
              <div className="flex items-start justify-between gap-4 relative z-10">
                <span className="mono text-sm font-bold text-primary/80">0{index + 1}</span>
                <div className="flex flex-wrap justify-end gap-2">
                  <span className="mono rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.12em] text-white/80">{project.period}</span>
                  <span className="rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary">{project.category}</span>
                </div>
              </div>
              
              <div className="relative z-10 mt-16 sm:mt-24">
                <h3 className={`font-bold tracking-tight text-white transition-colors group-hover:text-primary ${index === 0 ? "text-5xl sm:text-7xl mb-6" : "text-3xl sm:text-4xl mb-4"}`}>
                  {project.title}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground mb-8">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-xs text-white/70 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/10">
                  <a href="#" className="flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-primary group/link">
                    <Github className="h-4 w-4" /> Code <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-primary group/link">
                    <ExternalLink className="h-4 w-4" /> Live Demo <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
