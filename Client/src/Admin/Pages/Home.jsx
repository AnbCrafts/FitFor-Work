import React from 'react'
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <div className='w-[90%] mx-auto py-5 min-h-[100vh]'>
        <div className='w-fit mx-auto py-5 px-10 border-l border-b border-green-500 rounded-2xl'>
          


<h1 className="text-4xl font-bold text-green-500">Admin Panel</h1>
<p className="text-lg text-gray-500 mt-2 max-w-[900px]">Welcome, Admin. From here, you can oversee job seekers, employers, postings, and platform-wide analytics. Stay in control and keep the ecosystem efficient and secure.</p>

        </div>



      <div>
        
      </div>






        <div className="grid gap-6 md:grid-cols-2 mt-10">
          {/* Platform Overview */}
          <div className=" p-6 rounded-2xl shadow-md bg-gray-900 border border-green-500">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">📌 Platform Overview</h2>
            <p className='text-gray-400'>
              <strong>FitFor Work</strong> is a smart job-matching platform designed to connect job seekers with hiring authorities using AI-powered tools.
              Admins are responsible for monitoring activity, managing platform integrity, and assisting in resolving disputes.
            </p>
          </div>

          {/* Admin Responsibilities */}
          <div className=" p-6 rounded-2xl shadow-md bg-gray-900 border border-pink-500">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">🛠️ Admin Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Review and verify user (Seeker & Authority) registrations.</li>
              <li>Manage job postings and take down inappropriate content.</li>
              <li>Oversee resume analysis and AI-tool usage logs.</li>
              <li>Generate reports and usage statistics.</li>
              <li>Respond to user complaints or abuse reports.</li>
            </ul>
          </div>

          <Dashboard/>

          {/* System Features */}
          <div className="py-10 px-6 rounded-2xl shadow-md md:col-span-2 text-gray-300 mt-5 border bg-gray-600">
            <h2 className="text-4xl font-semibold text-white mb-4">🚀 Key Features for Admin</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className=" rounded-lg py-5 px-10 shadow bg-gray-800 ">
                <h3 className="font-semibold text-2xl">User Management</h3>
                <p className="text-md mt-2">View, activate, deactivate or remove users.</p>
              </div>
              <div className=" rounded-lg py-5 px-10 shadow bg-gray-800 ">
                <h3 className="font-semibold text-2xl">Job Control</h3>
                <p className="text-md mt-2">Approve or reject posted jobs by authorities.</p>
              </div>
              <div className=" rounded-lg py-5 px-10 shadow bg-gray-800 ">
                <h3 className="font-semibold text-2xl">Analytics Dashboard</h3>
                <p className="text-md mt-2">Track platform growth and user interaction trends.</p>
              </div>
              <div className=" rounded-lg py-5 px-10 shadow bg-gray-800 ">
                <h3 className="font-semibold text-2xl">AI Tools Monitoring</h3>
                <p className="text-md mt-2">Oversee usage of resume analyzers and other AI utilities.</p>
              </div>
            </div>
          </div>

          {/* Contact / Support */}
          <div className=" p-6 rounded-2xl shadow-md md:col-span-2 bg-gray-400">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">📫 Need Support?</h2>
            <p className="text-sm text-gray-800">
              Contact the developer or technical team through internal admin chat or email at <strong>support@fitforwork.ai</strong>.
            </p>
          </div>
        </div>

        



      
    </div>
  )
}

export default Home
