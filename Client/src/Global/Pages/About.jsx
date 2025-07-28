import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../Seeker/assets/assets';
 
const About = () => {
  return (
    <div className="min-h-screen px-6 py-12  text-[#0f0c29] w-[90%] mx-auto">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500">
          About FitFor <span className="text-white">Work</span>
        </h1>

        <div className=' flex items-start justify-between w-full h-auto border-b border-r border-[violet] p-5 rounded-2xl'>
        <div>
        <p className="text-lg leading-relaxed mb-8 text-gray-300">
          <strong>FitForWork</strong> is a modern AI-powered job-seeking platform where passionate individuals can connect with the right opportunities. Whether you're a fresh graduate or an experienced professional, our platform helps you discover the right job faster and smarter.
        </p>
        <Link className='py-3 px-12 text-lg text-white cursor-pointer hover:bg-[red] transition-all border border-[red]'>Explore Our Page</Link>
        </div>
        <div className='h-[400px] w-7xl'>
            <img src={assets.aboutImg} className='h-full w-[600px] object-cover' alt="" />
        </div>

        </div>

        <div className="  p-10 rounded-3xl  border-l border-[violet]">
  <h3 className="text-3xl font-bold mb-6  text-indigo-300">Our Journey</h3>
  <ul className="space-y-4 text-white">
    <li><span className="text-pink-400 text-lg">🎯 2025:</span> Launched FitForWork with a vision to simplify hiring.</li>
    <li><span className="text-pink-400 text-lg">🤖 2025 Q2:</span> Integrated OpenAI for smart job suggestions.</li>
    <li><span className="text-pink-400 text-lg">📈 2025 Q3:</span> Reached 5K active users & 1K+ jobs posted.</li>
    <li><span className="text-pink-400 text-lg">🌐 Future:</span> Expanding to global markets & remote-first hiring.</li>
  </ul>
</div>


       <div className='py-10 px-5 border-l border-[violet] rounded-2xl' >
       <h2 className="text-3xl font-semibold mb-4 text-indigo-400">🎯 Our Mission</h2>
        <p className="mb-8 text-lg text-gray-300">
          To bridge the gap between job seekers and employers using smart technology, making job hunting easier, personalized, and accessible to everyone.
        </p>
       </div>

        <div className='border-t border-r border-[violet] rounded-2xl py-10 px-5'>
        <h2 className="text-3xl font-semibold mb-4 text-pink-400">🚀 Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 text-md">
          <li>AI-powered job suggestions based on your resume & skills</li>
          <li>Dedicated dashboard for job seekers, employers, and admin</li>
          <li>Smart filtering of jobs by role, category, location, and experience</li>
          <li>Modern design with responsive UI and neon-inspired theme</li>
        </ul>
        </div>

        <div className='py-10 px-5 border-t border-l border-[violet] rounded-2xl'>
        <h2 className="text-3xl font-semibold mt-8 mb-4 text-indigo-400">🤝 Who We Help</h2>
        <p className="mb-8 text-gray-300">
          Our platform serves:
          <ul className="list-disc list-inside ml-6 mt-2">
            <li>🎓 Job Seekers looking for personalized opportunities</li>
            <li>🏢 Employers searching for ideal candidates</li>
            <li>🛡️ Admins to monitor and ensure smooth platform operations</li>
          </ul>
        </p>
        </div>

        
      </div>

      <div className="mt-16 bg-[#1a1a40] p-10 rounded-3xl shadow-md shadow-indigo-500/20">
  <h3 className="text-4xl font-bold mb-10 text-pink-400 text-center">Our Core Values</h3>
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
    <div className='p-5 rounded-2xl border border-[red]'>
      <p className="text-3xl">🔍</p>
      <p className="font-semibold mt-2 text-lg">Transparency</p>
      <p className="text-sm text-gray-400">Clear and honest communication in all interactions.</p>
    </div>
    <div className='p-5 rounded-2xl border border-[red]'>
      <p className="text-3xl">🤝</p>
      <p className="font-semibold mt-2 text-lg">Trust</p>
      <p className="text-sm text-gray-400">Fostering dependable relationships between users and companies.</p>
    </div>
    <div className='p-5 rounded-2xl border border-[red]'>
      <p className="text-3xl">🚀</p>
      <p className="font-semibold mt-2 text-lg">Innovation</p>
      <p className="text-sm text-gray-400">Harnessing AI and modern tech to simplify recruitment.</p>
    </div>
    <div className='p-5 rounded-2xl border border-[red]'>
      <p className="text-3xl">❤️</p>
      <p className="font-semibold mt-2 text-lg">User-First</p>
      <p className="text-sm text-gray-400">Creating a personalized experience for every user.</p>
    </div>
  </div>
</div>



<div className="mt-10 p-10 bg-[#0e0e2c] rounded-3xl shadow-md shadow-cyan-500/30">
  <h3 className="text-4xl font-bold text-center mb-6 text-cyan-300">Our Impact So Far</h3>
  <div className="grid sm:grid-cols-2 md:grid-cols-4 text-center gap-6 text-white">
    <div className='p-5 border border-pink-400 rounded-lg'>
      <p className="text-3xl font-bold text-pink-400">👥 5K+</p>
      <p className="text-sm text-gray-400">Active Users</p>
    </div>
    <div className='p-5 border border-indigo-400 rounded-lg'>
      <p className="text-3xl font-bold text-indigo-400">📄 10K+</p>
      <p className="text-sm text-gray-400">Resumes Processed</p>
    </div>
    <div className='p-5 border border-green-400 rounded-lg'>
      <p className="text-3xl font-bold text-green-400">🏢 500+</p>
      <p className="text-sm text-gray-400">Companies Joined</p>
    </div>
    <div className='p-5 border border-yellow-400 rounded-lg'>
      <p className="text-3xl font-bold text-yellow-400">💡 1M+</p>
      <p className="text-sm text-gray-400">AI Job Suggestions</p>
    </div>
  </div>
</div>

<div className="mt-10 p-10 bg-gradient-to-r from-[#1a1a40] to-[#0e0e2c] rounded-3xl text-white text-center">
  <h3 className="text-3xl font-bold mb-4">Ready to Find Your Next Opportunity?</h3>
  <p className="text-gray-300 mb-6">Whether you're a job seeker or a recruiter, FitForWork has the tools to support your journey.</p>
  <div className="flex flex-col sm:flex-row justify-center gap-4">
    <a href="/register" className="bg-pink-600 px-6 py-3 rounded-lg hover:bg-pink-700 transition duration-300 font-medium">Register as Job Seeker</a>
    <a href="/recruiter" className="bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium">Join as Recruiter</a>
  </div>
</div>





<div className="flex items-center justify-center gap-5 text-center mt-12 mx-auto w-fit border border-[red] px-10 py-5 rounded-2xl ">
          <p className='text-gray-400 text-lg'>
            Still Something left in your mind??
          </p>
          <Link
            to="/contact"
            className="px-6 py-3  border border-[indigo] rounded-lg hover:bg-indigo-900 transition text-white shadow-lg"
          >
            Contact Us
          </Link>


        </div>



    </div>
  );
};

export default About;
