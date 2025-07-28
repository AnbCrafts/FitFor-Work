import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

const JobCategoryBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return null;

    const labels = data.map(item => item?.category || 'Unknown');
    const counts = data.map(item => item?.count || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Applications',
          data: counts,
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500 with opacity
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
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
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="p-4 rounded-xl bg-white/10 text-white border border-white/20 min-h-[300px]">
      <h3 className="text-lg font-semibold mb-4 text-center">Applications by Category</h3>
      {chartData ? (
        <div className="w-full h-[250px]">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-300">No data available to display.</p>
      )}
    </div>
  );
};

export default JobCategoryBarChart;
