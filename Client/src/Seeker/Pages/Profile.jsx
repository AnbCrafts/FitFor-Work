import React, { useContext, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";
import { assets } from "../assets/assets";
import AppliedJobCard from "../Components/AppliedCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { Globe, LogOutIcon } from "lucide-react";
import { useState } from "react";
import Dashboard from "../Components/Dashboard";

const Profile = ({ user }) => {
  const { userId,hash } = useParams();
  const navigate = useNavigate();
  const {
    getUserIdByToken,globalId,
    getUserDataById, 
    userData,
    convertToStandardDateTime,
    getSeekerDataByUserId,
    user_seekerData,
    getApplicantBySeekerId,
    singleApplicantData,resetOnExit
  } = useContext(WorkContext); 

  useEffect(()=>{
    getUserIdByToken();
  },[hash]);

  useEffect(() => {
    getUserDataById(globalId);
    getSeekerDataByUserId(globalId);
  }, [globalId]);

  useEffect(()=>{
      if(user_seekerData && user_seekerData._id){
        getApplicantBySeekerId(user_seekerData._id)
      }
  },[user_seekerData])


  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  
  const handleLogout = () => {
    setShowLogoutPopup(true); // Show confirmation popup
  };
  
  const confirmLogout = () => {
    resetOnExit();            // Clear context/session
    navigate("/");            // Go to login/home
  };
  
  const cancelLogout = () => {
    setShowLogoutPopup(false); // Close popup
  };
  

  

  return (

    <div className="z-50">

     {showLogoutPopup && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center h-[100vh]">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center w-[90%] max-w-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Confirm Logout</h2>
      <p className="mb-6 text-gray-200">Are you sure you want to log out?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmLogout}
          className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        <button
          onClick={cancelLogout}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{!showLogoutPopup &&<div className="min-h-[100vh]  mx-auto z-0">
  <div className=" mb-6 mt-5 w-[90%] mx-auto bg-gray-900 py-5 flex items-start justify-between rounded-2xl border-l-5 border-pink-500 px-10 transition-all">
    <div>

    <h1 className="text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text ">
      Hi! Anubhaw,
      <span className="text-2xl">here's Your Profile Overview</span>
    </h1>
    <h2 className="text-4xl font-bold text-gray-400 mb-2"></h2>
    <p className="text-lg text-gray-400">
      <h3 className="font-semibold text-xl ">-- View and manage --</h3>
      <span className="ml-10 mt-1 block text-pink-500">
        • Personal details
      </span>
      <span className="ml-10 mt-1 block text-pink-500">
        • Job applications
      </span>
      <span className="ml-10 mt-1 block text-pink-500">
        • Resume information
      </span>
      <span className="ml-10 mt-1 block text-pink-500">
        • Job Notifications
      </span>

      <p className="mt-3">
        Keep your profile up to date to increase your chances of landing
        your dream job!
      </p>
    </p>
    </div>


    <div>
      <span onClick={handleLogout} className='flex items-center justify-between gap-3 py-2 px-6 border border-teal-500 rounded-md shadow-2xl hover:bg-teal-500 hover:text-gray-900 transition-all cursor-pointer font-semibold '>Logout
                <LogOutIcon/>
              </span>
      
    </div>
  </div>
  <Dashboard/>

  <div className="mx-auto w-[90%] py-5 px-5 border-r-4 border-pink-500 bg-gray-900 rounded-2xl">
    <div className="py-5 border-b-2 border-gray-700">
      <h1 className="text-2xl text-gray-400 font-semibold mb-5">
        Registration Details
      </h1>
      <div className="flex items-center justify-start gap-25 flex-wrap">
        <div className="h-[200px] w-[200px] rounded-full border-2 border-pink-500">
          <img
            src={userData?.picture}
            className="h-full w-full object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="p-5 border-b-2 border-r border-pink-500">
          <h1 className="text-lg text-gray-600 mb-1">
            Full Name -{" "}
            <span className="text-gray-200 font-semibold">
              {userData?.firstName + " " + userData?.lastName}
            </span>
          </h1>
          <h1 className="text-lg text-gray-600 mb-1">
            Username -{" "}
            <span className="text-gray-200 font-semibold">
              {userData?.username}
            </span>
          </h1>
          <h1 className="text-lg text-gray-600 mb-1">
            E-mail -{" "}
            <span className="text-gray-200 font-semibold">
              {userData?.email}
            </span>
          </h1>
          <h1 className="text-lg text-gray-600 mb-1">
            Registered on -{" "}
            <span className="text-gray-200 font-semibold">
              {convertToStandardDateTime(userData?.createdAt)}
            </span>
          </h1>
          <h1 className="text-lg text-gray-600 mb-1">
            Phone -{" "}
            <span className="text-gray-200 font-semibold">
              {userData?.phone}
            </span>
          </h1>
        </div>
      </div>
    </div>

  {user_seekerData!==null &&  <div className="flex items-center justify-start gap-25 flex-wrap py-5 border-b-2 border-gray-700 ">
      <div>
        <h1 className="text-2xl text-gray-400 font-semibold mb-5">
          Professional Details
        </h1>
        <div className="border-l border-b-2 border-pink-500  p-5">
          <h1 className="text-lg mb-2 text-gray-600">
            Preferred Location -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.preferredLocation}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Desired Job Role -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.desiredPost}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Expected CTC -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.expectedCTC}
            </span>
          </h1>

          <h1 className="text-lg mb-2 text-gray-600">
            Total Experience -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.experience} Years{" "}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Skills -
            {user_seekerData?.skills.map((item, index) => {
              return (
                <span
                  key={index}
                  className="font-semibold text-gray-200 px-4 border-r-2 border-pink-700"
                >
                  {item}
                </span>
              );
            })}
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Languages -
            {user_seekerData?.languagesKnown.map((item, index) => {
              return (
                <span
                  key={index}
                  className="font-semibold text-gray-200 px-4 border-r-2 border-pink-700"
                >
                  {item}
                </span>
              );
            })}
          </h1>

          <h1 className="text-lg mb-2 text-gray-600">
            Preferred Work Mode -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.preferredJobType}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Availability to Join -{" "}
            <span className="font-semibold text-gray-200">
              {convertToStandardDateTime(user_seekerData?.availableFrom)}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Qualifications -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.qualifications}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Certifications -
            {user_seekerData?.certifications.map((item, index) => {
              return (
                <span
                  key={index}
                  className="font-semibold text-gray-200 px-4 border-r-2 border-pink-700"
                >
                  {item}
                </span>
              );
            })}
            <span className="font-semibold text-gray-200"></span>
          </h1>

          <h1 className="text-lg mb-2 text-gray-600">
            Current Company -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.currentCompany}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Current Post -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.currentPost}
            </span>
          </h1>
          <h1 className="text-lg mb-2 text-gray-600">
            Current CTC -{" "}
            <span className="font-semibold text-gray-200">
              {user_seekerData?.currentCTC}
            </span>
          </h1>

          <div className="bg-gray-800 mt-5 p-4 rounded-xl shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe className="text-blue-500 w-10 h-10" />
              <div>
                <h2 className="font-semibold text-lg">Resume</h2>
                <p className="text-sm text-gray-400">
                  Skills and Qualifications
                </p>
              </div>
            </div>

            <a
              href={user_seekerData?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700"
            >
              Visit
            </a>
          </div>

          <div className="bg-gray-800 mt-5 p-4 rounded-xl shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe className="text-blue-500 w-10 h-10" />
              <div>
                <h2 className="font-semibold text-lg">Portfolio</h2>
                <p className="text-sm text-gray-400">Personal website</p>
              </div>
            </div>

            <a
              href={user_seekerData?.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700"
            >
              Visit
            </a>
          </div>
        </div>
      </div>

      <div className="h-[500px] w-[500px] rounded-2xl">
        <img
          src={assets.cover_img}
          className="h-full w-full object-contain "
          alt=""
        />
      </div>
    </div>}
  </div>

  {/* <div className="pl-5 h-auto w-[90%] mx-auto py-5 border-l-2 mt-10 border-b-2 border-pink-500">
    <h1 className="text-4xl text-gray-400 font-semibold mb-5">
      Saved Jobs
    </h1>
    <div className="w-full h-auto py-5 overflow-x-auto noScroll flex items-center justify-start gap-5">
      {jobDB?.map((item, index) => {
        return (
          <JobCard
            key={index}
           
         

            role={item.role}
            company={item.company}
            logo={item.logo}
            reviews={item.reviews}
            ratings={item.ratings}
            experience={item.experience}
            salary={item.salary}
            location={item.location}
            description={item.description}
            keywords={item.keywords}
            time={item.time}
          />



        );
      })}
    </div>
  </div> */}
 { singleApplicantData !==null && <div className="pl-5 h-auto w-[90%] mx-auto py-5 border-l-2 mt-10 border-b-2 border-pink-500">
    <h1 className="text-4xl text-gray-400 font-semibold mb-5">
      Applied Jobs
    </h1>
    <div className="w-full h-auto py-5 overflow-x-auto noScroll flex items-center justify-start gap-5">
      

      {singleApplicantData?.map((item,index)=>{
        return(
          <AppliedJobCard key={index}    jobId={item?.jobId}
            companyId={item?.companyId}
            appliedAt={item?.appliedAt}
            status={item.status} />
        )
      })}
    </div>
  </div>}

</div>}


