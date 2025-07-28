import React, { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';

const ResumeScoreRadar = ({ data }) => {
  const chartData = useMemo(() => {
    if (
      !data ||
      typeof data !== 'object' ||
      !data.brief ||
      typeof data.brief !== 'object'
    ) return null;

    const labels = Object.keys(data.brief).map((key) =>
      key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
    );

    const values = Object.values(data.brief);

    return {
      labels,
      datasets: [
        {
          label: 'Profile Completion',
          data: values,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#4bc0c0',
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        pointLabels: {
          color: '#fff',
          font: { size: 14 },
        },
        ticks: {
          color: '#fff',
          backdropColor: 'transparent',
        },
        suggestedMin: 0,
        suggestedMax: 10,
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
      <h3 className="text-lg font-semibold mb-4 text-center">Resume Score Breakdown</h3>
      {chartData ? (
        <div className="w-full h-[250px]">
          <Radar data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-300">No data available to display.</p>
      )}
    </div>
  );
};

export default ResumeScoreRadar;
