import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const stats = [
  { value: "01", label: "Active Internship", suffix: "" },
  { value: "92", label: "Landmark Model Accuracy", suffix: "%" },
  { value: "10k+", label: "Records Analyzed", suffix: "" },
];

export default function About() {
  return (
    <section id="about" className="section-rule py-28 relative overflow-hidden">
      <div className="section-wrap grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-24">

        {/* Left Column: Heading Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1"
        >
          <p className="mono mb-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">01 / About</p>
          <p className="max-w-[220px] text-2xl font-medium leading-tight text-foreground">
            Curious by default. Practical by choice.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 h-px bg-primary"
          />
        </motion.div>

        {/* Right Column: Narrative + Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2"
        >
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl tracking-tight text-white">
            I like the space between a good question and a useful answer.
          </h2>

          <div className="mt-6 sm:mt-8 max-w-2xl space-y-4 sm:space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{personalInfo.about}</p>
            <p>
              I care about the whole journey: asking better questions, designing dependable pipelines, and explaining the result so people can actually use it.
            </p>
          </div>

          {/* Staggered Animated Metrics */}
          <div className="mt-10 sm:mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-2 rounded-xl transition-colors hover:bg-white/[0.03]"
              >
                <h3 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight transition-transform group-hover:scale-105 origin-left">
                  {stat.value}
                  {stat.suffix && <span className="text-xl sm:text-2xl text-primary/80">{stat.suffix}</span>}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

