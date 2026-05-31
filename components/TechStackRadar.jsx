"use client";

import { useEffect, useRef } from "react";

const iconGlyphMap = {
  html: "\ue632",
  css: "\ue61e",
  javascript: "\ue704",
  react: "\ue79a",
  nodejs: "\ue7a4",
  vue: "\ue799",
  mongodb: "\ue63a",
  nginx: "\ue56d",
  redis: "\ue788",
  vite: "\ue66b",
  docker: "\ue502",
  git: "\ue61b",
  ceshi: "\ue8ad",
  eslint: "",
};

function buildChartConfig({ chartId, title, theme, dimensions, radarDimensions }) {
  const radarSource = radarDimensions ?? dimensions;

  return {
    chartId,
    title,
    theme,
    markers: dimensions.map(({ name, icon, accent, shortLabel }) => ({
      name,
      icon,
      accent,
      shortLabel,
    })),
    indicators: radarSource.map(({ name }) => ({ name, max: 100 })),
    values: radarSource.map(({ score }) => score),
  };
}

const chartsConfig = [
  buildChartConfig({
    chartId: "chart-language",
    theme: {
      line: "rgba(56,189,248,.95)",
      fill: "rgba(56,189,248,.26)",
    },
    title: "前端技术",
    dimensions: [
      { name: "HTML", icon: "html", accent: "#fb923c", score: 80 },
      { name: "CSS", icon: "css", accent: "#38bdf8", score: 78 },
      { name: "JavaScript", icon: "javascript", accent: "#facc15", score: 76 },
      { name: "React", icon: "react", accent: "#22d3ee", score: 72 },
      { name: "Vue", icon: "vue", accent: "#4ade80", score: 20 },
    ],
    radarDimensions: [
      { name: "HTML", score: 80 },
      { name: "Vue", score: 20 },
      { name: "JavaScript", score: 76 },
      { name: "React", score: 72 },
      { name: "CSS", score: 78 },
    ],
  }),
  buildChartConfig({
    chartId: "chart-framework",
    theme: {
      line: "rgba(34,197,94,.92)",
      fill: "rgba(34,197,94,.22)",
    },
    title: "后端技术",
    dimensions: [
      { name: "Node.js", icon: "nodejs", accent: "#4ade80", score: 70 },
      { name: "Express", icon: "express", shortLabel: "EX", accent: "#a3e635", score: 20 },
      { name: "MongoDB", icon: "mongodb", accent: "#22c55e", score: 45 },
      { name: "Nginx", icon: "nginx", accent: "#f59e0b", score: 45 },
      { name: "Redis", icon: "redis", accent: "#ef4444", score: 20 },
    ],
  }),
  buildChartConfig({
    chartId: "chart-tooling",
    theme: {
      line: "rgba(251,191,36,.95)",
      fill: "rgba(251,191,36,.22)",
    },
    title: "工具技能",
    dimensions: [
      { name: "Git", icon: "git", accent: "#f87171", score: 75 },
      { name: "Vite", icon: "vite", accent: "#fde047", score: 20 },
      { name: "ESLint", icon: "eslint", shortLabel: "ES", accent: "#60a5fa", score: 20 },
      { name: "测试", icon: "ceshi", accent: "#c084fc", score: 75 },
      { name: "Docker", icon: "docker", accent: "#38bdf8", score: 75 },
    ],
  }),
];

function loadEcharts() {
  return import("echarts").then((module) => module.default ?? module);
}

function createOption(config, echarts) {
  return {
    backgroundColor: "transparent",
    radar: {
      shape: "circle",
      center: ["50%", "56%"],
      radius: "54%",
      splitNumber: 5,
      axisName: { show: false },
      indicator: config.indicators,
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(255,255,255,.015)", "rgba(255,255,255,.03)"],
        },
      },
      splitLine: {
        lineStyle: { color: "rgba(148,163,184,.14)", type: "dashed" },
      },
      axisLine: { lineStyle: { color: "rgba(148,163,184,.1)" } },
    },
    series: [
      {
        name: "当前水平",
        type: "radar",
        symbol: "circle",
        symbolSize: 6,
        silent: true,
        lineStyle: { width: 2.5 },
        emphasis: { disabled: true, scale: false },
        data: [
          {
            value: config.values,
            name: "当前水平",
            lineStyle: { color: config.theme.line },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: config.theme.fill },
                { offset: 1, color: "rgba(255,255,255,.03)" },
              ]),
            },
          },
        ],
      },
    ],
    animationDuration: 900,
  };
}

function clearMarkers(card) {
  card.querySelectorAll(".radar-marker").forEach((node) => node.remove());
}

