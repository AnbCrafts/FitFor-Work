import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ApplicantStatusPie = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: ['#4ade80', '#f97316', '#60a5fa', '#f43f5e'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="bg-white/10 text-white p-4 rounded-xl border border-white/20 min-h-[300px] max-h-[350px]">
      <h3 className="text-lg font-semibold mb-4 text-center">Applicant Status</h3>
      <div className="w-full h-[220px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ApplicantStatusPie;
