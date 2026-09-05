import { motion } from "framer-motion";
import { skills, certifications } from "@/lib/data";
import { ArrowUpRight, CheckCircle2, Cpu } from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="section-rule py-28 relative">
      <div className="section-wrap relative z-10">
        <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr]">
          {/* Skills Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-14"
            >
              <p className="section-kicker mb-5">04 / Toolkit</p>
              <h2 className="text-5xl font-bold sm:text-6xl tracking-tight text-white">Engineering<br />Arsenal.</h2>
            </motion.div>

            <div className="space-y-12">
              {skills.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                      <Cpu className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="mono text-sm uppercase tracking-[0.13em] text-white/90">{category.category}</h3>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="flex flex-wrap gap-3 pl-14">
                    {category.items.map((skill) => (
                      <div 
                        key={skill}
                        className="skill-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:shadow-primary/20"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-14"
            >
              <p className="section-kicker mb-5">05 / Proof points</p>
              <h2 className="text-5xl font-bold sm:text-6xl tracking-tight text-white">Always<br />Learning.</h2>
            </motion.div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <a 
                    href={cert.link || "#"} 
                    target={cert.link && cert.link !== "#" ? "_blank" : undefined}
                    rel={cert.link && cert.link !== "#" ? "noopener noreferrer" : undefined}
                    className="group flex flex-col sm:flex-row items-start gap-5 rounded-[1.5rem] border border-white/10 bg-[#0a0a0a]/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-[#111]"
                  >
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white leading-snug group-hover:text-primary transition-colors text-lg mb-2">{cert.name}</p>
                      <p className="mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{cert.provider} · {cert.period}</p>
                    </div>
                    <ArrowUpRight className="mt-2 sm:mt-0 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
