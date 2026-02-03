import React, { useMemo } from "react";
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

/* ✅ Register Chart.js modules */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/* ============================================================
   ✅ VerticalGraph (TradeMint Themed)
============================================================ */

export function VerticalGraph({ data }) {
  /* ✅ Read theme variables from CSS */
  const styles = getComputedStyle(document.documentElement);

  const brand = styles.getPropertyValue("--brand") || "#7c3aed";
  const muted = styles.getPropertyValue("--muted") || "#94a3b8";
  const text = styles.getPropertyValue("--text") || "#f8fafc";
  const border = styles.getPropertyValue("--border") || "rgba(255,255,255,0.12)";

  /* ✅ Chart Options (Theme Aware) */
  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "top",
          labels: {
            color: muted.trim(),
            font: { weight: "600" },
          },
        },

        title: {
          display: false,
          text: "Holdings Performance",
          color: text.trim(),
          font: {
            size: 15,
            weight: "800",
          },
          padding: { bottom: 14 },
        },

       
        tooltip: {
  callbacks: {
    label: function (ctx) {
      return "₹" + ctx.raw.toLocaleString("en-IN");
    },
  },
},

      },

      scales: {
        x: {
          ticks: {
            color: muted.trim(),
            font: { weight: "600" },
          },
          grid: { display: false },
        },

        y: {
          ticks: {
            color: muted.trim(),
          },
          grid: {
            color: border.trim(),
          },
        },
      },
    };
  }, [brand, muted, text, border]);

  /* ✅ Themed Dataset */
  const themedData = {
    ...data,
    datasets: data.datasets.map((ds) => ({
      ...ds,
      backgroundColor: `rgba(124, 58, 237, 0.65)`, // ✅ Purple Brand
      borderRadius: 8,
    })),
  };

  return <Bar options={options} data={themedData} />;
}
