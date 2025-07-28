import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { WorkContext } from '../../ContextAPI/WorkContext';
import AppliedJobCard from '../Components/AppliedCard';

const Application = () => {
   const {hash } = useParams();


  
   const {
    getUserDataById,
    getUserIdByToken,globalId,
    getSeekerDataByUserId,
    user_seekerData,
    getApplicantBySeekerId,
    singleApplicantData
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

 

  return (
    <div className='min-h-[100vh] w-[90%] mx-auto'>
      <div className='py-5 mb-5 bg-gray-900 rounded-xl'>
        


      </div>
      <div className="w-full h-auto py-5 flex items-center justify-start gap-5 flex-wrap">
          
          {singleApplicantData?.map((item,index)=>{
            return(
              <AppliedJobCard key={index}    jobId={item?.jobId}
                companyId={item?.companyId}
                appliedAt={item?.appliedAt}
                status={item.status} />
            )
          })}
        </div>
      
    </div>
  )
}

export default Application
