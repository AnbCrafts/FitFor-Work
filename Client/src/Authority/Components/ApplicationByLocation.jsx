import React from 'react';
import { Bar } from 'react-chartjs-2';

const ApplicationsByLocation = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.location),
    datasets: [{
      label: 'Applications',
      data: data.map(item => item.count),
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        grid: { color: '#444' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: '#444' },
      },
    },
    plugins: {
      legend: { labels: { color: '#fff' } },
    },
  };

  return (
    <div className="bg-white/10 text-white p-4 rounded-xl border border-white/20" style={{ height: '250px' }}>
      <h3 className="text-lg font-semibold mb-4 text-center">Applications by Location</h3>
      <div className="w-full h-[180px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ApplicationsByLocation;
