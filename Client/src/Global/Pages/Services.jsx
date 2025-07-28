import React from 'react';
import { Briefcase, Search, ShieldCheck, UserCheck, SlidersHorizontal, FileText } from 'lucide-react';
 
const services = [
  {
    title: "Smart Job Matching",
    icon: <Search className="text-pink-500 w-10 h-10" />,
    description: "Our AI analyzes your profile and suggests jobs tailored to your experience and skills."
  },
  {
    title: "Resume Analysis",
    icon: <FileText className="text-indigo-400 w-10 h-10" />,
    description: "Upload your resume and get instant insights & suggestions for improvement."
  },
  {
    title: "Verified Companies",
    icon: <ShieldCheck className="text-green-400 w-10 h-10" />,
    description: "All companies are verified to ensure safe and secure hiring."
  },
  {
    title: "One-Click Apply",
    icon: <UserCheck className="text-yellow-400 w-10 h-10" />,
    description: "Apply to multiple jobs with a single click. No more form filling again and again."
  },
  {
    title: "Role-Based Dashboards",
    icon: <SlidersHorizontal className="text-purple-400 w-10 h-10" />,
    description: "Separate, user-friendly dashboards for job seekers, recruiters, and admins."
  },
  {
    title: "Live Application Tracking",
    icon: <Briefcase className="text-cyan-400 w-10 h-10" />,
    description: "Track your job application status in real time and get notified about updates."
  }
];

const Services = () => {
  return (
    <div className="min-h-screen px-6 py-12 text-white w-[90%] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500">
        Our <span className="text-white">Services</span>
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="p-6 rounded-2xl border border-[red] hover:shadow-lg hover:shadow-pink-500/30 transition-all bg-[#1a1a40] text-center">
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-pink-400">{service.title}</h3>
            <p className="text-gray-300 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
