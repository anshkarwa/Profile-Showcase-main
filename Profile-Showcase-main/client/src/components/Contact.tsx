import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-rule py-28 relative overflow-hidden">
      <div className="section-wrap relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <p className="section-kicker mb-5">06 / Contact</p>
          <h2 className="max-w-2xl text-5xl font-bold leading-tight sm:text-7xl text-white tracking-tight">Have a problem worth solving?</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-32">
          {/* Email Bento Box */}
          <motion.a 
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 lg:col-span-2 min-h-[300px] transition-all duration-500 hover:bg-white shadow-xl"
          >
            <div className="flex justify-between items-start z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-black/20 group-hover:bg-black/5 transition-colors duration-500">
                <Mail className="h-6 w-6 text-white group-hover:text-black transition-colors duration-500" />
              </div>
              <ArrowUpRight className="h-8 w-8 text-white/30 group-hover:text-black transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </div>
            <div className="z-10 mt-16">
              <p className="mono text-sm text-white/50 group-hover:text-black/50 transition-colors duration-500 mb-2">Send an email</p>
              <h3 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-black transition-colors duration-500">
                {personalInfo.email}
              </h3>
            </div>
          </motion.a>

          {/* Location Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 min-h-[300px] shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-16">
              <p className="mono text-sm text-white/50 mb-2">Based in</p>
              <h3 className="text-2xl font-bold text-white">
                {personalInfo.location}
              </h3>
              <p className="text-sm text-white/50 mt-4">Available for remote & relocation</p>
            </div>
          </motion.div>

          {/* LinkedIn Bento Box */}
          <motion.a 
            href={personalInfo.social.find(s => s.name === "LinkedIn")?.url || "#"}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 min-h-[250px] transition-all duration-500 hover:bg-[#0077b5] shadow-xl"
          >
            <div className="flex justify-between items-start z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/20 transition-colors duration-500">
                <Linkedin className="h-5 w-5 text-white" />
              </div>
              <ArrowUpRight className="h-6 w-6 text-white/30 group-hover:text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="z-10 mt-8">
              <h3 className="text-2xl font-bold text-white mb-1">LinkedIn</h3>
              <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors duration-500">Connect with me</p>
            </div>
          </motion.a>

          {/* GitHub Bento Box */}
          <motion.a 
            href={personalInfo.social.find(s => s.name === "GitHub")?.url || "#"}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 min-h-[250px] transition-all duration-500 hover:bg-white shadow-xl"
          >
            <div className="flex justify-between items-start z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-black/20 group-hover:bg-black/5 transition-colors duration-500">
                <Github className="h-5 w-5 text-white group-hover:text-black transition-colors duration-500" />
              </div>
              <ArrowUpRight className="h-6 w-6 text-white/30 group-hover:text-black transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="z-10 mt-8">
              <h3 className="text-2xl font-bold text-white group-hover:text-black transition-colors duration-500 mb-1">GitHub</h3>
              <p className="text-sm text-white/50 group-hover:text-black/60 transition-colors duration-500">View repositories</p>
            </div>
          </motion.a>

          {/* Availability & Response Time Bento Box */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, delay: 0.4 }}
             whileHover={{ y: -6 }}
             className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 min-h-[250px] shadow-xl"
          >
            <div className="flex justify-between items-start z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <span className="mono rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-emerald-400">
                Available
              </span>
            </div>
            <div className="z-10 mt-8">
              <h3 className="text-2xl font-bold text-white mb-1">Quick Response</h3>
              <p className="text-sm text-white/50">Typically replies within 24 hours for projects & opportunities.</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Massive Marquee Footer */}
      <div className="w-full overflow-hidden whitespace-nowrap py-10 opacity-20 select-none pointer-events-none mt-20">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="inline-block"
        >
          <span className="text-[10vw] font-bold text-white uppercase tracking-tighter pr-10">LET'S WORK TOGETHER • LET'S WORK TOGETHER • LET'S WORK TOGETHER • LET'S WORK TOGETHER • </span>
        </motion.div>
      </div>
    </section>
  );
}
