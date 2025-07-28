import React from 'react';
import { Link } from 'react-router-dom';
 
const Help = () => {
  return (
    <div className="min-h-screen px-6 py-12 text-white w-[90%] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-red-400">
        Need Help? We're Here for You!
      </h1>

      {/* FAQ Section */}
      <div className="bg-[#1a1a40] p-8 rounded-3xl shadow-md shadow-indigo-500/20 mb-12 border border-pink-600">
        <h2 className="text-3xl font-semibold mb-6 text-pink-400">🧐 Frequently Asked Questions</h2>
        <div className="space-y-5 text-gray-300 text-md">
          <div>
            <p className="font-semibold text-indigo-300">❓ How do I apply for a job?</p>
            <p>Go to the Jobs page, filter based on your preferences, and click the "Apply" button for any job you like.</p>
          </div>
          <div>
            <p className="font-semibold text-indigo-300">❓ Is uploading a resume necessary?</p>
            <p>Yes, it helps our AI recommend jobs that suit your skills and background more accurately.</p>
          </div>
          <div>
            <p className="font-semibold text-indigo-300">❓ How can I contact an employer?</p>
            <p>Once you apply, employers can view your profile and may reach out via email or platform messages.</p>
          </div>
          <div>
            <p className="font-semibold text-indigo-300">❓ I’m a recruiter. How do I post a job?</p>
            <p>Log in with your recruiter account, go to your dashboard, and click on “Post a Job”.</p>
          </div>
        </div>
      </div>

      {/* Contact Support Box */}
      <div className="bg-gradient-to-r from-[#0e0e2c] to-[#1a1a40] p-10 rounded-2xl text-center border border-indigo-600">
        <h2 className="text-3xl font-bold mb-4 text-indigo-300">📩 Still Need Help?</h2>
        <p className="text-gray-300 mb-6">
          If your issue isn’t listed above, feel free to reach out. Our team responds within 24 hours.
        </p>
        <Link
          to="chat"
          className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition shadow-lg shadow-pink-500/20"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default Help;
