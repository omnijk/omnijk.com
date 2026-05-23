"use client";

import { useEffect, useRef } from "react";

const iconGlyphMap = {
  html: "\ue632",
  css: "\ue61e",
  javascript: "\ue704",
  typescript: "\ue6e5",
  es6: "\ue7ac",
  react: "\ue799",
  nodejs: "\ue7a4",
  antd: "\ue677",
  scss: "\ue501",
  tailwindcss: "\uea15",
  vite: "\ue66b",
  babel: "\ue69d",
  pnpm: "\ue50c",
  git: "\ue61b",
  npm_yarn_pnpm: "\ue627",
};

const chartsConfig = [
  {
    chartId: "chart-language",
    theme: {
      line: "rgba(56,189,248,.95)",
      fill: "rgba(56,189,248,.26)",
    },
    markers: [
      { name: "HTML", icon: "html", accent: "#fb923c" },
      { name: "CSS", icon: "css", accent: "#38bdf8" },
      { name: "JavaScript", icon: "javascript", accent: "#facc15" },
      { name: "TypeScript", icon: "typescript", accent: "#60a5fa" },
      { name: "ES6", icon: "es6", accent: "#a78bfa" },
    ],
    indicators: [
      { name: "HTML", max: 100 },
      { name: "CSS", max: 100 },
      { name: "JavaScript", max: 100 },
      { name: "TypeScript", max: 100 },
      { name: "ES6", max: 100 },
    ],
    values: [96, 91, 94, 85, 92],
    title: "语言基础",
  },
  {
    chartId: "chart-framework",
    theme: {
      line: "rgba(34,197,94,.92)",
      fill: "rgba(34,197,94,.22)",
    },
    markers: [
      { name: "React", icon: "react", accent: "#22d3ee" },
      { name: "Node.js", icon: "nodejs", accent: "#4ade80" },
      { name: "Ant Design", icon: "antd", accent: "#818cf8" },
      { name: "Tailwind CSS", icon: "tailwindcss", accent: "#38bdf8" },
      { name: "SCSS", icon: "scss", accent: "#fb7185" },
    ],
    indicators: [
      { name: "React", max: 100 },
      { name: "Node.js", max: 100 },
      { name: "Ant Design", max: 100 },
      { name: "Tailwind CSS", max: 100 },
      { name: "SCSS", max: 100 },
    ],
    values: [95, 82, 88, 90, 84],
    title: "框架与 UI 生态",
  },
  {
    chartId: "chart-tooling",
    theme: {
      line: "rgba(251,191,36,.95)",
      fill: "rgba(251,191,36,.22)",
    },
    markers: [
      { name: "Vite", icon: "vite", accent: "#fde047" },
      { name: "Babel", icon: "babel", accent: "#f97316" },
      { name: "pnpm", icon: "pnpm", accent: "#a78bfa" },
      { name: "Git", icon: "git", accent: "#f87171" },
      { name: "npm", icon: "npm_yarn_pnpm", accent: "#60a5fa" },
    ],
    indicators: [
      { name: "Vite", max: 100 },
      { name: "Babel", max: 100 },
      { name: "pnpm", max: 100 },
      { name: "Git", max: 100 },
      { name: "npm", max: 100 },
    ],
    values: [92, 86, 90, 88, 84],
    title: "工程化与工具链",
  },
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
      radius: "64%",
      splitNumber: 5,
      name: { show: false },
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
        hoverAnimation: false,
        silent: true,
        lineStyle: { width: 2.5 },
        emphasis: { disabled: true },
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
    icon.className = "iconfont";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = iconGlyphMap[markerConfig.icon] || "";

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
    <div className="page w-full">
      <div className="hero mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-sky-200/70">
            Tech Stack
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-100 sm:text-4xl">
            个人技术栈
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300/80">
            语言基础、框架生态和工程化工具链。
          </p>
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
              className="chart relative z-[1] h-[380px] w-full transition-transform duration-200 ease-out md:h-[420px] xl:h-[440px]"
            />
            <div className="card-head relative z-[1] px-3 pt-2 text-center">
              <h2 className="card-title mt-3 text-[20px] font-semibold leading-tight text-slate-100">
                {config.title}
              </h2>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}