<div className="w-[90%] mx-auto">
  {user_seekerData === null && (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-5 rounded-md my-5 flex items-center justify-between gap-4">
    <div className="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
      </svg>
      <div>
        <h2 className="text-lg font-bold">Seeker Profile Not Found</h2>
        <p className="text-sm mt-1">
          You haven’t created your <span className="font-semibold">Seeker Profile</span> yet. Without this, you cannot search or apply for jobs, and employers won't be able to view your profile.
        </p>
      </div>
    </div>
    <Link
      to={`/auth/seeker/${hash}/enroll`}
      className="text-white bg-red-600 hover:bg-red-700 font-semibold px-4 py-2 rounded-md shadow transition duration-200"
    >
      Create Now
    </Link>
  </div>
)}
{singleApplicantData === null && (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-5 rounded-md my-5 flex items-center justify-between gap-4">
    <div className="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
      </svg>
      <div>
        <h2 className="text-lg font-bold">No Job Applications Found</h2>
        <p className="text-sm mt-1">
          You haven’t applied for any jobs yet. Start exploring and applying to jobs to kickstart your career!
        </p>
      </div>
    </div>
    <Link
      to={`/auth/seeker/${hash}/jobs`}
      className="text-white bg-yellow-600 hover:bg-yellow-700 font-semibold px-4 py-2 rounded-md shadow transition duration-200"
    >
      Apply Now
    </Link>
  </div>
)}

</div>


    </div>



   
  );
};

export default Profile;
