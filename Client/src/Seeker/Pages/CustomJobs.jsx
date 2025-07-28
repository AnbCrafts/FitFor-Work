import React, { useContext, useEffect, useState } from "react";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { useNavigate, useParams } from "react-router-dom";
import { MoveLeftIcon } from "lucide-react";
import JobCard from "../Components/JobCard";
import PageNav from "../../Global/Components/PageNav";

const CustomJobs = () => {
  const {
    getCustomJobs,
    customJobs,
    getSeekerDataByUserId,
    user_seekerData,
    getAllRequirementsForJob,
    requirements,
     getUserIdByToken,globalId,
  } = useContext(WorkContext);
  
  const { role, userId,hash, param } = useParams();
  const [skills, setSkills] = useState(null);
  const [allJobs, setAllJobs] = useState(null);
  const [navPath, setNavPath] = useState(null);
  useEffect(() => {
    setNavPath(`/auth/${role}/${hash}`);
    getUserIdByToken();
  }, [hash]);

  const [key, value] = param.split("=");

  useEffect(() => {
    getAllRequirementsForJob();
  }, []);

  useEffect(() => {
    console.log(requirements);
  }, [requirements]);

  useEffect(()=>{
    getCustomJobs(param);
  },[param]);

  useEffect(()=>{
    console.log(customJobs);
  },[customJobs])

  const navigate = useNavigate();
 
const handleGoBack = () => {
    navigate(`/auth/seeker/${hash}`);
  };

  const [currentJobPage, setCurrentJobPage] = useState(1);
      const jobsPerPage = 8;
      const indexOfLastJob = currentJobPage * jobsPerPage;
      const indexOfFirstJob = indexOfLastJob - jobsPerPage;
      const currentJobs = customJobs?.slice(
        indexOfFirstJob,
        indexOfLastJob
      );
      const totalJobPages = Math.ceil(
        customJobs?.length / jobsPerPage
      );
    
      
  

 

  return (
   <div className="w-[90%] mx-auto">
    <div className='py-5 mb-5 bg-gray-900 rounded-xl'>
            <div className="flex items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2">
                            <MoveLeftIcon
                              onClick={handleGoBack}
                              className="h-12 w-12 cursor-pointer bg-black rounded-full p-2"
                            />
                  
                            <h1 className="text-3xl font-bold text-gray-300">
                             Jobs for {value}
                            </h1>
                          </div>
            
            
          </div>
  {customJobs && customJobs.length > 0 ? (
    <div>
    <div className='w-full min-h-[80vh] py-5 flex items-start justify-between gap-10 flex-wrap'>
      {
        currentJobs?.map((item)=>{
          return(
            <JobCard job={item} />
          )
        })
      }
      
    </div>
    <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
        <PageNav currentPage={currentJobPage} totalPages={totalJobPages} incrementer={setCurrentJobPage} />
      </div>
    </div>



  ) : (
    <div className="w-full h-[300px] flex flex-col items-center justify-center text-center p-4 rounded-xl shadow-md border border-pink-300 bg-gradient-to-r from-[#1a1a40] to-[#2c2c54] text-white">
      <h2 className="text-3xl font-semibold text-pink-500 mb-2">We're Sorry</h2>
      <p className="text-lg text-gray-300 max-w-xl">
        It seems like the opportunity you're searching for doesn't exist or has already moved on.
        <br />
        We understand this might be disappointing.
      </p>
      <p className="mt-4 text-gray-400 text-sm italic">
        “Every closed door is a redirection, not a rejection.”
      </p>
    </div>
  )}
</div>

  );
};

export default CustomJobs;
