import React from 'react';
import { FaSearch, FaUserTie, FaCheckCircle, FaMoneyBillWave, FaFilter } from 'react-icons/fa';

const Bottom = () => {
  const benefits = [
    {
      icon: <FaSearch className="text-3xl text-purple-500" />,
      title: "Advanced Job Search",
      desc: "Easily find jobs by location, skills, salary range, and experience.",
    },
    {
      icon: <FaUserTie className="text-3xl text-blue-500" />,
      title: "Verified Listings",
      desc: "We ensure job listings are legitimate, verified, and updated.",
    },
    {
      icon: <FaCheckCircle className="text-3xl text-green-500" />,
      title: "Easy Application Process",
      desc: "Apply to jobs in just a few clicks with a pre-built profile.",
    },
    {
      icon: <FaMoneyBillWave className="text-3xl text-yellow-500" />,
      title: "Salary Transparency",
      desc: "Know your worth—view expected salary for each job listing.",
    },
    {
      icon: <FaFilter className="text-3xl text-pink-500" />,
      title: "Powerful Filters",
      desc: "Narrow down results by work mode, industry, education & more.",
    },
  ];

  return (
    <div className="py-10 px-4 border-l border-t border-pink-500 mt-15">
      <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">Why Use Our Job Platform?</h2>
      <div className="w-full mx-auto flex items-center justify-center gap-10  flex-wrap">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className=" p-6 shadow-md shadow-pink-900  border-b border-r hover:shadow-none border-pink-500 hover:border-t hover:border-l hover:border-b-0 hover:border-r-0 transition duration-300"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bottom;
