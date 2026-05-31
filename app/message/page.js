const experiences = [
  {
    date: "2026年2月 - 至今",
    title: "前端工程师",
    subtitle: "✈️ 说走就走!!!",
    description:
      "要去做前端工程师，前端是一个充满挑战和乐趣的领域，我希望能在这个领域中不断学习和成长。",
    align: "left",
  },
  {
    date: "2023年9月 - 2027年6月",
    title: "本科在读",
    subtitle: "🏫 陕西科技大学",
    description:
      "数据科学与大数据技术专业。在校期间学习了 web 前端基础、数据结构等课程。",
    align: "right",
  },
];

export default function MessagePage() {
  return (
    <section className="page w-full -mt-8">
      <div className="hero mb-5 flex flex-wrap items-end justify-between gap-4 text-center pt-2">
        <div className="mx-auto">
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-sky-900 dark:text-white sm:text-4xl">
            我的经历
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-sky-700/80 dark:text-white/80">
            记录我的学习和职业发展历程
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl pb-8">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/80" />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((experience) => (
            <article
              key={experience.date + experience.title}
              className="relative grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-start"
            >
              <div
                tabIndex={0}
                className={`experience-card rounded-2xl border border-border/60 bg-background/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:max-w-md transform transition-transform duration-200 hover:-translate-y-2 hover:shadow-xl focus:-translate-y-2 focus:shadow-xl focus:outline-none ${
                  experience.align === "left"
                    ? "sm:col-start-1 sm:justify-self-end"
                    : "sm:col-start-3 sm:justify-self-start"
                }`}
              >
                <div className="mb-3 text-xs italic text-muted-foreground">📅 {experience.date}</div>
                <h2 className="text-xl font-semibold">{experience.title}</h2>
                <p className="mt-2 text-sm font-medium text-foreground/85">{experience.subtitle}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{experience.description}</p>
              </div>

              <div
                role="button"
                tabIndex={0}
                className={`absolute left-1/2 hidden -translate-x-1/2 sm:block pointer-events-auto cursor-pointer ${
                  experience.align === "right" ? "top-2" : "top-5"
                }`}
              >
                <span className="block h-3 w-3 rounded-full border-4 border-background bg-sky-400 shadow-[0_0_0_8px_rgba(125,211,252,0.18)] hover:animate-pulse focus:animate-pulse" />
              </div>

              <div
                className={`hidden sm:block ${
                  experience.align === "left" ? "sm:col-start-3" : "sm:col-start-1"
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
