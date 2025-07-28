import React from 'react'
import './ChartRegister.jsx';
import ApplicationStatusPie from './Pie.jsx';
import ApplicationsLineChart from './Line.jsx';
import JobCategoryBarChart from './Bar.jsx';
import LocationHorizontalBar from './HorBar.jsx';
import ResumeScoreRadar from './radar.jsx';
import { useContext } from 'react';
import { WorkContext } from '../../ContextAPI/WorkContext.jsx';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


const Dashboard = () => { 
  
    const {
    getUserIdByToken,
    globalId,
    fetchApplicationStatusPie,fetchApplicationsByCategory,fetchApplicationsByDate,fetchApplicationsByLocation,fetchResumeGrade,graphData,
    getSeekerDataByUserId,
    user_seekerData,getSuggestedJobsForThisSeeker,suggestedJobsForThisSeeker
  } = useContext(WorkContext);

  const { role, hash } = useParams();
  const [seekerId, setSeekerId] = useState(null);

  // Fetch User ID from token (URL param)
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (hash) getUserIdByToken(token);
  }, [hash]);

  // Get Seeker Data once globalId is ready
  useEffect(() => {
    if (globalId) getSeekerDataByUserId(globalId);
  }, [globalId]);

  // Extract seekerId from user_seekerData
  useEffect(() => {
    if (user_seekerData?._id) setSeekerId(user_seekerData._id);
  }, [user_seekerData]);

  useEffect(() => {
  if (seekerId) {
    fetchApplicationStatusPie(seekerId);
    fetchApplicationsByDate(seekerId);
    fetchApplicationsByCategory(seekerId);
    fetchApplicationsByLocation(seekerId);
    fetchResumeGrade(seekerId);
    getSuggestedJobsForThisSeeker(seekerId);
  }
}, [seekerId]);



useEffect(()=>{
  console.log("suggestedJobs",suggestedJobsForThisSeeker)
},[suggestedJobsForThisSeeker])




