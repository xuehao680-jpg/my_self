import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    id: 1,
    title: "AI 对话平台",
    category: "Web App",
    desc: "基于大语言模型的智能对话界面，支持多轮上下文理解与实时流式输出。",
    tags: ["React", "Node.js", "AI"],
    color: "#e85d3a",
    aspect: "md:col-span-2 md:row-span-1",
  },
  {
    id: 2,
    title: "城市出行助手",
    category: "移动端",
    desc: "实时公交导航与智能推荐系统，覆盖全国 50+ 城市的出行解决方案。",
    tags: ["React Native", "Maps", "ML"],
    color: "#d4a373",
    aspect: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "创意设计系统",
    category: "Design System",
    desc: "企业级组件库与设计规范，支持多主题与无障碍访问。",
    tags: ["Figma", "Storybook", "CSS"],
    color: "#2b2b2b",
    aspect: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "数据可视化平台",
    category: "Dashboard",
    desc: "实时数据看板，支持拖拽布局、自定义图表与一键导出报告。",
    tags: ["D3.js", "WebSocket", "SQL"],
    color: "#e85d3a",
    aspect: "md:col-span-2 md:row-span-1",
  },
];

function ProjectCard({ project, index }) {
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
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
          });
        },
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`project-card ${project.aspect} rounded-none bg-ink text-paper min-h-[280px] md:min-h-[320px]`}
      style={{ y: 40, autoAlpha: 0 }}
    >
      {/* Color block */}
      <div
        className="absolute inset-0 transition-all duration-700 group-hover:scale-[1.02]"
        style={{ backgroundColor: project.color }}
      >
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-paper/40">
            {`0${index + 1}`}
          </span>
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-paper/40">
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="font-display text-2xl md:text-3xl font-medium text-paper mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-paper/50 text-sm leading-relaxed max-w-sm mb-4">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[9px] font-medium tracking-wider uppercase border border-paper/10 text-paper/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const headingRef = useRef(null);
  const accentLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the huge section number
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
    }, null);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-paper py-24 md:py-32 px-6"
      data-reveal
    >
      <div className="max-w-content mx-auto">
        {/* Section number (decorative) */}
        <div
          ref={numberRef}
          className="section-number absolute top-12 right-6 md:right-10"
        >
          02
        </div>

        {/* Header — editorial style */}
        <div className="mb-16 md:mb-20 max-w-xl">
          <span
            data-reveal-item
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone/50"
          >
            Selected Projects
          </span>
          <h2
            ref={headingRef}
            data-reveal-heading
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink mt-4 leading-[1.1]"
          >
            精选作品
          </h2>
          <div
            ref={accentLineRef}
            data-reveal-line
            className="accent-line mt-6"
          />
          <p
            data-reveal-item
            className="text-sm md:text-base text-stone/70 leading-relaxed max-w-md mt-6 font-light"
          >
           每个项目都是一次探索，从概念到落地的完整旅程。
          </p>
        </div>

        {/* Project grid — asymmetrical */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all link */}
        <div
          data-reveal-item
          className="mt-12 flex justify-end"
        >
          <button className="group inline-flex items-center gap-3 text-xs font-medium tracking-[0.15em] uppercase text-ink/50 hover:text-rust transition-colors duration-300">
            查看全部作品
            <span className="block w-8 h-[1px] bg-ink/20 group-hover:bg-rust group-hover:w-12 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
