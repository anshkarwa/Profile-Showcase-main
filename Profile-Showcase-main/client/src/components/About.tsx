import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-rule py-28">
      <div className="section-wrap grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-24">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <p className="mono mb-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">01 / About</p>
          <p className="max-w-[210px] text-2xl font-medium leading-tight text-foreground">Curious by default. Practical by choice.</p>
          <div className="mt-12 h-px w-24 bg-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">I like the space between a good question and a useful answer.</h2>
          
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{personalInfo.about}</p>
            <p>I care about the whole journey: asking better questions, designing dependable pipelines, and explaining the result so people can actually use it.</p>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-8 border-t border-[#453133] pt-6 sm:grid-cols-3">
             <div>
                <h3 className="text-3xl font-bold text-primary">01</h3>
                <p className="mt-1 text-sm text-muted-foreground">active internship</p>
             </div>
             <div>
                <h3 className="text-3xl font-bold text-primary">92<span className="text-lg">%</span></h3>
                <p className="mt-1 text-sm text-muted-foreground">landmark model accuracy</p>
             </div>
             <div>
                <h3 className="text-3xl font-bold text-primary">10k+</h3>
                <p className="mt-1 text-sm text-muted-foreground">records analyzed</p>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
