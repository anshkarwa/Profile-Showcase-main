import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="section-rule py-28">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="section-kicker mb-5">06 / Education</p>
          <h2 className="text-4xl font-bold sm:text-5xl text-white">The foundation.</h2>
        </motion.div>

        <div className="grid border-t border-white/10 md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-xl">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              className="p-8 sm:p-10 transition-colors md:border-r border-white/10 md:last:border-r-0 group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="mono text-xs text-muted-foreground uppercase tracking-wider">{edu.period}</p>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">{edu.school}</h3>
                  <p className="mt-2 text-base text-primary/90 font-medium">{edu.degree}</p>
                  {edu.details && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{edu.details}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

