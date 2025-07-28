import React, { useContext, useEffect } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import { Link } from 'react-router-dom';

const Applicant = ({id}) => {
    const {getApplicantById,singleApplicantData,convertToStandardDateTime,getUserDataBySeekerId,singleUserData,} = useContext(WorkContext);

    useEffect(()=>{
        getApplicantById(id,1)
    },[id])
    

    useEffect(()=>{
        if(singleApplicantData && singleApplicantData?.seekerId){
            getUserDataBySeekerId(singleApplicantData?.seekerId)
        }

    },[singleApplicantData])


  return (
    <div className='border rounded-xl border-gray-600 w-fit py-2 px-5'>
        <div className='flex items-center justify-start gap-5  '>
            <div className='h-15 w-15 rounded-full'>
                <img src={singleUserData?.picture} className='h-full w-full rounded-full object-cover' alt="" />

            </div>
            <h1 className='text-lg'>{singleUserData?.firstName + " "+ singleUserData?.lastName}</h1>
        </div>
        <div className='flex items-center justify-start gap-5 mt-2'>
            <h1>Phone - <span>{singleUserData?.phone}</span></h1>
            <h1>E-mail - <span>{singleUserData?.email}</span></h1>
        </div>
       
        <h2 className='text-gray-300 mt-2'>Applied on - <span className='text-gray-500'>{convertToStandardDateTime(singleApplicantData?.appliedAt)}</span></h2>

        <div className='w-fit mx-auto'>
            <Link to={`applicant/profile-detail/${id}`} className='inline-block  px-9 py-1.5 my-5 bg-green-500 cursor-pointer hover:bg-green-700 rounded shadow-2xl'>View Applicant</Link>
        </div>
        
      
    </div>
  )
}

export default Applicant
