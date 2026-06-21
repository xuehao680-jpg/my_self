import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("[data-reveal]");
      sections.forEach((section) => {
        const heading = section.querySelector("[data-reveal-heading]");
        const items = section.querySelectorAll("[data-reveal-item]");
        const lines = section.querySelectorAll("[data-reveal-line]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (heading) {
          tl.fromTo(
            heading,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
          );
        }

        if (lines?.length) {
          tl.fromTo(
            lines,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power3.out" },
            "-=0.3"
          );
        }

        if (items?.length) {
          tl.fromTo(
            items,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          y: () => (1 - parseFloat(el.dataset.parallax)) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-paper">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </div>
  );
}
