import React,{ useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { employeeDB } from '../assets/employeeDB';
import { WorkContext } from '../../ContextAPI/WorkContext'
import { useNavigate, useParams } from 'react-router-dom';
import JobCard from '../Components/JobCard';
import PageNav from '../../Global/Components/PageNav';
import { LogOutIcon, PencilIcon } from 'lucide-react';
import Dashboard from '../Components/Dashboard';

const Profile = () => {
    const { userId,hash,role } = useParams();
const {
  authData,
  getCompanyByOwnerId,
  getUserDataById,
  userData,
  getJobByAuthority,
  jobs,
  convertToStandardDateTime,
  getEmployeeByCompany,thisAuthAllEmployees,
  getUserDataByEmpId,empProfileData,resetOnExit,getUserIdByToken,globalId,
  
} = useContext(WorkContext);

useEffect(()=>{
const id = localStorage.getItem("userId");
  if(id){
    alert(id)
    getCompanyByOwnerId(id);
    getUserDataById(id);

  }



},[hash])


useEffect(() => {

  if (authData && authData._id) {
    getJobByAuthority(authData._id);
    getEmployeeByCompany(authData._id);
  }
}, [authData]);







const [currentJobPage, setCurrentJobPage] = useState(1);
    const jobsPerPage = 6;
    const indexOfLastJob = currentJobPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs?.slice(
      indexOfFirstJob,
      indexOfLastJob
    );
    const totalJobPages = Math.ceil(
      jobs?.length / jobsPerPage
    );

const navigate = useNavigate();


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
    <>
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

{
  !showLogoutPopup &&  <div className='min-h-[100vh]  mx-auto'>
     
      <div className=" mb-6 flex items-start justify-between mt-5 w-[90%] mx-auto bg-gray-900 py-5  rounded-2xl border-l-5 border-pink-500 px-10 transition-all">
       <div>
        
        <h1 className='text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text '>Hi! {userData?.firstName}, <span className='text-2xl'>here's Your Company Profile Overview</span></h1>
        <h2 className="text-4xl font-bold text-gray-400 mb-2"></h2>
        <p className="text-lg text-gray-400">
          <h3 className='font-semibold text-xl ' >-- View and manage --</h3>
          <span className="ml-10 mt-1 block text-pink-500">•  Company details</span>
          <span className="ml-10 mt-1 block text-pink-500">•  Job postings</span>
          <span className="ml-10 mt-1 block text-pink-500">•  Applications received</span> 
          <span className="ml-10 mt-1 block text-pink-500">•  Notifications</span>

          <p className='mt-3'>
            Keep your company profile up to date to attract top talent to your openings!
          </p>  
        </p>
       </div>
       <div className='flex items-center justify-between gap-5'>
        <span onClick={()=>navigate('edit-panel')} className='flex items-center justify-between gap-3 py-2 px-6 border border-teal-500 rounded-md shadow-2xl hover:bg-teal-500 hover:text-gray-900 transition-all cursor-pointer font-semibold'>
          <PencilIcon/>
          Edit Profile
        </span>
        <span onClick={handleLogout} className='flex items-center justify-between gap-3 py-2 px-6 border border-teal-500 rounded-md shadow-2xl hover:bg-teal-500 hover:text-gray-900 transition-all cursor-pointer font-semibold '>Logout
          <LogOutIcon/>
        </span>

       </div>

      </div>

    <Dashboard/>

      <div className='mx-auto w-[90%] py-5 px-5 border-r-4 border-pink-500 bg-gray-900 rounded-2xl my-10'>
        <div className='py-5 border-b-2 border-gray-700'>
          <h1 className='text-2xl text-gray-400 font-semibold mb-5'>My Profile</h1>
          <div className='flex items-center justify-start gap-25 flex-wrap'>
            <div className='h-[200px] w-[200px] rounded-full border-2 border-pink-500'>
              <img src={userData? userData.picture : assets.bg} className='h-full w-full object-cover rounded-full' alt="" />
            </div>
            <div className='p-5 border-b-2 border-r border-pink-500'>
              <h1 className='text-lg text-gray-600 mb-1'>Full Name - <span className='text-gray-200 font-semibold'>{userData?.firstName + " "+ userData?.lastName}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Username - <span className='text-gray-200 font-semibold'>{userData?.username}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Email - <span className='text-gray-200 font-semibold'>{userData?.email}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Profile Created On - <span className='text-gray-200 font-semibold'>{convertToStandardDateTime(userData?.createdAt)}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Phone - <span className='text-gray-200 font-semibold'>{userData?.phone}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Address - <p className='text-gray-200 inline font-semibold'>
                {userData?.address}
                </p></h1>
            </div>
          </div>
        </div>

      </div>
      

      <div className='mx-auto w-[90%] py-5 px-5 border-r-4 border-pink-500 bg-gray-900 rounded-2xl'>
        <div className='py-5 border-b-2 border-gray-700'>
          <h1 className='text-2xl text-gray-400 font-semibold mb-5'>Company Details</h1>
          <div className='flex items-center justify-start gap-25 flex-wrap'>
            <div className='h-[200px] w-[200px] rounded-full border-2 border-pink-500'>
              <img src={authData?.companyLogo} className='h-full w-full object-cover rounded-full' alt="" />
            </div>
            <div className='p-5 border-b-2 border-r border-pink-500'>
              <h1 className='text-lg text-gray-600 mb-1'>Company Name - <span className='text-gray-200 font-semibold'>{authData?.companyName}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>HR Contact - <span className='text-gray-200 font-semibold'>{authData?.contactNumber}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Email - <span className='text-gray-200 font-semibold'>{authData?.companyEmail}</span></h1>
              <h1 className='text-lg text-gray-600 mb-1'>Registered on - <span className='text-gray-200 font-semibold'>{convertToStandardDateTime(authData?.createdAt)}</span></h1>
            </div> 
          </div>
        </div>

        <div className='flex items-center justify-start gap-25 flex-wrap py-5 border-b-2 border-gray-700 '>
          <div className='max-w-[900px]'>
            <h1 className='text-2xl text-gray-400 font-semibold mb-5'>Recruitment Details</h1>
            <div className="border-l border-b-2 border-pink-500  p-5">
              <h1 className="text-lg mb-2 text-gray-600">Location - <span className="font-semibold text-gray-200">{authData?.location}</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">Industry - <span className="font-semibold text-gray-200">{authData?.industry}</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">Hiring For - 
                {authData?.preferredSkills.map((item,index)=>{
                  return(
                    <span key={index} className="font-semibold text-gray-200 px-2  border-r-2 border-pink-500">{item}</span>
                  )
                })}
              </h1>
              <h1 className="text-lg mb-2 text-gray-600">Open Positions - <span className="font-semibold text-gray-200">5</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">Work Mode - 
                {authData?.jobTypesOffered.map((item,index)=>{
                  return(
                    <span key={index} className="font-semibold text-gray-200">{item}</span>
                  )
                })}
              </h1>
              <h1 className="text-lg mb-2 text-gray-600">Preferred Experience Level - <span className="font-semibold text-gray-200">{authData?.preferredExperience} Years</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">Company Website - <span className="font-semibold text-gray-200">{authData?.companyWebsite}</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">Hiring Since - <span className="font-semibold text-gray-200">2021</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">Recruitment Tools Used - <span className="font-semibold text-gray-200">LinkedIn, CodeSage</span></h1>
              <h1 className="text-lg mb-2 text-gray-600">About Company - <p className="font-semibold text-gray-200">{authData?.about}</p></h1>
            </div>
          </div> 
          
          <div className='h-[300px] w-[300px] rounded-2xl'>
            <img src={assets.cover_img} className='h-full w-full object-contain ' alt="" />
          </div>

        </div>
      </div>



      <div className='mx-auto w-[90%] py-10 mt-10 border-b-2 border-t-2 border-pink-500'>
        <h1 className='text-3xl font-bold text-gray-600'>Posted Jobs</h1>
        <div className='flex items-center justify-between gap-5 flex-wrap mt-10'>

          {
            currentJobs?.map((item)=>{
              return(
                <JobCard key={item._id} id={item._id} title={item.title} jobRole={item.jobRole} deadline={convertToStandardDateTime(item.deadline)} createdAt={convertToStandardDateTime(item.createdAt)} description={item.description} totalSeats={item.totalSeats} experienceRequired={item.experienceRequired} status={item.status} jobType={item.jobType} />
              )
            })
          }

        </div>

        <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
        <PageNav currentPage={currentJobPage} totalPages={totalJobPages} incrementer={setCurrentJobPage} />
      </div>


      </div>

      <div className='mx-auto w-[90%] py-10 mt-10 border-b-2 border-pink-500'>
        <h1 className='text-3xl font-bold text-gray-600'>Hired Employees</h1>
        <div className='flex items-center justify-start gap-5 flex-wrap mt-10'>

          {
         thisAuthAllEmployees && thisAuthAllEmployees.map((item,index)=>{
              return(
               <div
  key={index}
  className="p-5 bg-gray-800 rounded-2xl min-w-[370px] min-h-[280px] space-y-3 shadow-md hover:shadow-pink-500/30 transition-all duration-200 cursor-pointer"
                onClick={(()=>navigate(`${item.id}`))}
>
  {/* Picture + Experience */}
  <div className="flex items-center justify-start gap-4">
    <img
      src={item.picture}
      className="h-20 w-20 rounded-full object-cover border-2 border-pink-500"
      alt={item.name}
    />
    <div>
      <span className="text-gray-300 text-sm block">Experience</span>
      <span className="text-lg font-semibold text-white">{item.experience} yrs</span>
    </div>
  </div>

 <div className='flex items-center justify-between'>
   {/* Name, Email, Phone */}
  <div>
    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text">
      {item.name}
    </h1>
    <p className="text-gray-400 text-sm mt-1">{item.email}</p>
    <p className="text-gray-400 text-sm">{item.phone}</p>
  </div>

  {/* Skills */}
  <div className="flex flex-wrap items-center gap-2">
    {item.skills.map((skill, idx) => (
      <span
        key={idx}
        className="text-xs text-gray-100 border-2 border-pink-500 rounded-full px-3 py-1"
      >
        {skill}
      </span>
    ))}
  </div>
 </div>

  {/* Available From */}
  <p className="text-sm text-gray-400">
    <span className="font-semibold text-white">Available From:</span>{" "}
    {new Date(item.availableFrom).toLocaleDateString()}
  </p>

  {/* Resume + Portfolio Links */}
  <div className="flex items-center gap-5 flex-wrap">
    <a
      href={item.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm py-1 px-4 rounded bg-blue-500 font-semibold hover:bg-blue-700 "
    
    >
      View Resume
    </a>
    <a
      href={item.portfolioLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm py-1 px-4 rounded bg-blue-500 font-semibold hover:bg-blue-700 "
   
   >
      Portfolio
    </a>
  </div>
</div>

              )
            })
          }

        </div>

      </div>


    </div>
}
    </>

    
   

  );
};

export default Profile;
