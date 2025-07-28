import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

const LocationHorizontalBar = ({ data }) => {
  // Prepare chart data only when valid
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return {
      labels: data.map(item => item.location || 'Unknown'),
      datasets: [
        {
          label: 'Applications',
          data: data.map(item => item.count || 0),
          backgroundColor: 'rgba(139, 92, 246, 0.7)', // purple-500 with opacity
          borderColor: 'rgba(139, 92, 246, 1)',       // purple-500 solid
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
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
      <h3 className="text-lg font-semibold mb-4 text-center">
        Applications by Location
      </h3>

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

export default LocationHorizontalBar;
