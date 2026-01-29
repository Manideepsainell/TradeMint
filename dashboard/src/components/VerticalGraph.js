import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

/* ✅ Register Chart.js components */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/* ============================================================
   PREMIUM DASHBOARD OPTIONS
============================================================ */

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#94a3b8",
        font: { weight: "600" },
      },
    },

    title: {
      display: true,
      text: "Holdings Performance",
      color: "#e2e8f0",
      font: {
        size: 15,
        weight: "800",
      },
      padding: { bottom: 14 },
    },

    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#ffffff",
      bodyColor: "#cbd5e1",
      borderColor: "#1e293b",
      borderWidth: 1,
      padding: 10,
    },
  },

  scales: {
    x: {
      ticks: {
        color: "#94a3b8",
        font: { weight: "600" },
      },
      grid: { display: false },
    },

    y: {
      ticks: {
        color: "#94a3b8",
      },
      grid: {
        color: "rgba(148, 163, 184, 0.08)",
      },
    },
  },
};

/* ============================================================
   COMPONENT
============================================================ */

export function VerticalGraph({ data }) {
  const themedData = {
    ...data,
    datasets: data.datasets.map((ds) => ({
      ...ds,
      backgroundColor: "rgba(56, 189, 248, 0.65)", // TradeMint Accent
      borderRadius: 8,
    })),
  };

  return <Bar options={options} data={themedData} />;
}
