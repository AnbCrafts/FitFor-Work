import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const cardStyle =
  "bg-white/10 border border-white/20 rounded-xl p-4 text-white shadow min-w-[300px] w-full md:w-[32%]";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#fff" },
    },
  },
  scales: {
    x: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
    y: {
      ticks: { color: "#fff" },
      grid: { color: "rgba(255,255,255,0.1)" },
      beginAtZero: true,
    },
  },
};

// Graph 1: Applications per Job (Bar)
const barData = {
  labels: ["UI Designer", "Backend Dev", "Fullstack Dev", "QA Engineer"],
  datasets: [
    {
      label: "Applications",
      data: [12, 20, 9, 15],
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
};

// Graph 2: Weekly Applications (Line)
const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Applications",
      data: [4, 7, 3, 6, 9, 5, 2],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.3)",
      tension: 0.4,
      fill: true,
    },
  ],
};

// Graph 3: Applicant Status (Pie)
const pieData = {
  labels: ["Viewed", "Shortlisted", "Rejected", "Offered"],
  datasets: [
    {
      data: [10, 5, 3, 2],
      backgroundColor: [
        "#3b82f6",
        "#22c55e",
        "#ef4444",
        "#eab308",
      ],
      borderColor: "#000",
      borderWidth: 1,
    },
  ],
};

const AuthorityGraphs = () => {
  return (
    <div className="w-[90%] mx-auto mt-10 flex flex-wrap gap-6 justify-between">
      {/* Bar */}
      <div className={cardStyle}>
        <h3 className="text-lg font-semibold mb-2 text-center">Applications Per Job</h3>
        <div className="h-[250px]">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* Line */}
      <div className={cardStyle}>
        <h3 className="text-lg font-semibold mb-2 text-center">Weekly Application Trend</h3>
        <div className="h-[250px]">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      {/* Pie */}
      <div className={cardStyle}>
        <h3 className="text-lg font-semibold mb-2 text-center">Applicant Status Breakdown</h3>
        <div className="h-[250px]">
          <Pie data={pieData} options={{ ...chartOptions, scales: {} }} />
        </div>
      </div>
    </div>
  );
};

export default AuthorityGraphs;
