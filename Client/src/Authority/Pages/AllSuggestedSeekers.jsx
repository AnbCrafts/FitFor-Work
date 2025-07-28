import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { WorkContext } from '../../ContextAPI/WorkContext';
import SeekerCard from '../Components/SeekerCard';
import { ArrowLeftCircleIcon } from 'lucide-react';

const AllSuggestedSeekers = () => {


    const {id,hash} = useParams();
    const {getCompanyByOwnerId,authData,getMatchedData,matchedData} = useContext(WorkContext);

    useEffect(()=>{
          const id = localStorage.getItem("userId");
      if(id){
        getCompanyByOwnerId(id);
        
    
      }
      },[hash]);

      const [authId,setAuthId] = useState(null);
      useEffect(()=>{
        if(authData && authData?._id){
          setAuthId(authData._id)
          
        }
    
    
    
      },[authData])
      
      useEffect(()=>{
        if(authId && authData?._id){
         
          getMatchedData(authId);
      
        }
      
      },[authId])
    
      useEffect(()=>{
        console.log("matchedData",matchedData)
      
      },[matchedData])
    

      const navigate = useNavigate();
  return (
    <div className='w-[90%] mx-auto'>
    <div className="bg-gray-900 p-5 mb-5 rounded-xl shadow-2xl">
        <ArrowLeftCircleIcon onClick={()=>navigate(`/auth/authority/${hash}/profile`)} className="h-10 w-10 cursor-pointer"/>


      </div>
    <div className='flex items-center justify-start gap-5 my-5 flex-wrap '>
      {matchedData &&
      matchedData.totalMatches > 0 &&
      matchedData.seekers?.map((item, index) => (
        <SeekerCard key={index} item={item} id={index} />
      ))}
      
    </div>
    </div>
  )
}

export default AllSuggestedSeekers
