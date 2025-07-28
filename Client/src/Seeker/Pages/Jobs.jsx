import React, { useContext, useEffect, useState } from 'react'
import JobCard from '../Components/JobCard'
import Filters from '../Components/Filters'
import ApplySteps from '../Components/ApplySteps'
import Bottom from '../Components/Bottom'
import { WorkContext } from '../../ContextAPI/WorkContext'
import PageNav from '../../Global/Components/PageNav'
import { Link, useParams } from 'react-router-dom'
 
const Jobs = () => {
  const {getUserIdByToken,globalId,getAllJobsFromDB,allJobs,getAllRequirementsForJob,requirements,getSeekerDataById,seekerData} = useContext(WorkContext);
  const {hash} =useParams();
  useEffect(()=>{
    getUserIdByToken();
  },[hash]);

  useEffect(()=>{
    getSeekerDataById(globalId)
  },[globalId]);

  useEffect(()=>{
    getAllJobsFromDB();
  },[])

 

  useEffect(()=>{
    getAllRequirementsForJob();
  },[])




  const [currentJobPage, setCurrentJobPage] = useState(1);
    const jobsPerPage = 8;
    const indexOfLastJob = currentJobPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = allJobs?.slice(
      indexOfFirstJob,
      indexOfLastJob
    );
    const totalJobPages = Math.ceil(
      allJobs?.length / jobsPerPage
    );

    const [showApplicantPopup, setShowApplicantPopup] = useState(false);

// useEffect(() => {
//   let timer;
//   if (seekerData === null ) {
//     timer = setTimeout(() => {
//       setShowApplicantPopup(true);
//     }, 5000); 
//   }

//   return () => clearTimeout(timer);
// }, [seekerData]);

const handleCloseApplicantPopup = () => {
  setShowApplicantPopup(false);
};

  
    


  return (

    <>
     {showApplicantPopup && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center h-[100vh] ">
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-600 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
          />
        </svg>
        <div>
          <h2 className="text-lg font-bold">No Job Applications Found</h2>
          <p className="text-sm mt-1">
            You haven’t applied for any jobs yet. Start exploring and applying to jobs to kickstart your career!
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Link
          to={`/auth/seeker/${hash}/enroll`}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-md shadow"
        >
          Apply Now
        </Link>
        <button
          onClick={handleCloseApplicantPopup}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    { !showApplicantPopup && <div className='min-h-[100vh] w-[90%] mx-auto mt-10'>
     

    <div className='flex items-start justify-start gap-5'>
      
     <div className='p-5 rounded-2xl border border-[#ee82ee4a] h-auto w-[430px] bg-gray-900 max-h-[300vh] overflow-y-auto noScroll'>
  <h1 className='text-2xl text-center text-gray-400 mb-5 '>All Filters</h1>
  {
    requirements && Object.entries(requirements).map(([key, value], index) => {
      if (key === 'ownerIds') return null;
      return(
       
      <Filters key={index} head={key} options={value} />
    )})
  }
</div>
 

     <div>
       <div className='px-5 min-h-[100vh] max-h-[300vh] overflow-scroll noScroll min-w-[640px] overflow-y-scroll noScroll'>
        {
          currentJobs?.map((item,index)=>{
            return(
              <JobCard key={index} job={item}   />
            )
          })
        }
      </div>

      
     </div>

        <div className='px-5 '>
          <ApplySteps/>
          
        </div>




      </div> 

      <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
        <PageNav currentPage={currentJobPage} totalPages={totalJobPages} incrementer={setCurrentJobPage} />
      </div>


      <Bottom/>  

      


      
    </div>}
    </>
  )
}

export default Jobs
