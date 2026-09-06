import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      const sections = document.querySelectorAll("section[id]");
      let currentSectionId = "";
      const scrollPos = window.scrollY + 220;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i] as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = el.getAttribute("id") || "";
          break;
        }
      }

      setActiveSection((prev) => (prev !== currentSectionId ? currentSectionId : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", onScroll);
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
    // Close the mobile menu FIRST so its collapse animation doesn't
    // shift the layout while scrollIntoView is calculating position.
    setMobileMenuOpen(false);
    // Wait for the menu exit animation (350ms) to finish, then scroll.
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 380);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#030303]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/90"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="section-wrap flex items-center justify-between">
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
          aria-label="Ansh Karwa home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 text-white group"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-display text-sm font-bold shadow-lg transition-transform group-hover:scale-105">
            AK
          </span>
          <span className="hidden text-sm font-bold tracking-[0.2em] sm:block opacity-90 group-hover:text-primary transition-colors">
            ANSH KARWA
          </span>
        </motion.a>

        {/* Desktop Nav Links with Sliding Pill */}
        <div className="hidden items-center gap-1 bg-white/5 rounded-full border border-white/10 p-1 backdrop-blur-md md:flex shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors rounded-full ${
                  isActive ? "text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white rounded-full z-0 shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>
        
        {/* Resume Button */}
        <div className="hidden md:block">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black hover:border-white shadow-sm"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="text-white md:hidden p-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md active:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      {/* Mobile Animated Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/10 bg-[#030303]/98 backdrop-blur-3xl md:hidden overflow-hidden"
          >
            <div className="section-wrap flex flex-col gap-2 py-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`p-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
                    activeSection === link.href.substring(1) ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase text-black"
              >
                View resume <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

