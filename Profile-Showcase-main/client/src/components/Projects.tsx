import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

      // Estimate active index
      const cardWidth = 420; // approximate width of project card
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1));
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => scrollEl.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="section-rule py-28 relative overflow-hidden">
      <div className="section-wrap relative z-10">
        {/* Header with Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="section-kicker mb-5">03 / Selected work</p>
            <h2 className="text-5xl font-bold sm:text-6xl tracking-tight text-white">
              Featured<br />Projects.
            </h2>
          </div>
          
          <div className="flex flex-col sm:items-end gap-4">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A curated collection of full-stack platforms, machine learning systems, and data analytics engines.
            </p>
            
            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono text-white/50 mr-2">
                0{activeIndex + 1} / 0{projects.length}
              </span>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll projects left"
                className={`p-3 rounded-full border transition-all duration-300 ${
                  canScrollLeft
                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary active:scale-95"
                    : "border-white/5 bg-white/2 text-white/20 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll projects right"
                className={`p-3 rounded-full border transition-all duration-300 ${
                  canScrollRight
                    ? "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary active:scale-95"
                    : "border-white/5 bg-white/2 text-white/20 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            const parts = project.title.split(" — ");
            const mainTitle = parts[0];
            const subTitle = parts.length > 1 ? parts[1] : null;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative flex-none snap-start overflow-hidden rounded-2xl border transition-all duration-500 flex flex-col justify-between p-8 sm:p-10 ${
                  isFeatured
                    ? "w-[90vw] sm:w-[580px] md:w-[640px] bg-gradient-to-br from-primary/10 via-white/[0.04] to-white/[0.02] border-primary/40 shadow-2xl shadow-primary/10"
                    : "w-[85vw] sm:w-[440px] md:w-[480px] bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                }`}
              >
                {/* Background glow for featured */}
                {isFeatured && (
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                )}

                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-start justify-between gap-4 relative z-10 mb-8">
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs font-bold text-primary/80">0{index + 1}</span>
                      {isFeatured && (
                        <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 backdrop-blur-md px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-primary">
                          <Sparkles className="h-3 w-3 animate-pulse" /> Featured Project
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="mono rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-3.5 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-white/80">
                        {project.period}
                      </span>
                      <span className="rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="relative z-10 mb-6">
                    <h3 className={`font-extrabold tracking-tight text-white transition-colors group-hover:text-primary ${
                      isFeatured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
                    }`}>
                      {mainTitle}
                    </h3>
                    {subTitle && (
                      <p className={`font-medium text-white/70 ${
                        isFeatured ? "text-base sm:text-lg mt-2" : "text-sm sm:text-base mt-1"
                      }`}>
                        {subTitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8 relative z-10 line-clamp-6">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech & Links */}
                <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-xs text-white/70 shadow-sm transition-colors group-hover:border-primary/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-xs font-bold text-white transition-colors hover:text-primary group/link"
                    >
                      <Github className="h-4 w-4" /> Code{" "}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-xs font-bold text-white transition-colors hover:text-primary group/link"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo{" "}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

