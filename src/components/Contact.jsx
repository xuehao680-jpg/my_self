import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-paper py-24 md:py-40 px-6 overflow-hidden"
      data-reveal
    >
      {/* Section number */}
      <div
        ref={numberRef}
        className="section-number absolute top-12 right-6 md:right-10"
        style={{ WebkitTextStroke: "1.5px rgba(10,10,10,0.04)" }}
      >
        04
      </div>

      <div className="max-w-content mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span
            data-reveal-item
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone/50"
          >
            Get in Touch
          </span>
          <h2
            data-reveal-heading
            className="font-display text-4xl md:text-5xl lg:text-7xl font-medium text-ink mt-4 leading-[1.05]"
          >
            一起聊聊
            <br />
            下一个项目
          </h2>
          <div data-reveal-line className="accent-line mt-8" />
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ContactCard
            label="Email"
            value="alex@example.com"
            href="mailto:alex@example.com"
            delay={0}
          />
          <ContactCard
            label="Social"
            value="GitHub / Twitter"
            href="#"
            delay={0.1}
          />
          <ContactCard
            label="Location"
            value="Chengdu, China"
            delay={0.2}
          />
          <ContactCard
            label="Status"
            value="开放合作中"
            dot="bg-green-500"
            delay={0.3}
          />
        </div>

        {/* Bottom bar */}
        <div
          data-reveal-item
          className="mt-20 md:mt-32 pt-8 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-ink flex items-center justify-center">
              <span className="text-paper text-[8px] font-semibold">A</span>
            </div>
            <span className="text-stone/40 text-xs font-light">
              &copy; 2026 Alex Chen
            </span>
          </div>
          <div className="flex items-center gap-6 text-stone/30 text-[10px] font-medium tracking-wider uppercase">
            <span className="hover:text-stone/60 transition-colors cursor-default">
              隐私政策
            </span>
            <span className="hover:text-stone/60 transition-colors cursor-default">
              使用条款
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ label, value, href, delay = 0, dot }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(cardRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay,
            ease: "power3.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, [delay]);

  const content = (
    <>
      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone/40">
        {label}
      </span>
      <div className="flex items-center gap-2 mt-2">
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
        <span className="text-base md:text-lg font-medium text-ink/80">
          {value}
        </span>
      </div>
    </>
  );

  return (
    <div
      ref={cardRef}
      className="border border-ink/5 p-6 md:p-8 hover:border-rust/20 hover:bg-rust-light transition-all duration-500 cursor-default"
      style={{ y: 24, autoAlpha: 0 }}
    >
      {href ? (
        <a href={href} className="block group">
          {content}
          <div className="mt-4 flex items-center gap-2 text-[10px] font-medium tracking-wider uppercase text-rust/50 group-hover:text-rust transition-colors">
            联系 →
          </div>
        </a>
      ) : (
        content
      )}
    </div>
  );
}
