import React, { useContext, useEffect } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import { Link } from 'react-router-dom';

const Employee = ({id}) => {

    const{getEmployeeById,singleEmployee,getUserDataByEmpId,empProfileData,convertToStandardDateTime} = useContext(WorkContext);

    useEffect(()=>{
        getEmployeeById(id); 
        getUserDataByEmpId(id);
    },[id])


    useEffect(()=>{
        console.log("empProfileData - ", empProfileData);

    },[empProfileData])


  return (
     <div className='border rounded-xl border-gray-600 w-fit py-2 px-5'>
        <div className='flex items-center justify-start gap-5  '>
            <div className='h-15 w-15 rounded-full'>
                <img src={empProfileData?.picture} className='h-full w-full rounded-full object-cover' alt="" />

            </div>
            <h1 className='text-lg'>{empProfileData?.name}</h1>
        </div>
        <div className='flex items-center justify-start gap-5 mt-2'>
            <h1>Phone - <span>{empProfileData?.phone}</span></h1>
            <h1>E-mail - <span>{empProfileData?.email}</span></h1>
        </div>
       
        <h2 className='text-gray-300 mt-2'>Applied on - <span className='text-gray-500'>{convertToStandardDateTime(singleEmployee?.joinedOn)}</span></h2>

        <div className='w-fit mx-auto'>
            <Link to={`employee/profile-detail/${id}`} className='inline-block  px-9 py-1.5 my-5 bg-pink-500 cursor-pointer hover:bg-pink-700 rounded shadow-2xl'>View Employee</Link>
        </div>
        
      
    </div>
  )
}

export default Employee
