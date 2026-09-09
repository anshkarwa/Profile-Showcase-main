import { motion, AnimatePresence, useScroll, useSpring, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

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
    // Wait for the menu exit animation to finish, then scroll.
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 320);
  };

  // Staggered Glass Reveal Variants for Mobile Menu
  const menuVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, x: -20, scale: 0.96 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
    exit: { opacity: 0, x: -12, scale: 0.96, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* ── Scroll Progress Line ────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-emerald-400 via-primary to-emerald-300 z-[101] origin-left shadow-[0_0_10px_rgba(167,243,208,0.8)] pointer-events-none"
        style={{ scaleX }}
      />

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
            whileTap={{ scale: 0.92, rotate: -1 }}
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
              whileTap={{ scale: 0.92, rotate: -1 }}
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black hover:border-white shadow-sm"
            >
              Resume <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.a>
          </div>

          {/* Mobile Toggle Button with Haptic Tap */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: -2 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-white md:hidden p-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md active:bg-white/10 shadow-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Animated Menu — Staggered Glass Reveal */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="border-b border-white/10 bg-[#030303]/98 backdrop-blur-3xl md:hidden overflow-hidden shadow-2xl"
            >
              <motion.div className="section-wrap flex flex-col gap-2 py-6">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={menuItemVariants}
                    whileTap={{ scale: 0.96, x: 4 }}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`p-4 rounded-xl text-sm font-bold uppercase tracking-[0.12em] transition-all flex items-center justify-between ${
                      activeSection === link.href.substring(1)
                        ? "bg-white text-black shadow-lg"
                        : "text-white/70 hover:bg-white/10 hover:text-white border border-transparent"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  variants={menuItemVariants}
                  whileTap={{ scale: 0.94, rotate: -1 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold uppercase text-black shadow-lg"
                >
                  View resume <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

