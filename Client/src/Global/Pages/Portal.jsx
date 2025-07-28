import React, { useContext } from "react";
import PortalHeader from "../Components/PortalHeader";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { WorkContext } from "../../ContextAPI/WorkContext";

const Portal = () => {
 




    
  return (
    <div className="p-6  w-[90%] mx-auto space-y-12 ">
      <PortalHeader/>

      <section className="text-center w-[90%] mx-auto py-10 mb-10">
        <h1 className="text-5xl font-bold text-pink-500 mb-4">Welcome to  
          <span className='text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text '> FitFor Work</span>

        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Your all-in-one platform to find, apply, and get hired. Whether you're looking to build your career or hire talent, JobConnect makes the process simple and effective.
        </p>
      </section>


      <div className="mx-auto w-fit px-10 py-5 rounded-lg shadow-2xl my-5 bg-gray-900 ">
        <Link to={'/enroll'} className="border border-blue-500 text-2xl px-10 py-2 rounded-lg text-gray-400 hover:text-white transition-all">Connect with us</Link>


      </div>


     <div className="pt-5">
      <h1 className="py-2 mb-5 text-3xl text-gray-400">Explore without Signing in</h1>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {
    ['Seeker', 'Authority', 'Admin'].map((role, i) => {

      let imageSrc = '';
      if (role === 'Seeker') imageSrc = assets.seeker;
      else if (role === 'Authority') imageSrc = assets.authority;
      else if (role === 'Admin') imageSrc = assets.admin;

      return (
        <div key={i} className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xs transition text-center border-b-2 border-l-2 border-pink-500 hover:shadow-pink-500">
          <div className="h-[200px] w-full mx-auto mb-5 p-2 rounded-xl border-b-2 border-r-2 border-pink-500 bg-gradient-to-r from-pink-500 to-blue-500 to-purple-500">
  <img src={imageSrc} className="h-full w-full object-contain rounded-lg" alt={`${role} illustration`} />
</div>

          <h2 className="text-xl font-bold mb-2 text-white">Continue as {role}</h2>
          <p className="text-gray-400 mb-4">Access the platform features tailored for {role.toLowerCase()}s.</p>
          <Link to={`/${role.toLowerCase()}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Go to {role} Portal</Link>
        </div>
      );
    })
  }
</div>

     </div>

     

      <section className="w-full mx-auto my-10 py-10 border-t-2 border-b-2 border-gray-800 flex items-center justify-between">
        
        <div >
        <h2 className="text-5xl font-bold text-pink-500 mb-10 text-center">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Register", "Create Profile", "Search Jobs", "Apply for Jobs", "Get Hired"].map((step, index) => (
            <div key={index} className="bg-gray-900 border-l border-b border-pink-500 p-4 rounded-xl w-48 text-center shadow-sm">
              <div className="text-xl font-semibold text-gray-300">{step}</div>
            </div>
          ))}
        </div>
        </div>
        <div className="h-[400px] w-[400px] border-b-2 border-pink-500">
          <img src={assets.confused} className="h-full w-full object-cover" alt="" />
        </div>

      </section>

      <section className="text-center w-full mx-auto my-10 py-10 border-b-2 border-gray-800 flex items-center justify-between gap-10">
      <div className="h-[400px] w-[400px] border-b-2 border-pink-500">
          <img src={assets.confused2} className="h-full w-full object-cover" alt="" />
        </div>
        <div>
        <h2 className="text-5xl mb-10 font-bold text-pink-500 ">Why Choose           <span className='text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text '> FitFor Work</span>
        </h2>
        <div className="flex items-center justify-center flex-wrap gap-4 max-w-6xl ">
          {[
            "AI-powered job suggestions tailored to your skills.",
            "Trusted by over 1000+ verified companies.",
            "Secure and easy-to-use job application process."
          ].map((point, idx) => (
            <div key={idx} className="bg-gray-900 p-4 shadow-md text-lg rounded-md text-gray-300 border-b border-l flex-1 border-pink-500">{point}</div>
          ))}
        </div>
        </div>


      </section>

      <section className="text-center w-full h-[500px] mx-auto my-10 border-gray-800 relative overflow-hidden">
      <img src={assets.feedback} className="h-full w-full object-cover" alt="" />
      
        <div className="absolute h-full w-full top-50 bg-[#000000a7] py-10 transition-all hover:top-0 delay-150 ">
        <h2 className="text-5xl font-bold text-gray-200 w-fit mx-auto py-2 px-10 bg-[#0000007b] mb-10">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {[
            {
              name: "Ritika, Software Developer",
              feedback: "JobConnect helped me find my dream role in just 2 weeks!"
            },
            {
              name: "Ramesh, HR Manager",
              feedback: "Posting jobs and managing applicants has never been easier."
            }
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-sm max-w-sm mx-auto border-b border-l border-pink-500">
              <p className="text-gray-300 italic mb-2">"{item.feedback}"</p>
              <h3 className="font-bold text-[#FF6B6B]">- {item.name}</h3>
            </div>
          ))}
        </div>
        <div className="w-fit py-5 px-10 mt-20 h-auto mx-auto border-2 border-gray-900 rounded-2xl">
          <h1 className="text-2xl font-semibold">Wanna Know More??</h1>
          <Link to={'/'} className="block mt-5 py-2 px-10 bg-pink-500 rounded-2xl">
          Visit Us Now
          </Link>

        </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="w-full mx-auto h-[500px] relative">
        
          <img src={assets.faq} className="h-full w-full object-cover" alt="" />
        
        
        <div className="top-0 absolute left-0 h-full w-full bg-[#00000087] py-10">
        <h2 className="text-5xl mb-10 font-bold w-fit mx-auto pt-2 pb-4 px-10 bg-[#00000079] text-white text-center">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              q: "Is JobConnect free to use?",
              a: "Yes, it's completely free for job seekers."
            },
            {
              q: "Can I apply to multiple jobs?",
              a: "Absolutely! Apply to as many as you like."
            },
            {
              q: "How do I contact support?",
              a: "You can reach us via our Help page or support email."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow border-b border-l border-pink-500">
              <h4 className="font-semibold text-gray-300">{faq.q}</h4>
              <p className="text-gray-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default Portal;
