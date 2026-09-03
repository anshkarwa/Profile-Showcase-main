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
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="section-kicker mb-5">06 / Education</p>
          <h2 className="text-4xl font-bold sm:text-5xl">The foundation.</h2>
        </motion.div>

        <div className="grid border-t border-[#453133] md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-[#453133] p-6 transition-colors hover:bg-[#211315] sm:p-8 md:border-r md:last:border-r-0"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="mono text-xs text-muted-foreground">{edu.period}</p>
                  <h3 className="mt-4 text-xl font-bold">{edu.school}</h3>
                  <p className="mt-2 text-base text-primary">{edu.degree}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    {edu.details && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-gray-500" />
                        <span>{edu.details}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
