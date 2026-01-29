import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

/* ✅ Register once */
ChartJS.register(ArcElement, Tooltip, Legend);

/* ============================================================
   THEME COLORS (TradeMint Palette)
============================================================ */

const chartColors = [
  "rgba(56, 189, 248, 0.85)",  // accent blue
  "rgba(34, 197, 94, 0.85)",   // profit green
  "rgba(239, 68, 68, 0.85)",   // loss red
  "rgba(168, 85, 247, 0.85)",  // purple
  "rgba(245, 158, 11, 0.85)",  // amber
  "rgba(148, 163, 184, 0.75)", // muted gray
];

/* ============================================================
   PREMIUM DASHBOARD OPTIONS
============================================================ */

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "82%",

  plugins: {
    legend: {
      display: false, // ✅ REMOVE ugly legend
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#fff",
      bodyColor: "#cbd5e1",
      borderColor: "#1e293b",
      borderWidth: 1,
    },
  },

  elements: {
    arc: {
      borderRadius: 12,
    },
  },
};


/* ============================================================
   COMPONENT
============================================================ */

export function DoughnutChart({ data }) {
  const themedData = {
    ...data,
    datasets: data.datasets.map((ds) => ({
      ...ds,
      backgroundColor: chartColors,
      borderColor: "#0f172a",
      borderWidth: 2,
    })),
  };

  return <Doughnut data={themedData} options={options} />;
}
