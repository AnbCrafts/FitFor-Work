import React, { useContext, useEffect, useState } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import { useParams } from "react-router-dom";
import CustomApplicant from '../Components/CustomApplicant';
import PageNav from '../../Global/Components/PageNav';

const Applicant = () => {
  const {getAllApplicantsForThisAuth,thisAuthAllApplicants,getCompanyByOwnerId,authData,getUserIdByToken,globalId} = useContext(WorkContext);
  const {hash} = useParams();
  useEffect(()=>{
   const token = localStorage.getItem("userToken");
   if(token){
     getUserIdByToken(token);
   }
   },[hash])
  
  useEffect(()=>{
      getAllApplicantsForThisAuth( globalId);
     
  },[globalId])

  useEffect(()=>{
    console.log("thisAuthAllApplicants",thisAuthAllApplicants)
  },[thisAuthAllApplicants])


 
  const [currentApplicantPage, setCurrentApplicantPage] = useState(1);
const applicantsPerPage = 4;

const applicantEntries = Array.isArray(thisAuthAllApplicants) ? thisAuthAllApplicants : [];

const indexOfLastApplicant = currentApplicantPage * applicantsPerPage;
const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;

const currentApplicants = applicantEntries.slice(indexOfFirstApplicant, indexOfLastApplicant);
const totalApplicantPages = Math.ceil(applicantEntries.length / applicantsPerPage);












  return (
    <div className='w-[90%] mx-auto'>
      {
        currentApplicants?.map((item,index)=>{
          return(
            <CustomApplicant key={index} data={item} />
          )
        })
      }


       <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
                <PageNav
                  currentPage={currentApplicantPage}
                  totalPages={totalApplicantPages}
                  incrementer={setCurrentApplicantPage}
                />
              </div>

      
    </div>
  )
}

export default Applicant
