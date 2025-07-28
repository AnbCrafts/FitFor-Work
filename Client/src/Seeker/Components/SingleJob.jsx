
import React, { useContext, useEffect, useState } from 'react';
import { Briefcase, MapPin, IndianRupee, PenTool, PenToolIcon, Book, Text, Globe, SaveIcon, Save, Pen, MoveLeftIcon } from 'lucide-react';
import { WorkContext } from '../../ContextAPI/WorkContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaToolbox } from 'react-icons/fa';

const SingleJob = () => {
    const {userId,jobId} = useParams();
    
   const {getSingleJobById,singleJob,convertToStandardDateTime,getAuthorityByID,oneAuthData,getApplicantByJobAndCompanyId,singleApplicantData,applyForJob,applicant_id,getSeekerDataByUserId,user_seekerData,saveJob} = useContext(WorkContext);
  const navigate = useNavigate();
      useEffect(()=>{
              getSingleJobById(jobId)
      },[jobId])
      useEffect(()=>{
              getSeekerDataByUserId(userId)
      },[userId])
      
      useEffect(()=>{
          console.log("Single Job -> ", singleJob)
      },[singleJob])
  
      useEffect(()=>{
        if(singleJob && singleJob?.postedBy){
            getAuthorityByID(singleJob?.postedBy)

        }
      },[singleJob])
      useEffect(()=>{
          console.log(oneAuthData);
      },[oneAuthData])

      useEffect(()=>{
        if(oneAuthData && singleJob && oneAuthData?.postedBy && singleJob?._id){
            getApplicantByJobAndCompanyId(oneAuthData?.postedBy,singleJob?._id)
        }
      })
      useEffect(()=>{
        console.log("singleApplicantData-> ", singleApplicantData)
      },[singleApplicantData])

        // useEffect(()=>{
        //   navigate('jobs')
        // },[applicant_id])

const [save,setSave] = useState(false);
        
        useEffect(() => {
  const saveThisJob = async () => {
    if (user_seekerData?._id && jobId &&save ) {
      await saveJob( user_seekerData._id,jobId);  // Make sure this is an async function
    }
  };

  saveThisJob();
}, [save]);


  const handleGoBack = () => {
    navigate(`/auth/seeker/${userId}/jobs`);
  };


        const [apply,setApply] = useState(false)


useEffect(() => {
  const applyAndRedirect = async () => {
    if (user_seekerData?._id && jobId && apply) {
      await applyForJob(jobId, user_seekerData._id);  // Make sure this is an async function
      navigate(`/auth/seeker/${userId}/jobs`);
    }
  };

  applyAndRedirect();
}, [apply]);





  return (
    <div className='min-h-[100vh] w-[90%] mx-auto bg-gray-800 p-10 rounded-2xl shadow-gray-950 shadow-2xl'>
       <div className="flex items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2">
                <MoveLeftIcon
                  onClick={handleGoBack}
                  className="h-12 w-12 cursor-pointer bg-black rounded-full p-2"
                />
      
                <h1 className="text-3xl font-bold text-gray-300">
                  Job details
                </h1>
              </div>
        <div className='h-full w-full border border-gray-700 rounded-xl p-5'>

     
            <div className='py-3 mb-5 '>
                <h1 className='flex items-center justify-start gap-5 mb-10 w-fit'>
                    <span className='text-8xl px-6 py-2.5 rounded shadow-gray-950 shadow-2xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 bg-clip-text text-transparent'>{singleJob?.title.charAt(0)}</span> 
                    <span className='text-3xl font-semibold text-gray-800 shadow-gray-950 shadow-2xl bg-indigo-500 py-1 px-4 rounded-md'>{singleJob?.title}</span>
                </h1>
            
            <div className='flex items-start justify-start gap-25 mb-5'>
                <div>

                <h1 className='text-2xl text-gray-400 font-semibold my-5'>Job description - </h1>
                <p className='text-gray-500'>Job for post of - <span className='text-gray-200 text-lg'>{singleJob?.jobRole}</span></p>
                <p className='text-gray-500'>Job Type - <span className='text-gray-200 text-lg'>{singleJob?.jobType}</span></p>
                <p className='text-gray-500'>Experience required - <span className='text-gray-200 text-lg'>{singleJob?.experienceRequired}</span></p>
                <p className='text-gray-500'>Job Location - <span className='text-gray-200 text-lg'>{singleJob?.location}</span></p>
                <p className='text-gray-500'>Offered Salary Range - <span className='text-gray-200 text-lg'>{singleJob?.salaryRange}</span></p>
                <p className='text-gray-500'>Total Seats available - <span className='text-gray-200 text-lg'>{singleJob?.totalSeats}</span></p>

                </div>

             <div>
                 <h1 className='text-2xl text-gray-400 font-semibold my-5'>Skills Required - </h1>
                 <div className='mb-5'>
                    {
                    singleJob?.skillsRequired?.map((item,index)=>{
                        return(
                            <span className='text-gray-200 text-lg flex items-center justify-start gap-5' key={index}>
                                <FaToolbox className='text-gray-600'/>
                                {item}
                                </span>
                        )
                    })
                 }
                 </div>
             </div>

             <div>
                 <h1 className='text-2xl text-gray-400 font-semibold my-5'>Application details -  </h1>
                 <div>
                  <span onClick={(()=>setSave(!save))} className='text-lg text-center mb-3 flex items-center justify-center gap-2 py-1 px-6 border border-gray-500 hover:bg-gray-900 hover:text-white cursor-pointer rounded'> 
                  <Save/>  {save?"Saved":"Save Job"}
                    </span>
                  <span onClick={(()=>setApply(true))} className={`text-lg text-center mb-3 flex items-center justify-center gap-2 py-1 px-6 ${apply?"bg-red-500 cursor-not-allowed":"bg-green-500 hover:bg-green-700"} cursor-pointer rounded`}>
                  <Pen/>  {apply?"Applied":"Apply Now"}
                    </span>
                 </div>
             </div>
            </div>





             <div>
                <div>
                    <span className='text-gray-500 text-lg flex items-center justify-start gap-5'>
                        <Text/>
                        ***Read Carefully***</span>
                <p className='text-gray-500 bg-gray-950 max-w-2xl py-1 px-2 rounded my-2'>{singleJob?.description}</p>
                </div>

                <h1 className='text-2xl text-gray-400 font-semibold my-5'>Important dates - </h1>
                <p  className='text-gray-500'>Job Posted on - <span  className='text-gray-200 text-lg'>{convertToStandardDateTime(singleJob?.createdAt)}</span></p>
                <p  className='text-gray-500'>Apply Before - <span  className='text-gray-200 text-lg'>{convertToStandardDateTime(singleJob?.deadline)}</span></p>

             </div>
                

            </div>

       

        <div className='pt-5 border-t-2 border-gray-700'>
            <h1 className='py-3 text-3xl font-semibold text-gray-400'>Authority Details</h1>
            <div className='flex items-start justify-start gap-10'>
                <div className='rounded-full h-[200px] w-[200px] shrink-0'>
                <img className='object-cover h-full w-full rounded-full p-0.5 bg-pink-500' src={oneAuthData?.companyLogo} alt="" />
                </div>

                    <div className='p-5 '>

              <h1 className='text-2xl text-gray-400 font-semibold '>Authority Name - <span>{oneAuthData?.companyName}</span>
              <span className=' mx-10 px-4 py-1 bg-green-500 rounded text-white'>{oneAuthData?.industry}</span>
              </h1>  
                <p className='py-3 text-gray-200 text-justify'>
                    {oneAuthData?.about}
                </p>
<p></p>
                    </div>
            </div>
          
           <div className='flex items-start justify-start gap-5 mt-8'>
            <div className="bg-gray-950 p-4 rounded-xl shadow-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Globe className="text-blue-500 w-10 h-10" />
                  <div>
                    <h2 className="font-semibold text-lg">Portfolio</h2>
                    <p className="text-sm text-gray-400">Personal website</p>
                  </div>
                </div>

                <a
                  href={oneAuthData?.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700"
                >
                  Visit
                </a>
              </div>
             <div>
                <p className='text-gray-500'>Contact On - <span className='text-gray-200 text-lg'>{oneAuthData?.contactNumber}</span></p>
                <p className='text-gray-500'>E-mail On - <span className='text-gray-200 text-lg'>{oneAuthData?.companyEmail}</span></p>

            </div> 
            
            </div> 
            

        </div>

    

        </div>
      
    </div>
  )
}

export default SingleJob


