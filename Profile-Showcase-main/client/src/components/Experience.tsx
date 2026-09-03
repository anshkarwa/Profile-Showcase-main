import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { ArrowUpRight, Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="section-rule py-28 relative">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <p className="section-kicker mb-5">02 / Experience</p>
            <h2 className="text-5xl font-bold sm:text-6xl tracking-tight text-white">Career<br />Timeline.</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">A hands-on start in applied ML, data engineering, and connected systems.</p>
        </motion.div>

        <div className="relative space-y-4 sm:space-y-8 pb-32">
          {experience.map((exp, index) => {
            // Calculate a stacked offset so each card sticks slightly below the previous one
            const stickyTop = `calc(20vh + ${index * 40}px)`;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ top: stickyTop }}
                className="sticky w-full rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20"
              >
                <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                  {/* Left Column */}
                  <div className="md:w-1/3 shrink-0">
                    <div className="mono mb-4 text-xs font-semibold text-primary/80">
                      {(index + 1).toString().padStart(2, "0")} / {experience.length.toString().padStart(2, "0")}
                    </div>
                    <div className="mono text-sm text-muted-foreground mb-4">
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
                      <Briefcase className="h-4 w-4" /> {exp.location}
                    </div>
                    <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-primary">
                      Contact <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  
                  {/* Right Column */}
                  <div className="md:w-2/3">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">{exp.role}</h3>
                    <p className="text-xl text-primary/90 mb-6">{exp.company}</p>
                    <p className="text-base leading-relaxed text-muted-foreground mb-8">
                      {exp.description}
                    </p>
                    
                    <ul className="grid gap-4 text-sm leading-relaxed text-white/70 sm:grid-cols-1">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
