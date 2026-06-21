import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_ITEMS = [
  { id: "hero", label: "首页" },
  { id: "work", label: "作品" },
  { id: "about", label: "关于" },
  { id: "contact", label: "联系" },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      gsap.to(bgRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(bgRef.current, {
        y: -4,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      {/* Background that fades in on scroll */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-paper opacity-0"
        style={{ transform: "translateY(-4px)" }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo("hero")}
            className="relative group"
          >
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-paper">
              Alex Chen
            </span>
            {/* Accent underline */}
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-rust transition-all duration-500 group-hover:w-full" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative text-[11px] font-medium tracking-[0.15em] uppercase text-paper/70 hover:text-paper transition-colors duration-300 py-1 group"
              >
                {item.label}
                <span className="absolute -bottom-px left-0 w-0 h-[1px] bg-rust transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-6 h-6 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1px] bg-paper transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1px] bg-paper transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1px] bg-paper transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-ink/5">
          <div className="px-6 py-6 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-3 text-sm font-medium tracking-wider text-ink/60 hover:text-ink transition-colors border-b border-ink/5"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
