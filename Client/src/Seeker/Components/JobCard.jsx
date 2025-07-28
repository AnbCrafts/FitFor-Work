import React, { useContext } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import {Link, useNavigate} from 'react-router-dom'


const JobCard = ({job}) => {
    const {convertToStandardDateTime} = useContext(WorkContext);
    const navigate = useNavigate();

  return (
    <div className='w-[600px] shrink-0 min-h-[260px] bg-gray-900 rounded-2xl px-4 py-3 mb-5'>
        <div className='flex items-center justify-between'>
            <div> 
                <h1 className='text-2xl'>{job?.title}</h1>
                <div className='flex items-center justify-start flex-wrap pr-2 py-1 gap-1'>
                <p className='border-l border-pink-500 pl-2 rounded-sm mr-2'>{job?.jobRole}</p>
                <p className='border-l border-pink-500 pl-2 rounded-sm mr-2'>{job?.experienceRequired}</p>
                <p className='border-l border-pink-500 pl-2 rounded-sm mr-2'>{convertToStandardDateTime(job?.deadline)}</p>
                </div>

            </div>
            <div className='w-[100px] bg-gray-900 h-[80px] border-l border-b border-pink-500  rounded-2xl text-center p-4 overflow-hidden'>
            
                <span className='text-7xl font-bold inline-block -mt-3 bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text '>{job?.title.charAt(0)}</span>
            
            </div>

        </div>

        <div className='flex items-center justify-start gap-1 flex-wrap pr-2 py-2 mt-3'>
            <p className='border-l border-pink-500 pl-2 rounded-sm mr-2'>💼 {job?.jobType}</p>
            <p className='border-l border-pink-500 pl-2 rounded-sm mr-2'>💰 {job?.salaryRange}</p>
            <p className='border-l border-pink-500 pl-2 rounded-sm mr-2'>📍 {job?.location}</p>
            <p className='border-l border-pink-500 pl-2 rounded-sm mr-2 overflow-hidden text-ellipsis whitespace-nowrap'>📝
                {
                    job?.description
                }</p>
        </div>

        <div className='flex items-center justify-start gap-2 flex-wrap mt-2'>
            {
                job?.skillsRequired?.map((item,index)=>{
                    return(
                        <span key={index}>•{item} </span>
                    )
                })
            }
        </div>
        <div className='flex items-center justify-between mt-2 '>
            <span className='text-gray-500'>{convertToStandardDateTime(job?.createdAt)}</span>

            <span onClick={()=>navigate(`detail/${job?._id}`)} className='text-gray-500 hover:text-gray-200 border py-1 px-6 border-gray-600 rounded cursor-pointer transition-all'>View</span>


        </div>
      
    </div>
  )
}

export default JobCard
