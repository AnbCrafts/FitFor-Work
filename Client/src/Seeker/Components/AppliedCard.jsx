import React, { useContext, useEffect } from 'react';
import { Briefcase, MapPin, IndianRupee } from 'lucide-react';
import { WorkContext } from '../../ContextAPI/WorkContext';
import { Link } from 'react-router-dom';

const AppliedJobCard = ({ jobId,companyId, appliedAt, status}) => {
   const {getSingleJobById,singleJob,convertToStandardDateTime,getAuthorityByID,oneAuthData} = useContext(WorkContext);
  
      useEffect(()=>{
              getSingleJobById(jobId)
      },[jobId])
      
      useEffect(()=>{
          console.log("Single Job -> ", singleJob)
      },[singleJob])
  
      useEffect(()=>{
          getAuthorityByID(companyId)
      },[companyId])
      useEffect(()=>{
          console.log(oneAuthData);
      },[oneAuthData])
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#FF6B6B] text-[#0c0c3a] min-w-[550px] flex-1 shrink-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0c0c3a] mb-1">{singleJob?.title}</h2>
          <p className="text-sm text-gray-600">{oneAuthData?.companyName}</p>
        </div>
        <div className="flex gap-2">
          <span className={`${status==="Accepted"?"bg-green-500":status==="Under Review"?"bg-[#FF6B6B]":"bg-red-500"} text-white text-sm px-3 py-1 rounded-full font-semibold`}>{status}</span>
          <span className="bg-[#0c0c3a] text-white text-sm px-3 py-1 rounded-full font-medium">HR Round</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#0c0c3a]">
        <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {singleJob?.location}</div>
        <div className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {singleJob?.experienceRequired}</div>
        <div className="flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {singleJob?.salaryRange}</div>
      </div>

      <p className="mt-4 text-gray-700">
        {singleJob?.description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        {
          singleJob?.skillsRequired.map((item,index)=>{
            return(
              <span key={index} className="text-xs bg-[#0c0c3a] text-white px-2 py-1 rounded">{item}</span>

            )
          })
        }
      </div>
      <div className='mt-5 flex items-center justify-between '>
        <span className="text-sm text-gray-600">{convertToStandardDateTime(singleJob?.deadline)}</span>
        <Link to={`job/applied/${jobId}`} className='font-semibold bg-green-500 px-4 py-1 rounded text-white cursor-pointer hover:bg-green-700'>View More</Link>
      </div>
    </div>
  );
};

export default AppliedJobCard;
