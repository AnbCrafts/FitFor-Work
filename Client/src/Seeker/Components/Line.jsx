import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

const ApplicationsLineChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          label: 'Applications',
          data: data.map(item => item.count),
          borderColor: 'rgba(255, 99, 132, 1)', // red line
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
    },
  };

  return (
    <div className="p-4 rounded-xl bg-white/10 text-white border border-white/20 min-h-[300px]">
      <h3 className="text-lg font-semibold mb-4 text-center">Applications Over Time</h3>
      {chartData ? (
        <div className="w-full h-[250px]">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-300">No data available to display.</p>
      )}
    </div>
  );
};

export default ApplicationsLineChart;
