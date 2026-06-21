import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const circleSmallRef = useRef(null);
  const lineRef = useRef(null);
  const metaRef = useRef(null);
  const heroLine1 = useRef(null);
  const heroLine2 = useRef(null);
  const heroLine3 = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Label
    tl.fromTo(
      labelRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );

    // Accent line
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, transformOrigin: "left center" },
      "-=0.4"
    );

    // Headline lines
    const headlineEls = [heroLine1.current, heroLine2.current, heroLine3.current].filter(Boolean);
    tl.to(
      headlineEls,
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
      "-=0.5"
    );

    // Meta
    if (metaRef.current) {
      tl.fromTo(
        metaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        "-=0.3"
      );
    }

    // Decorative circles
    tl.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );

    tl.fromTo(
      circleSmallRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // Floating animation
    gsap.to(circleRef.current, {
      y: -12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const scrollToWork = () => {
    document
      .getElementById("work")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-paper overflow-hidden px-6"
    >
      {/* Decorative circles */}
      <div
        ref={circleRef}
        className="accent-circle absolute right-[-10%] md:right-[5%] top-1/2 -translate-y-1/2"
        style={{
          width: "min(70vw, 600px)",
          height: "min(70vw, 600px)",
          opacity: 0,
          filter: "blur(60px)",
        }}
      />
      <div
        ref={circleSmallRef}
        className="accent-circle absolute right-[20%] bottom-[15%]"
        style={{
          width: "min(20vw, 180px)",
          height: "min(20vw, 180px)",
          opacity: 0,
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 w-full max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8 lg:col-span-7 pt-24 md:pt-32">
            {/* Label */}
            <div ref={labelRef} className="flex items-center gap-3 mb-8 md:mb-10" style={{ y: 40, opacity: 0 }}>
              <span className="w-8 h-[1.5px] bg-rust" />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone/70">
                设计与开发
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-display font-medium leading-[0.95] tracking-tight text-ink">
              <div ref={heroLine1} className="text-[clamp(3.2rem,10vw,7rem)]" style={{ y: 40, opacity: 0 }}>
                创造
              </div>
              <div ref={heroLine2} className="text-[clamp(2.8rem,9vw,6rem)] italic text-stone/40" style={{ y: 40, opacity: 0 }}>
                &amp; 表达
              </div>
              <div ref={heroLine3} className="text-[clamp(2rem,6vw,4.5rem)] mt-2 font-sans font-light tracking-wide" style={{ y: 40, opacity: 0 }}>
                数字作品集
              </div>
            </h1>

            {/* Accent line */}
            <div ref={lineRef} className="accent-line my-8 md:my-10" style={{ transformOrigin: "left", scaleX: 0 }} />

            {/* Meta row */}
            <div ref={metaRef}>
              <p className="text-sm md:text-base text-stone/80 leading-relaxed max-w-xs font-light" style={{ y: 20, opacity: 0 }}>
                将设计的敏锐与代码的精确结合，
                <br />在每一行像素中注入思考。
              </p>
              <button onClick={scrollToWork} className="mt-6 group inline-flex items-center gap-3 text-xs font-medium tracking-[0.15em] uppercase text-ink hover:text-rust transition-colors duration-300" style={{ y: 20, opacity: 0 }}>
                查看作品
                <span className="block w-8 h-[1px] bg-ink/30 group-hover:bg-rust group-hover:w-12 transition-all duration-300" />
              </button>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 lg:col-span-5" />
        </div>

        <div className="absolute bottom-8 md:bottom-12 right-6 md:right-10 flex items-center gap-3">
          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-stone/40">Scroll</span>
          <span className="block w-6 h-[1px] bg-stone/20" />
          <div className="w-[1px] h-8 bg-stone/20 overflow-hidden">
            <div className="w-full h-full bg-rust origin-top" style={{ animation: "scrollDown 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute top-12 right-10 text-[10px] font-medium tracking-[0.3em] text-stone/20">01 / 04</div>

      <style>{`
        @keyframes scrollDown {
          0%, 100% { transform: scaleY(0.3); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
