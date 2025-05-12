import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardSummary = () => {
  const revenueData = [
    { name: "Total Revenue", value: "$35,225.89", growth: "+21.1%" },
    { name: "Subscriptions", value: "6,350", growth: "+180.1%" },
    { name: "Sales", value: "16,385", growth: "+18%" },
    { name: "Active Now", value: "573", growth: "+201" },
  ];

  const barData = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    datasets: [
      {
        label: "Visitors",
        data: [139, 147, 198, 112, 61],
        backgroundColor: [
          "#60a5fa",
          "#facc15",
          "#34d399",
          "#fb7185",
          "#a78bfa",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["Apr 25", "May 10", "May 25", "Jun 10", "Jun 30"],
    datasets: [
      {
        label: "EU",
        data: [120, 150, 170, 160, 180],
        borderColor: "#3b82f6",
        fill: false,
      },
      {
        label: "Non-EU",
        data: [180, 200, 230, 240, 260],
        borderColor: "#10b981",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {revenueData.map((item) => (
          <div className="bg-white rounded-2xl shadow p-4" key={item.name}>
            <p className="text-sm text-gray-500">{item.name}</p>
            <p className="text-xl font-bold">{item.value}</p>
            <p className="text-green-600 text-sm flex items-center gap-1">
              <FiTrendingUp /> {item.growth} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Visitors by Browser</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Visitors EU vs Non-EU</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow md:col-span-2">
          <h3 className="font-semibold mb-2">Latest Order &gt; $5,000</h3>
          <p className="text-sm text-gray-500 mb-2">Date: 8 October, 2024</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p>Coaching x2 - $10,000.00</p>
              <p>Total (inc. tax): $11,000.00</p>
            </div>
            <div className="text-sm">
              <p><strong>Customer:</strong> Liam Johnson</p>
              <p><strong>Email:</strong> liam@acme.com</p>
              <p><strong>Phone:</strong> +9 432 567 890</p>
              <p><strong>Address:</strong> 1234 Main St., Anytown, CA 12345</p>
              <p><strong>Payment:</strong> Visa •••• 8765</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
