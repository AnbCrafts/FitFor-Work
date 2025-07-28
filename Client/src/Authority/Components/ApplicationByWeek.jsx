import React from 'react';
import { Line } from 'react-chartjs-2';

const WeeklyApplications = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Applications',
      data: data.map(item => item.count),
      fill: false,
      borderColor: '#38bdf8',
      tension: 0.3,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: '#333' } },
      y: { beginAtZero: true, ticks: { color: '#fff' }, grid: { color: '#333' } },
    },
    plugins: {
      legend: { labels: { color: '#fff' } },
    },
  };

  return (
    <div className="bg-white/10 text-white p-4 rounded-xl border border-white/20" style={{ height: '250px' }}>
      <h3 className="text-lg font-semibold mb-4 text-center">Weekly Application Stats</h3>
      <div className="w-full h-[180px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WeeklyApplications;
