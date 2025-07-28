import React from 'react'
import Logo from './Logo'
 
const Footer = () => {
  
  return (
    <footer className="bg-[#0f0c29] text-white py-10 px-5 border-t border-indigo-900 mt-10">
      
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

    {/* Logo and Description */}
    <div>
      <Logo path={'/'} exit={true} /> 
      <p className="text-md text-gray-400 mt-5">
        Empowering job seekers and recruiters with AI-enhanced job matching and smart hiring solutions.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-2xl text-indigo-300 mb-3">Quick Links 🔗</h2>
      <ul className="text-md space-y-2 text-gray-300">
        <li><a href="/" className="hover:text-pink-400 transition">🏠 Home</a></li>
        <li><a href="/jobs" className="hover:text-pink-400 transition">💼 Jobs</a></li>
        <li><a href="/form" className="hover:text-pink-400 transition">📝 Fill Form</a></li>
        <li><a href="/contact" className="hover:text-pink-400 transition">📬 Contact Us</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h2 className="text-2xl text-indigo-300 mb-3">Contact 📞</h2>
      <p className="text-md text-gray-300 mb-1">📧 support@fitforwork.com</p>
      <p className="text-md text-gray-300 mb-1">📍 Dhanbad, Jharkhand, India</p>
      <p className="text-md text-gray-300">📱 +91 98765 43210</p>
    </div>

    {/* Socials */}
    <div>
      <h2 className="text-2xl text-indigo-300 mb-3">Follow Us 🌐</h2>
      <div className="flex space-x-4 text-2xl text-gray-400">
        <a href="#" className="hover:text-pink-400 transition">🌍</a>
        <a href="#" className="hover:text-pink-400 transition">🐦</a>
        <a href="#" className="hover:text-pink-400 transition">📘</a>
        <a href="#" className="hover:text-pink-400 transition">📸</a>
      </div>
    </div>

  </div>

  {/* Bottom */}
  <div className="text-center text-md text-gray-500 mt-10 border-t border-[#ffffff1a] pt-4">
    © {new Date().getFullYear()} FitForWork. All rights reserved. ❤️ Made with passion.
  </div>
</footer>

  )
}

export default Footer
