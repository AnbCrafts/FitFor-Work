import React from 'react';

const Vaccancy = ({ vacancies }) => {
  return (
    <div className="w-[400px] min-h-[300px] py-5 bg-[#1a1a40] rounded-xl p-5 text-white shadow-xl hover:shadow-[#00ffff55] transition-transform hover:scale-105">
      <div className="flex items-center gap-5 flex-col flex-wrap justify-between mb-4 border border-[#ff000063] py-5 rounded-lg">
        <h2 className="text-3xl font-semibold">{vacancies.icon} {vacancies.role}</h2>
        <span className="text-sm font-semibold px-3 py-1 bg-indigo-700 rounded-full">{vacancies.category}</span>
      </div>

      <div className='mt-4 py-5 px-2 border border-[#0000ff66] rounded-lg'>
        
      <p className="mb-2 ">🏢 <strong>Company:</strong> {vacancies.company}</p>
      <p className="mb-2">📄 <strong>Vacancies:</strong> {vacancies.vacancies}</p>
      <button className="mt-8 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white">
        View Details
      </button>
      </div>

    </div>
  );
};

export default Vaccancy;
