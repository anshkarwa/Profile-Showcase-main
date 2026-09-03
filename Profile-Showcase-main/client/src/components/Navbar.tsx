import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      let currentSectionId = "";
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSectionId = section.getAttribute("id") || "";
        }
      });
      
      setActiveSection(currentSectionId);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl" : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="section-wrap flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} aria-label="Ansh Karwa home" className="flex items-center gap-3 text-white group">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-display text-sm font-bold transition-transform group-hover:scale-105">AK</span>
          <span className="hidden text-sm font-bold tracking-[0.2em] sm:block opacity-90">ANSH KARWA</span>
        </a>

        <div className="hidden items-center gap-1 bg-white/5 rounded-full border border-white/10 p-1 backdrop-blur-md md:flex shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors rounded-full ${
                activeSection === link.href.substring(1) 
                  ? "text-black bg-white" 
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="hidden md:block">
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black">
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="text-white md:hidden p-2 rounded-full border border-white/10 bg-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-b border-white/10 bg-[#030303]/95 backdrop-blur-3xl md:hidden"
        >
          <div className="section-wrap flex flex-col gap-2 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`p-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] ${
                  activeSection === link.href.substring(1) ? "bg-white text-black" : "text-white/70 hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase text-black">
              View resume <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