const navLink = `/auth/${role}/${hash}`


  return (
    <div className="w-[90%] mb-5 mx-auto min-h-[100vh] px-5 py-10 bg-[#0e0e37] shadow-2xl rounded-2xl mt-5">
       <div className=''>
         <h2 class="text-3xl font-bold mb-8">Your Job Insights</h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
      <h3 class="text-2xl font-semibold mb-2">Applications Submitted</h3>
<div className='flex items-center justify-between mt-5 bg-gray-900 py-3 px-4 rounded-2xl shadow-2xl'>
  
              <p class="text-3xl font-bold text-white bg-purple-700 w-fit border border-white/60 rounded-xl shadow-2xl h-12 min-w-15 text-center py-1 ">
              <span>
              {user_seekerData?.appliedFor?.length}
              </span>
</p>
  <Link to={`${navLink}/my-applications`} className='text-sm py-1.5 px-6 bg-gray-900 rounded-lg shadow-2xl font-semibold cursor-pointer border border-purple-500 '>View now</Link>
  </div>
  
      </div>

    <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
      <h3 class="text-2xl font-semibold mb-2">Jobs Viewed / Saved</h3>
<div className='flex items-center justify-between mt-5 bg-gray-900 py-3 px-4 rounded-2xl shadow-2xl'>
  
              <p class="text-3xl font-bold text-white bg-purple-700 w-fit border border-white/60 rounded-xl shadow-2xl h-12 min-w-15 text-center py-1 ">
              <span>
 {user_seekerData?.savedJobs?.length}
              </span>
             </p>
  <Link to={`${navLink}/saved-jobs`} className='text-sm py-1.5 px-6 bg-gray-900 rounded-lg shadow-2xl font-semibold cursor-pointer border border-purple-500 '>View now</Link>
  </div>
  
      </div>

    
    <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
      <h3 class="text-2xl font-semibold mb-2">Matched Jobs</h3>


  <div className='flex items-center justify-between mt-5 bg-gray-900 py-3 px-4 rounded-2xl shadow-2xl'>
  
              <p class="text-3xl font-bold text-white bg-purple-700 w-fit border border-white/60 rounded-xl shadow-2xl h-12 min-w-15 text-center py-1 ">
              <span>
                     {suggestedJobsForThisSeeker?.totalMatches}
              </span>
              </p>
  <Link to={`${navLink}/jobs`} className='text-sm py-1.5 px-6 bg-gray-900 rounded-lg shadow-2xl font-semibold cursor-pointer border border-purple-500 '>View now</Link>
  </div>
  
      </div>

    <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
      <h3 class="text-2xl font-semibold mb-2">Companies Contacted</h3>
<div className='flex items-center justify-between mt-5 bg-gray-900 py-3 px-4 rounded-2xl shadow-2xl'>
  
              <p class="text-3xl font-bold text-white bg-purple-700 w-fit border border-white/60 rounded-xl shadow-2xl h-12 min-w-15 text-center py-1 ">
              <span>
      6
              </span>
              </p>
  <Link className='text-sm py-1.5 px-6 bg-gray-900 rounded-lg shadow-2xl font-semibold cursor-pointer border border-purple-500 '>View now</Link>
  </div>
  
      </div>

  </div>
      </div>
      
     

      <div className='mt-10'>
        <h2 className="text-2xl font-bold text-white mb-6">
  📈 Track Your Journey to Success
</h2>

      <div className='flex items-start justify-start  flex-wrap gap-5'>
        

        {graphData.pie && <ApplicationStatusPie data={graphData.pie} />}
        {graphData.line && <ApplicationsLineChart data={graphData.line} />}
        {graphData.horBar && <LocationHorizontalBar data={graphData.horBar} />}
        {graphData.grade && <ResumeScoreRadar data={graphData.grade} />}
        {graphData.bar && <JobCategoryBarChart data={graphData.bar} />}
      

        
      </div>

      </div>

     

      
     

      <div className='mt-12'>
         <h2 class="text-2xl font-bold text-white mb-4">📌 Recent Activity</h2>

  <div class="space-y-4">
    
    <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white shadow">
      <p class="text-lg font-semibold">UI/UX Designer - Microsoft</p>
      <p class="text-sm text-gray-300">Status: Viewed by recruiter • 2 days ago</p>
    </div>

    <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white shadow">
      <p class="text-lg font-semibold">Backend Developer - Amazon</p>
      <p class="text-sm text-gray-300">Status: Application submitted • 3 days ago</p>
    </div>

    <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white shadow">
      <p class="text-lg font-semibold">Data Analyst - Swiggy</p>
      <p class="text-sm text-gray-300">Status: Shortlisted • 5 days ago</p>
    </div>

    <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white shadow">
      <p class="text-lg font-semibold">Full Stack Intern - TCS</p>
      <p class="text-sm text-gray-300">Status: Rejected • 6 days ago</p>
    </div>

    <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 text-white shadow">
      <p class="text-lg font-semibold">Frontend Developer - Flipkart</p>
      <p class="text-sm text-gray-300">Status: Under Review • 7 days ago</p>
    </div>

  </div>
      </div>
  
<div className="mt-12">
  <h2 className="text-2xl font-bold text-white mb-4">✨ Suggested Jobs for You</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {
      suggestedJobsForThisSeeker &&
      suggestedJobsForThisSeeker?.suggestedJobs.slice(0, 10).map((item, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-md p-5 rounded-xl text-white border border-white/20 shadow">
          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{item.location}</p>
          <p className="text-sm text-gray-400 flex items-center justify-start gap-5 flex-wrap">
            <span>*{item.jobRole}</span>
            <span>*{item.jobType}</span>
          </p>
          <p className="text-sm max-w-sm text-ellipsis whitespace-nowrap overflow-hidden">
            {item.description}
          </p>
          <Link to={`/auth/${role}/${hash}/jobs/detail/${item._id}`} className="mt-4 block text-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition-all">
            🚀 Apply Now
          </Link>
        </div>
      ))
    }
  </div>

  {
    suggestedJobsForThisSeeker?.suggestedJobs.length > 9 && (
      <div className="mt-6 text-center">
        <Link
          to={`/auth/${role}/${hash}/jobs`}
          className="inline-block text-indigo-400 hover:text-indigo-200 font-semibold transition-all bg-gray-900 py-2 px-6 shadow-2xl rounded-xl"
        >
          ⏩ Show All
        </Link>
      </div>
    )
  }
</div>


       <div className="bg-white/10 rounded-xl p-4 text-white border border-white/20 mt-10">
  <p className="text-sm font-semibold mb-2">
    Profile Completion: <span className="text-green-300">{graphData.grade?graphData.grade+"%":"50%"}</span>
  </p>
  <div className="w-full h-3 bg-gray-700 rounded-full">
    <div
      className="h-full bg-green-500 rounded-full"
      style={{ width: graphData.grade?graphData.grade+"%":"50%"  }}
    ></div>
  </div>

</div>

<div class="mt-10 bg-white/10 p-5 rounded-lg border border-white/20 text-white">
  <h3 class="text-xl font-bold mb-2">📚 Recommended Upskills</h3>
  <ul class="list-disc pl-6 text-gray-300">
    <li>Build projects with MongoDB aggregation</li>
    <li>Practice JavaScript DSA questions</li>
    <li>Learn Resume Optimization tips</li>
  </ul>
</div>


</div>

  )
}

export default Dashboard
