import React from 'react'
import { useContext } from 'react';
import { WorkContext } from '../../ContextAPI/WorkContext';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trash, Trash2Icon } from 'lucide-react';

const SingleNotification = () => {
    const {getNotificationById,singleNotificationData,convertToStandardDateTime} = useContext(WorkContext);
        const{notificationId} = useParams();

      useEffect(()=>{
        getNotificationById(notificationId);
      },[])
      useEffect(()=>{
        console.log(singleNotificationData);
      },[singleNotificationData])


    //   applicant/profile-detail/6863e34b796b7be756f14bef

  return (
    <div className='w-[90%] mx-auto min-h-[60vh] p-5 bg-gray-900 shadow-2xl rounded-2xl'>
            <div className='bg-gray-800 p-5 rounded-2xl'>
                <div className='max-w-fit mx-auto'>
                    <h1 className='text-3xl font-semibold'>{singleNotificationData?.title}</h1>
                    <span className='inline-block mt-2 text-gray-500'>{convertToStandardDateTime(singleNotificationData?.createdAt)}</span>
                    <span className='flex my-5 bg-red-500 py-1 rounded cursor-pointer hover:bg-red-600 text-center w-full items-center justify-center gap-2'>Delete <Trash2Icon/></span>
                   
                </div>
                <div className='mt-5'>
                    <span className='text-2xl '>Subject - </span>
                    <p className='py-2 max-w-2xl text-lg text-gray-300 px-4 bg-gray-900 rounded mt-3'>
                        {singleNotificationData?.subject}
                    </p>
                </div>
                <div className='mt-5 w-sm'>
                    <Link className='py-1 px-6 block mb-3 border w-full mt-3 text-lg text-center border-gray-600 rounded-md cursor-pointer bg-green-500 hover:bg-green-600' to={`applicant/profile-detail/${singleNotificationData?.metaData.applicant.id}`}>View Applicant Details</Link>
                    <Link className='py-1 px-6 block mb-3 border w-full mt-3 text-lg text-center border-gray-600 rounded-md cursor-pointer bg-green-500 hover:bg-green-600' to={`job/${singleNotificationData?.metaData.job.id}`}>View Job Details</Link>
                </div>


            </div>


      
    </div>
  )
}

export default SingleNotification
