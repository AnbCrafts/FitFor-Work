import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkContext } from '../../ContextAPI/WorkContext';
import JobCard from '../Components/JobCard';
import { MoveLeftIcon } from 'lucide-react';

const SavedJobs = () => {
const {
  getUserIdByToken,globalId,
  getAllSavedJobs,
  savedJobsForThisUser,
  getSeekerDataByUserId,
  user_seekerData,
} = useContext(WorkContext);

const { hash } = useParams();

useEffect(()=>{
  getUserIdByToken();
},[hash]);

const [loading, setLoading] = useState(true);

useEffect(() => {
  if (globalId) {
    getSeekerDataByUserId(globalId);
  }
}, [globalId]);

useEffect(() => {
  if (user_seekerData && user_seekerData._id) {
    getAllSavedJobs(user_seekerData._id);
    setLoading(false); 
  }
}, [user_seekerData]);


const navigate = useNavigate();
 
const handleGoBack = () => {
    navigate(`/auth/seeker/${hash}/jobs`);
  };


  
    return (
     <div className=' w-[90%] mx-auto'>
       <div className='py-5 mb-5 bg-gray-900 rounded-xl'>
        <div className="flex items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2">
                        <MoveLeftIcon
                          onClick={handleGoBack}
                          className="h-12 w-12 cursor-pointer bg-black rounded-full p-2"
                        />
              
                        <h1 className="text-3xl font-bold text-gray-300">
                          Saved Jobs
                        </h1>
                      </div>
        
        
      </div>
      {savedJobsForThisUser &&
    <div className='w-full min-h-[80vh] py-5 flex items-start justify-start gap-10 flex-wrap'>
      {
        savedJobsForThisUser?.map((item)=>{
          return(
            <JobCard job={item} />
          )
        })
      }
      
    </div>
}


    </div>
  )
}

export default SavedJobs
