import React from 'react';
import { FaUserCheck, FaClipboardCheck, FaRocket, FaFilter, FaClock } from 'react-icons/fa';

const Bottom = () => {
  const benefits = [
    {
      icon: <FaUserCheck className="text-3xl text-blue-500" />,
      title: "Verified Candidates",
      desc: "Access a pool of verified, skill-assessed, and job-ready candidates.",
    },
    {
      icon: <FaClipboardCheck className="text-3xl text-green-500" />,
      title: "Simplified Hiring Process",
      desc: "Post jobs, screen applicants, and schedule interviews all in one place.",
    },
    {
      icon: <FaRocket className="text-3xl text-purple-500" />,
      title: "Boost Your Reach",
      desc: "Get your listings in front of thousands of active job seekers instantly.",
    },
    {
      icon: <FaFilter className="text-3xl text-pink-500" />,
      title: "Smart Filters",
      desc: "Filter applicants by skills, experience, education, and location.",
    },
    {
      icon: <FaClock className="text-3xl text-yellow-500" />,
      title: "Faster Recruitment",
      desc: "Hire qualified talent quickly with our optimized platform tools.",
    },
  ];

  return (
    <div className="py-10 px-4 border-l border-t border-blue-500 mt-15">
      <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">Why Hire Through Our Platform?</h2>
      <div className="w-full mx-auto flex items-center justify-center gap-10 flex-wrap">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="p-6 shadow-md shadow-blue-900 border-b border-r hover:shadow-none border-blue-500 hover:border-t hover:border-l hover:border-b-0 hover:border-r-0 transition duration-300"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bottom;
