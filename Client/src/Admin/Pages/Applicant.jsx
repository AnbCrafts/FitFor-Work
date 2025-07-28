import React from 'react'
import { useContext } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import { useEffect } from 'react';
import { useState } from 'react';
import PageNav from '../../Global/Components/PageNav';
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Applicant = () => {
  const {getAllApplicants,allApplicants,convertToStandardDateTime} = useContext(WorkContext);
  const [singleApplicantId, setSingleApplicantId] = useState(null);
  
 
  useEffect(()=>{
    getAllApplicants();
  },[])

  useEffect(()=>{
    console.log("allApplicants->",allApplicants)
  },[allApplicants])

  const [currentApplicantPage, setCurrentApplicantPage] = useState(1);
    const ApplicantsPerPage = 6;
    const indexOfLastApplicant = currentApplicantPage * ApplicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - ApplicantsPerPage;
    const currentApplicant = allApplicants?.slice(
      indexOfFirstApplicant,
      indexOfLastApplicant
    );
    const totalApplicantPages = Math.ceil(
      allApplicants?.length / ApplicantsPerPage
    );

    const [openDialogBox, setOpenDialogBox] = useState(false);
      const [toggleView, setToggleView] = useState(false);
      const [view, setView] = useState("List View");

const navigate = useNavigate();
useEffect(()=>{
    if(singleApplicantId!==null){
      navigate(`single-applicant/detail/${singleApplicantId}`)
    }
},[singleApplicantId])

  return (
    <div className='min-h-[100vh] w-[90%] mx-auto mt-5'>
      <div className="mb-8 mt-5 py-5 px-10 mx-auto w-fit border-t border-l border-pink-500 rounded-2xl bg-gray-800">
  <h1 className="text-4xl font-bold text-pink-500">
    Applicant Management Panel
  </h1>
  <p className="mt-2 text-gray-400 text-base max-w-3xl">
    This admin panel provides a centralized interface to manage and review job applicants across all postings. View detailed applicant profiles, filter by job roles or status, and take direct actions like approve, reject, or hold applications. Ensure efficient hiring workflows and maintain transparency in the recruitment process with smart filters and search capabilities.
  </p>
</div>

      <div className="flex justify-start gap-5 items-center mb-4 w-full py-5 px-10 border border-gray-600 rounded-lg bg-gray-900 ">
              <div className="w-[500px] md:w-1/3 flex items-center justify-between">
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search by name or email"
                  className="w-full outline-none p-2.5 text-lg border-t border-l border-b border-pink-500 shadow-sm text-white"
                />
                <button className="bg-pink-500 p-2.5 rounded-r-lg">
                  <Search className="h-7.5 w-7 " />
                </button>
              </div>
      
              <div
                className={` px-5 py-2.5 flex items-center justify-start relative gap-5 w-[380px]`}
              >
                <div
                  onClick={() => setOpenDialogBox(!openDialogBox)}
                  className="flex items-center justify-between bg-pink-500 hover:bg-pink-600 cursor-pointer rounded-md px-2"
                >
                  <span className="text-white px-2 py-1 text-lg cursor-pointer ">
                    Filter
                  </span>
                  <span>
                    {openDialogBox ? (
                      <ArrowUp className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
                    ) : (
                      <ArrowDown className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
                    )}
                  </span>
                </div>
                <div
                  className={`border border-pink-500 absolute right-0 bg-gray-900 z-10 ${
                    openDialogBox ? "h-fit top-2" : "h-10"
                  } text-center text-lg overflow-y-hidden`}
                >
                  <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center bg-gray-800">
                    All
                  </span>
                  <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
                    All
                  </span>
                  <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
                    All
                  </span>
                  <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
                    All
                  </span>
                  <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
                    All
                  </span>
                </div>
              </div>
      
              <div
                className={` px-5 py-2.5 flex items-center justify-start relative gap-5 w-[380px]`}
              >
                <div
                  onClick={() => setToggleView(!toggleView)}
                  className="flex items-center justify-between bg-pink-500 hover:bg-pink-600 cursor-pointer rounded-md px-2"
                >
                  <span className="text-white px-2 py-1 text-lg cursor-pointer ">
                    View
                  </span>
                  <span>
                    {toggleView ? (
                      <ArrowUp className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
                    ) : (
                      <ArrowDown className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
                    )}
                  </span>
                </div>
                <div
                  className={`border border-pink-500 absolute right-0 bg-gray-900 z-10 ${
                    toggleView ? "h-fit top-2" : "h-10"
                  } text-center text-lg overflow-y-hidden`}
                >
                  <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center bg-gray-800">
                    {view}
                  </span>
                  <span
                    className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800"
                    onClick={() => setView("List View")}
                  >
                    List View
                  </span>
                  <span
                    className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800"
                    onClick={() => setView("Card View")}
                  >
                    Card View
                  </span>
                </div>
              </div>
            </div>
      
      
      <div className='p-5 bg-gray-800 mt-5 z-0'>
        {
          allApplicants
          ?
          currentApplicant.map((item)=>{
            return(
              <div onClick={()=>setSingleApplicantId(item._id)} key={item._id} className='p-5 mb-3 bg-gray-900 rounded-xl shadow hover:shadow-2xl cursor-pointer flex items-center justify-between'>
               
               <div className='h-auto w-auto p-0.5 mr-5'>
               <img className='h-15 w-15 rounded object-cover' src={item.user.picture} alt="" />

               </div>
                <span className='text-lg flex-1 px-5 text-ellipsis whitespace-nowrap '>{item?.user.username}</span>
                <span className='text-lg flex-1 px-5 text-ellipsis whitespace-nowrap mx-5 text-center'>{item?.job.jobRole}</span>
                <span className='text-lg flex-1 px-5 text-ellipsis whitespace-nowrap mx-5 text-center'>{item?.authority.industry}</span>
                <span className='text-lg flex-1 px-5 text-ellipsis whitespace-nowrap mx-5 text-center'>{item.authority.companyName}</span>
                <span className={`text-lg flex-1 px-5 py-1 rounded text-center text-ellipsis whitespace-nowrap mx-5 ${item.status==="Accepted"?"bg-green-500 ": "bg-pink-500"}`}>{item.status}</span>


              </div>
              
            )

          })
         
          :
          <div>
            <p>Currently no applicants are present</p>
          </div>
        }


      </div>

       <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
                      <PageNav currentPage={currentApplicantPage} totalPages={totalApplicantPages} incrementer={setCurrentApplicantPage} />
       </div>

      
      
    </div>
  )
}

export default Applicant
