import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { WorkContext } from '../../ContextAPI/WorkContext';
import ApplicationsByCategory from './ApplicationByCategory';
import ApplicationsByJobType from './ApplicationByType';
import ApplicationsByRole from './ApplicationByRole';
import ApplicationsByLocation from './ApplicationByLocation';
import WeeklyApplications from './ApplicationByWeek';
import ApplicationsPerJob from './ApplicationByJob';
import ApplicantStatusPie from './ApplicationStatus';
import SeekerCard from './SeekerCard';

const Dashboard = () => {
  const {hash }= useParams();
  
  const {getSkills,allSkills,getUserIdByToken,globalId,getApplicantsStatusWeekly,
    getApplicationsByLocations,
    getApplicationCountPerJob,
    getApplicantsStatus,
    getApplicationsByRoles,
    getApplicationsByTypes,
    getApplicationsByCategory,
    applicationCountByCategory,applicationCountByType,applicationCountByRole,applicationCountByLocation,applicantStatusWeekly,applicationCountPerJob,
  applicantStatus,getCompanyByOwnerId,authData,getMatchedData,matchedData,
  } = useContext(WorkContext)
  
  
  useEffect(()=>{
      const id = localStorage.getItem("userId");
  if(id){
    getCompanyByOwnerId(id);
    

  }
  },[hash]);
  

 
  

  
  
  const [authId,setAuthId] = useState(null);
  useEffect(()=>{
    if(authData && authData?._id){
      setAuthId(authData._id)
      
    }



  },[authData])
  
  useEffect(()=>{
    if(authId && authData?._id){
     
      getApplicantsStatusWeekly(authId)
      getApplicationsByLocations(authId)
      getApplicationCountPerJob(authId)
      getApplicantsStatus(authId)
      getApplicationsByRoles(authId)
      getApplicationsByTypes(authId)
      getApplicationsByCategory(authId)
      getMatchedData(authId);
  
    }
  
  },[authId])

  useEffect(()=>{
    console.log("matchedData",matchedData)
    // if(matchedData && matchedData.seekers.length>0){

    // }

  },[matchedData])






  return (
    <div className="w-[90%] mx-auto min-h-[100vh] px-5 py-10 bg-[#0e0e37] shadow-2xl rounded-2xl mt-5">
         
         <div>
          
         <div className="mt-10 mb-6">
  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
    📊 Recruitment Insights & Analytics
  </h2>
  <p className="text-gray-300 mt-2 text-sm sm:text-base">
    Visualize your job posting performance, applicant trends, and hiring effectiveness.
  </p>
</div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8">
      {/* 1. Category Bar Chart */}
      {applicationCountByCategory?.length > 0 && (
        <ApplicationsByCategory data={applicationCountByCategory} />
      )}

      {/* 2. Job Type Pie Chart */}
      {applicationCountByType?.length > 0 && (
        <ApplicationsByJobType data={applicationCountByType} />
      )}

      {/* 3. Role-wise Applications */}
      {applicationCountByRole?.length > 0 && (
        <ApplicationsByRole data={applicationCountByRole} />
      )}

      {/* 4. Location-wise Applications */}
      {applicationCountByLocation?.length > 0 && (
        <ApplicationsByLocation data={applicationCountByLocation} />
      )}

      {/* 5. Weekly Line Chart */}
      {applicantStatusWeekly?.length > 0 && (
        <WeeklyApplications data={applicantStatusWeekly} />
      )}

      {/* 6. Applications per Job */}
      {applicationCountPerJob?.length > 0 && (
        <ApplicationsPerJob data={applicationCountPerJob} />
      )}

      {/* 7. Applicant Status Pie Chart */}
      {applicantStatus && Object.keys(applicantStatus).length > 0 && (
        <ApplicantStatusPie data={applicantStatus} />
      )}
    </div>
         </div>

    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">📊 Employer Control Panel</h2>
  {/* Top Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-col justify-between p-4 rounded-xl shadow-md text-white bg-amber-500">
      <h4 className="text-sm font-medium opacity-80">Jobs Posted</h4>
      <p className="text-3xl font-bold">{authData?.jobs?.length || 0}</p>
    </div>
    <div className="flex flex-col justify-between p-4 rounded-xl shadow-md text-white bg-green-500">
      <h4 className="text-sm font-medium opacity-80">Hired Seekers</h4>
      <p className="text-3xl font-bold">{authData?.hiredSeekers?.length || 0}</p>
    </div>
    <div className="flex flex-col justify-between p-4 rounded-xl shadow-md text-white bg-red-500">
      <h4 className="text-sm font-medium opacity-80">Rejected Seekers</h4>
      <p className="text-3xl font-bold">{authData?.rejectedSeekers?.length || 0}</p>
    </div>
    <div className="flex flex-col justify-between p-4 rounded-xl shadow-md text-white bg-blue-500">
      <h4 className="text-sm font-medium opacity-80">Seekers to Review</h4>
      <p className="text-3xl font-bold">{authData?.SeekersToReview?.length || 0}</p>
    </div>
  </div>

  <div className='py-5 bg-white/10 border border-white/20 p-6 rounded-xl text-white shadow'>
    <h1 className='text-2xl'>{matchedData?.totalMatches === 0?"Sorry, no Seekers are available as per your requirements ":"Here are some seekers matching with your skill requirements"}</h1>
   <div className='flex items-center justify-start gap-5 my-5 flex-wrap'>
      {matchedData &&
      matchedData.totalMatches > 0 &&
      matchedData.seekers?.slice(0, 2).map((item, index) => (
        <SeekerCard key={index} item={item} id={index} />
      ))}

       <div className="mt-6 text-center w-fit mx-auto">
      <Link
        to={'suggested/list/all'} // or use onClick={handleViewAll}
        className="text-white font-semibold py-2 px-6 bg-indigo-500 hover:bg-indigo-600 shadow-2xl rounded-lg cursor-pointer  transition duration-200"
      >
        View All
      </Link>
    </div>
      
   </div>
  </div>

  {/* Company Info + Criteria */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Company Info */}
    <div className="bg-white/10 border border-white/20 p-6 rounded-xl text-white space-y-4 shadow">
      <div className="flex items-center space-x-4">
        <img src={authData?.companyLogo} alt="Logo" className="w-16 h-16 object-contain rounded-md" />
        <div>
          <h2 className="text-xl font-bold">{authData?.companyName}</h2>
          <p className="text-sm text-gray-300">{authData?.industry}</p>
        </div>
      </div>
      <div className="text-sm space-y-1">
        <p><span className="font-semibold">Email:</span> {authData?.companyEmail}</p>
        <p><span className="font-semibold">Phone:</span> {authData?.contactNumber}</p>
        <p><span className="font-semibold">Website:</span> <a href={authData?.companyWebsite} target="_blank" className="text-blue-300 underline">{authData?.companyWebsite}</a></p>
        <p><span className="font-semibold">Company Size:</span> {authData?.companySize}</p>
        <p><span className="font-semibold">Location:</span> {authData?.location}</p>
        <p><span className="font-semibold">Job Types Offered:</span> {authData?.jobTypesOffered?.join(', ')}</p>
      </div>
    </div>

    {/* Preferred Criteria */}
    <div className="bg-white/10 border border-white/20 p-6 rounded-xl text-white shadow space-y-4">
      <h3 className="text-lg font-semibold">Preferred Criteria</h3>
      <p><span className="font-semibold">Experience:</span> {authData?.preferredExperience || 0}+ years</p>
      <div>
        <span className="font-semibold">Skills:</span>
        <div className="flex flex-wrap mt-2 gap-2">
          {authData?.preferredSkills?.map((skill, i) => (
            <span key={i} className="bg-sky-700 text-xs px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Suggested Actions */}
      <div className="mt-12 bg-white/10 p-5 rounded-lg border border-white/20 text-white">
        <h3 className="text-xl font-bold mb-3">🔧 Suggestions to Improve Hiring</h3>
        <ul className="list-disc pl-6 text-gray-300 text-sm">
          <li>Close expired jobs to keep dashboard clean</li>
          <li>Shortlist candidates within 48 hours</li>
          <li>Update company profile and logo</li>
        </ul>
      </div>

      {/* Placeholder for Charts */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-white mb-4">📈 Graphical Insights (Coming Soon)</h3>
        <p className="text-gray-400">Charts for job performance, application trends, and more will be added.</p>
      </div>

    </div>
  );
};

export default Dashboard;
