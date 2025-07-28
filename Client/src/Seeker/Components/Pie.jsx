import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';

const ApplicationStatusPie = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || typeof data !== 'object') return null;

    const labels = Object.keys(data);
    const values = Object.values(data);

    return {
      labels,
      datasets: [
        {
          label: 'Application Status',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',   // Applied
            'rgba(54, 162, 235, 0.6)',   // Offered
            'rgba(255, 206, 86, 0.6)',   // Rejected
            'rgba(75, 192, 192, 0.6)',   // Viewed
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 rounded-xl bg-white/10 text-white border border-white/20 min-h-[300px]">
      <h3 className="text-lg font-semibold mb-4 text-center">Application Status</h3>
      {chartData ? (
        <div className="w-full h-[250px]">
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-300">No data available to display.</p>
      )}
    </div>
  );
};

export default ApplicationStatusPie;
