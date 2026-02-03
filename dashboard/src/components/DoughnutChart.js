import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  /* ✅ Stable Colors */
  const chartColors = [
  "rgba(124, 58, 237, 0.85)", // Purple
  "rgba(34, 197, 94, 0.80)",  // Green
  "rgba(239, 68, 68, 0.78)",  // Red
  "rgba(59, 130, 246, 0.80)", // Blue
  "rgba(245, 158, 11, 0.80)", // Amber
  "rgba(14, 165, 233, 0.75)", // Cyan
  "rgba(236, 72, 153, 0.75)", // Pink
  "rgba(148, 163, 184, 0.70)" // Gray
];


  /* ✅ Memoized Options */
  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "78%",

      plugins: {
        legend: { display: false },
        tooltip: { padding: 10 },
      },

      elements: {
        arc: {
          borderRadius: 12,
          borderWidth: 2,
        },
      },
    };
  }, []);

  /* ✅ Memoized Dataset (prevents shrinking bug) */
  const themedData = useMemo(() => {
    return {
      ...data,
      datasets: data.datasets.map((ds) => ({
        ...ds,
        backgroundColor: chartColors,
        borderColor: "rgba(255,255,255,0.12)",
      })),
    };
  }, [data]);


 return <Doughnut data={themedData} options={options} />;

}
