import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { FaTools } from "react-icons/fa";
import Applicant from "./Applicant";
import { MoveLeftIcon } from "lucide-react";
import Employee from "./Employee";

const SingleJob = () => {
  const {hash,jobId } = useParams();
  const { getSingleJobById, singleJob, convertToStandardDateTime,getApplicantsByJobId ,getEmployeeByJobId,thisJobEmployee} =
    useContext(WorkContext);
    const navigate = useNavigate();

  useEffect(() => {
    getSingleJobById(jobId);
  }, [jobId]);


  useEffect(()=>{
    if(singleJob && singleJob?._id){
      getApplicantsByJobId(singleJob?._id);
    }
  })
  const handleGoBack = () => {
    navigate("/auth/authority/" + hash + "/profile");
  };

  
  

  return (
    <div className="min-h-[80vh] w-[90%] mx-auto">
      <div className="flex  mt-5 items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2 bg-gray-900">
          <MoveLeftIcon
            onClick={handleGoBack}
            className="h-12 w-12 cursor-pointer bg-black rounded-full p-2"
          />

          <h1 className="text-3xl font-bold text-gray-300">
            Detailed View of job
          </h1>
        </div>

      <div className="w-full h-auto p-5 bg-gray-900 rounded-xl">

        <div className="mb-20 mx-auto w-fit px-5 py-2 border border-gray-700 rounded-lg ">
          <h1 className="text-2xl font-semibold">
            Job Title - <span className="font-light">{singleJob?.title}</span>
          </h1>
          <div className="mt-2 flex items-center justify-start gap-5">
            <span className="text-gray-600">
              {convertToStandardDateTime(singleJob?.createdAt)}
            </span>
            <span className="py-1 px-4 bg-green-500 rounded-lg">
              {singleJob?.status}
            </span>
          </div>
        </div>

            <div className="flex items-start justify-between gap-5">

        <div className="">
            <div className="py-5 w-fit ">
          <h2 className="text-3xl mb-5">Skills Required - </h2>
          <ul>
            {singleJob?.skillsRequired.map((item, index) => {
              return (
                <li
                  className=" text-lg text-gray-400 mb-3 flex items-center justify-start gap-5 px-5  py-1.5 my-1 border-b border-l rounded-lg w-3xs  border-gray-700 "
                  key={index}
                >
                  <FaTools />
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mb-5">
          <h2 className="text-3xl my-3">Job Details - </h2>
          <div className="p-5  bg-black w-fit">
            <p className="text-lg text-gray-400">
              Role - <span className="text-gray-200 font-semibold">{singleJob?.jobRole}</span>
            </p>
            <p className="text-lg text-gray-400">
              Type - <span className="text-gray-200 font-semibold">{singleJob?.jobType}</span>
            </p>
            <p className="text-lg text-gray-400">
              Location - <span className="text-gray-200 font-semibold">{singleJob?.location}</span>
            </p>
            <p className="text-lg text-gray-400">
              Salary Range - <span className="text-gray-200 font-semibold">{singleJob?.salaryRange}</span>
            </p>
            <p className="text-lg text-gray-400">
              Experience Required - <span className="text-gray-200 font-semibold">{singleJob?.experienceRequired}</span>
            </p>
            <p className="text-lg text-gray-400">
              Available Seats - <span className="text-gray-200 font-semibold">{singleJob?.totalSeats}</span>
            </p>
            <p className="text-lg text-gray-400">
              Deadline -{" "}
              <span className="text-gray-200 font-semibold">{convertToStandardDateTime(singleJob?.deadline)}</span>
            </p>
          </div>
        </div>

        <div>
          <p className="text-2xl mb-3">
            Job description <span className="text-gray-500 text-lg">***Read carefully***</span>
          </p>
          <p className="max-w-[400px] text-gray-400 text-start">{singleJob?.description}</p>
        </div>

        </div> 

        <div className="flex-1 shrink-0">
          
         <div className="p-5 border border-green-500 flex-1 rounded-xl mb-10">
          <h1 className="text-3xl text-gray-400">Applicants For this Job</h1>
           <div className=" flex justify-start items-start flex-wrap py-5">


        {
  singleJob && singleJob.applicants && singleJob.applicants.length > 0 ? (
    singleJob.applicants.map((item, index) => (
      <Applicant key={item._id || index} id={item} />
    ))
  ) : (
    <p className="text-lg text-white">
      No Applicants Available here
    </p>
  )
}

        </div>

         </div>


         <div className="p-5 border border-pink-500 flex-1 rounded-xl mb-10">
          <h1 className="text-3xl text-gray-400">Accepted Employees</h1>
           <div className=" flex justify-start items-start flex-wrap py-5">


        {
  singleJob && singleJob.employees && singleJob.employees.length > 0 ? (
    singleJob.employees?.map((item, index) => (
      <Employee key={item._id || index} id={item} />

    ))
  ) : (
    <p className="text-lg text-white">
      No Applicants Available here
    </p>
  )
}

        </div>

         </div> 

       


        </div>




        </div>




      </div>


    </div>
  );
};

export default SingleJob;
