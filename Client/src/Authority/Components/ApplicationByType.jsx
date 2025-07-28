import React from 'react';
import { Pie } from 'react-chartjs-2';

const ApplicationsByJobType = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.type),
    datasets: [{
      label: 'Applications',
      data: data.map(item => item.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6EE7B7', '#C084FC'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#fff' } },
    },
  };

  return (
    <div className="bg-white/10 text-white p-4 rounded-xl border border-white/20" style={{ height: '250px' }}>
      <h3 className="text-lg font-semibold mb-4 text-center">Applications by Job Type</h3>
      <div className="w-full h-[180px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ApplicationsByJobType;
