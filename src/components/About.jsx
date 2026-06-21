import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SKILLS = [
  { name: "React / Next.js", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Design Systems", level: 90 },
  { name: "Animation", level: 85 },
  { name: "Figma", level: 90 },
  { name: "Node.js", level: 82 },
];

export default function About() {
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section number parallax
      gsap.to(numberRef.current, {
        y: () => window.innerHeight * 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Skills bar animation — animate fill from 0 to target width
      const bars = skillsRef.current?.querySelectorAll(".skill-bar-fill");
      if (bars?.length) {
        ScrollTrigger.create({
          trigger: skillsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(bars, {
              scaleX: 1,
              duration: 1.2,
              stagger: 0.08,
            ease: "power3.out",
            transformOrigin: "left center",
          });
        },
      });
    }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-ink text-paper py-24 md:py-32 px-6 overflow-hidden"
      data-reveal
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-content mx-auto relative z-10">
        {/* Decorative section number */}
        <div
          ref={numberRef}
          className="section-number absolute top-12 right-6 md:right-10"
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.04)" }}
        >
          03
        </div>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Statement */}
          <div className="md:col-span-6 lg:col-span-5">
            <span
              data-reveal-item
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-paper/30"
            >
              About
            </span>
            <h2
              data-reveal-heading
              className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-paper mt-4 leading-[1.15]"
            >
              用代码
              <br />
              <span className="italic text-rust">塑造体验</span>
            </h2>
            <div
              data-reveal-line
              className="bg-rust w-12 h-[2px] mt-8"
            />
          </div>

          {/* Right: Bio + Skills */}
          <div className="md:col-span-6 lg:col-span-6 md:col-start-7">
            <div data-reveal-item>
              <p className="text-base md:text-lg text-paper/60 leading-relaxed font-light mb-8">
                我是 Alex，一名专注于前端设计与开发的创作者。
                <br />
                我相信好的产品体验源于设计直觉与工程理性的交汇点。
              </p>
            </div>

            {/* Stats row */}
            <div
              data-reveal-item
              className="grid grid-cols-3 gap-6 mb-12 py-8 border-y border-paper/5"
            >
              {[
                { value: "5+", label: "年经验" },
                { value: "20+", label: "完成项目" },
                { value: "12+", label: "合作客户" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl md:text-3xl text-paper">
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-paper/30 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="space-y-4" data-reveal-item>
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-paper/60 tracking-wide">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-paper/30">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-[2px] bg-paper/5">
                    <div
                      className="skill-bar-fill h-full bg-rust"
                      style={{
                        width: `${skill.level}%`,
                        scaleX: 0,
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
