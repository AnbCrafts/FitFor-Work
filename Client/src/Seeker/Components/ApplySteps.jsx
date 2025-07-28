import React from 'react';
import { FaUserPlus, FaFileAlt, FaSearch, FaPaperPlane, FaBriefcase } from 'react-icons/fa';

const steps = [
  { icon: <FaUserPlus />, title: 'Register', desc: 'Sign up with basic details.' },
  { icon: <FaFileAlt />, title: 'Create Profile', desc: 'Build your professional profile or resume.' },
  { icon: <FaSearch />, title: 'Search Jobs', desc: 'Find jobs that match your skills and interest.' },
  { icon: <FaPaperPlane />, title: 'Apply for Jobs', desc: 'Send applications in one click.' },
  { icon: <FaBriefcase />, title: 'Get the Job', desc: 'Attend interviews and get hired!' }
];

const ApplySteps = () => {
  return (
    <div className="mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-600 border-b border-r border-pink-500 px-2 py-3">Steps to Apply for a Job</h2>
      <div className="flex items-center justify-start flex-col gap-5">
        {steps.map((step, index) => (
          <div key={index} className="w-[250px] bg-[#000] border border-pink-300 shadow-md relative rounded-2xl p-5 text-center hover:shadow-xl transition">
            <span className='bg-gray-700 rounded-full  absolute left-0 top-0 px-3 m-2 py-0.5 text-3xl'>{index+1}</span>
            <div className="text-3xl text-purple-500 mb-3 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.desc}</p>
                       

          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplySteps;
