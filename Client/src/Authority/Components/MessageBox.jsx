import React from 'react'

const MessageBox = () => {
  return (
    <section className="bg-[#151527] text-white py-14 px-5 mt-10 rounded-2xl w-[90%] mx-auto">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-3 text-indigo-300">📬 Stay Connected</h2>
    <p className="text-gray-300 mb-8">Got feedback, questions, or complaints? Fill the form below and we’ll get back to you shortly.</p>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      <input
        type="text"
        name="name"
        placeholder="👤 Your Name"
        className="p-3 rounded-md bg-[#1f1f3b] text-white border border-[#23237a] focus:border-red-500 outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="✉️ Your Email"
        className="p-3 rounded-md bg-[#1f1f3b] text-white border border-[#23237a] focus:border-red-500 outline-none"
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="📝 Subject"
        className="p-3 rounded-md bg-[#1f1f3b] text-white border border-[#23237a] focus:border-red-500 outline-none md:col-span-2"
        required
      />
      <textarea
        name="message"
        rows="5"
        placeholder="💬 Your Message"
        className="p-3 rounded-md bg-[#1f1f3b] text-white border border-[#23237a] focus:border-red-500 outline-none md:col-span-2"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 px-6 rounded-md md:col-span-2"
      >
        🚀 Send Message
      </button>
    </form>
  </div>
</section>

  )
}

export default MessageBox
