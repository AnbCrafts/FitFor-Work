import React from 'react';
  
const Contact_ = () => {
  return (
    <div className="min-h-screen px-6 py-12 text-white  w-[90%] mx-auto">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500">
          Contact <span className="text-white">Us</span>
        </h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-pink-500 p-6 rounded-2xl  text-center">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">📧 Email</h3>
            <p className="text-gray-300 break-all">support@fitforwork.ai</p>
          </div>

          <div className="border border-indigo-500 p-6 rounded-2xl  text-center">
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">📞 Phone</h3>
            <p className="text-gray-300">+91 98765 43210</p>
          </div>

          <div className="border border-green-500 p-6 rounded-2xl  text-center">
            <h3 className="text-xl font-semibold text-green-400 mb-2">📍 Address</h3>
            <p className="text-gray-300">123 AI Avenue, Tech City, India 700001</p>
          </div>

          <div className="border border-yellow-500 p-6 rounded-2xl  text-center">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">🌐 Social</h3>
            <div className="flex justify-center gap-4 mt-2 text-gray-300">
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 border border-indigo-500 p-8 rounded-3xl  bg-[#1a1a40]">
          <h2 className="text-3xl font-bold mb-4 text-center text-indigo-400">📩 Send Us a Message</h2>

          <div>
            <label className="block mb-2 text-indigo-300 font-medium">Your Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-[#0f0c29] border border-indigo-500 rounded-lg text-white focus:outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-indigo-300 font-medium">Your Email</label>
            <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-[#0f0c29] border border-indigo-500 rounded-lg text-white focus:outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-indigo-300 font-medium">Your Message</label>
            <textarea rows="5" placeholder="Type your message here..." className="w-full px-4 py-3 bg-[#0f0c29] border border-indigo-500 rounded-lg text-white focus:outline-none resize-none"></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-pink-600 via-indigo-500 to-blue-500 hover:opacity-90 transition-all rounded-lg text-white font-semibold shadow-md"
          >
            Send Message
          </button>
        </form>

        <div className="text-center mt-8 text-gray-400 text-sm">
          We'll respond within 24–48 hours.
        </div>
      </div>
    </div>
  );
};

export default Contact_;
