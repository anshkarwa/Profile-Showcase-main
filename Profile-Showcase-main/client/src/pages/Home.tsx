import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { personalInfo } from "@/lib/data";

export default function Home() {
  return (
    <div className="portfolio-shell min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <footer className="section-wrap section-rule flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="mono text-xs">&copy; {new Date().getFullYear()} {personalInfo.name}</p>
        <p>Built with curiosity & an unreasonable amount of coffee.</p>
      </footer>
    </div>
  );
}