function placeMarkers(chartEl, card, config) {
  clearMarkers(card);

  const chartRect = chartEl.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const count = config.markers.length;
  const baseX = chartRect.left - cardRect.left + chartRect.width * 0.5;
  const baseY = chartRect.top - cardRect.top + chartRect.height * 0.56;
  const radius = (Math.min(chartRect.width, chartRect.height) / 2) * 0.74;
  const outerOffset = 18;

  for (let index = 0; index < count; index += 1) {
    const markerConfig = config.markers[index];
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / count;
    const markerRadius = radius + outerOffset;
    const left = baseX + Math.cos(angle) * markerRadius;
    const top = baseY + Math.sin(angle) * markerRadius;

    const marker = document.createElement("div");
    marker.className = "radar-marker";
    marker.style.left = `${left + 2}px`;
    marker.style.top = `${top + 2}px`;
    const iconBox = document.createElement("div");
    iconBox.className = "icon-box";
    iconBox.style.color = markerConfig.accent || "#ffffff";

    const icon = document.createElement("i");
    icon.setAttribute("aria-hidden", "true");
    const glyph = iconGlyphMap[markerConfig.icon];
    if (glyph) {
      icon.className = "iconfont";
      icon.textContent = glyph;
    } else {
      icon.className = "icon-fallback";
      icon.textContent = markerConfig.shortLabel || markerConfig.name.slice(0, 2);
    }

    const label = document.createElement("div");
    label.className = "marker-label";
    label.textContent = markerConfig.name;

    iconBox.appendChild(icon);
    marker.appendChild(iconBox);
    marker.appendChild(label);

    card.appendChild(marker);
  }
}

export default function TechStackRadar() {
  const chartRefs = useRef([]);
  const brickRows = [
    ["HTML", "CSS","SCSS","Less", "Tailwind CSS", "JavaScript","TypeScript"],
    [ "React","React-Router","Redux","React Native","Node.js", "Express",],
    [ "MongoDB", "Nginx","Git", "Vite", "ESLint"],
  ];

  useEffect(() => {
    let disposed = false;
    let charts = [];
    let resizeTimer = null;
    let echartsInstance = null;

    const renderAll = () => {
      charts.forEach(({ chart, chartEl, card, config }) => {
        chart.setOption(createOption(config, echartsInstance), true);
        placeMarkers(chartEl, card, config);
      });
    };

    const mountCharts = async () => {
      const echarts = await loadEcharts();

      if (disposed || !echarts) {
        return;
      }

      echartsInstance = echarts;

      charts = chartsConfig
        .map((config, index) => {
          const chartEl = chartRefs.current[index];
          const card = chartEl?.closest(".chart-card");

          if (!chartEl || !card) {
            return null;
          }

          return {
            chartEl,
            card,
            config,
            chart: echarts.init(chartEl, null, {
              renderer: "canvas",
              useDirtyRect: false,
            }),
          };
        })
        .filter(Boolean);

      renderAll();
    };

    mountCharts();

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        charts.forEach(({ chart }) => {
          chart.resize();
        });
        renderAll();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      charts.forEach(({ chart, card }) => {
        chart.dispose();
        clearMarkers(card);
      });
      charts = [];
    };
  }, []);

  return (
    <div className="page w-full -mt-8">
      <div className="hero mb-5 flex flex-wrap items-end justify-between gap-4 text-center pt-2">
        <div className="mx-auto">
          {/* <p className="text-xs uppercase tracking-[0.45em] text-sky-700 dark:text-white">
            Tech Stack
          </p> */}
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-sky-900 dark:text-white sm:text-4xl">
            技术栈
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-sky-700/80 dark:text-white/80">
            掌握多种前端开发技术，持续学习和提升
          </p>
        </div>
      </div>

      <div className="mb-8 flex w-full justify-center">
        <div className="space-y-3">
          {brickRows.map((row, rowIndex) => (
            <div
              key={row.join("-")}
              className={`flex flex-wrap justify-center gap-3 ${rowIndex % 2 === 1 ? "translate-x-5" : ""}`}
            >
              {row.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-sky-100 bg-white px-5 py-2 text-sm font-semibold tracking-wide text-sky-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/90"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-5">
        {chartsConfig.map((config, index) => (
          <section
            key={config.chartId}
            className="chart-card relative overflow-visible"
          >
            <div
              ref={(node) => {
                chartRefs.current[index] = node;
              }}
              id={config.chartId}
              className="chart relative z-[1] h-[270px] w-full transition-transform duration-200 ease-out md:h-[310px] xl:h-[330px]"
            />
            <div className="card-head relative z-[1] px-3 pt-2 text-center">
              <h2 className="card-title mt-3 text-[20px] font-semibold leading-tight text-sky-800 dark:text-white">
                {config.title}
              </h2>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}