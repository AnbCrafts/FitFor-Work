import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowBigLeft,
  ExternalLink,
  File,
  Languages,
  MoveLeftIcon,
  Settings,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { WorkContext } from "../../ContextAPI/WorkContext";

const Info = ({ label, value, status = false }) => (
  <div className="flex shrink-0 w-full items-center gap-5 justify-start border py-1 px-3 rounded-lg border-gray-800">
    <p className="text-lg font-medium text-pink-500">{label} - </p>
    <p
      className={`text-lg font-semibold ${
        status
          ? value === "Active"
            ? "text-green-600"
            : "text-red-600"
          : "text-white"
      }`}
    >
      {value}
    </p>
  </div>
);

const DetailCard = ({ array, head, icon }) => {
  return (
    <div className="p-3 min-w-[200px] min-h-[200px]  h-auto w-auto bg-gray-900 shadow-2xl rounded-xl text-center">
      <p className="text-3xl flex items-center justify-start gap-5 text-gray-400 mb-5 mx-auto w-fit">
        {head}
        {/* <icon className='h-10 w-10 bg-green-500 text-white p-1 rounded-full '/> */}
        {icon}
      </p>
      <ul>
        {array?.map((item, index) => {
          return (
            <span className="block text-lg text-white mb-2" key={index}>
              {item === "None" ? "Nothing available" : item}
            </span>
          );
        })}
      </ul>
    </div>
  );
};

const SingleApplicant = () => {
  const { applicantId } = useParams();

  const { getAllApplicants, allApplicants, convertToStandardDateTime } =
    useContext(WorkContext);
  const [singleApplicantData, setSingleApplicantData] = useState(null);

  useEffect(() => {
    getAllApplicants();
  }, []);

  useEffect(() => {
    if (applicantId && allApplicants) {
      allApplicants.forEach((item) => {
        if (item._id === applicantId) {
          setSingleApplicantData(item);
        }
      });
    }
  }, [allApplicants]);

  useEffect(() => {
    console.log(singleApplicantData);
  }, [singleApplicantData]);

  const id = localStorage.getItem("adminId");
  const {hash} = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/auth/admin/" + hash + "/applicant");
  };

  return (
    <div className="min-h-[100vh] w-[90%] mx-auto p-5 bg-gray-800 mt-5 shadow-2xl rounded-2xl">
      <div className="p-5 border border-gray-700 rounded-2xl h-auto ">
        <div className="flex items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2">
          <MoveLeftIcon
            onClick={handleGoBack}
            className="h-12 w-12 cursor-pointer bg-black rounded-full p-2"
          />

          <h1 className="text-3xl font-bold text-gray-300">
            Applicant Profile
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 flex-wrap mt-5 ">

         <DetailCard  array={singleApplicantData?.seeker.skills} head={"Skills"} icon={<Settings className='h-10 w-10 p-1 bg-green-500 rounded-full text-white' />}  />
         <DetailCard  array={singleApplicantData?.seeker.languagesKnown} head={"Languages"} icon={<Languages className='h-10 w-10 p-1 bg-pink-500 rounded-full text-white' />}  />
         <DetailCard  array={singleApplicantData?.seeker.certifications} head={"Certificates"} icon={<File className='h-10 w-10 p-1 bg-blue-500 rounded-full text-white' />}  />
         <DetailCard  array={singleApplicantData?.seeker.achievements} head={"Achievements"} icon={<Trophy className='h-10 w-10 p-1 bg-violet-500 rounded-full text-white' />}  />

      </div>


      <div className="flex items-start justify-center">

    
     <div className="w-fit">
      <div className="py-5 w-fit">
      <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Applicant Personal Details</h1>

    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"Name"} value={singleApplicantData?.user?.firstName + " "+singleApplicantData?.user?.lastName} />
    <Info label={"Contact"} value={singleApplicantData?.user?.phone} />
    <Info label={"E-mail"} value={singleApplicantData?.user?.email} />
    <Info label={"Address"} value={singleApplicantData?.user?.address} />
    <Info label={"Applied at : "} value={convertToStandardDateTime(singleApplicantData?.appliedAt)} />

  </div>
      </div>

      <div className='py-5 w-fit mb-5'>
    <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Professional Details</h1>
    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"Qualifications"} value={singleApplicantData?.seeker?.qualifications} />
    <Info label={"Currently working in "} value={singleApplicantData?.seeker?.currentCompany} />
    <Info label={"Posted as"} value={singleApplicantData?.seeker?.currentPost} />
    <Info label={"Current CTC"} value={singleApplicantData?.seeker?.currentCTC} />
  </div>
  </div>

   <div className='py-5 w-fit mb-5'>
    <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Abilities and Aspirations</h1>
    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"Experience"} value={singleApplicantData?.seeker?.experience} />
    <Info label={"Desired Post "} value={singleApplicantData?.seeker?.desiredPost} />
    <Info label={"CTC expected"} value={singleApplicantData?.seeker?.expectedCTC} />
    <Info label={"Job Preference"} value={singleApplicantData?.seeker?.preferredJobType} />
    <Info label={"Location"} value={singleApplicantData?.seeker?.preferredLocation} />
  </div>
  </div>

       <div className='py-5 my-5 border border-gray-800 rounded-xl w-fit'>
         <h1 className='text-xl text-center mb-4 text-gray-500 font-semibold'>Know More</h1>
         <div className='flex items-center justify-center gap-3 flex-wrap'>
       {singleApplicantData?.seeker?.portfolioLink ? (
         <a
          href={singleApplicantData?.seeker.portfolioLink}
         target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
        >
          <ExternalLink className="w-5 h-5" />
          Portfolio
         </a>
       ) : (
         <span className="text-gray-500 italic">No portfolio link</span>
       )}

      {singleApplicantData?.seeker?.resume ? (
       <a
           href={singleApplicantData?.seeker.resume}
           target="_blank"
           rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
        >
         <ExternalLink className="w-5 h-5" />
          Resume
        </a>
      ) : (
        <span className="text-gray-500 italic">No resume uploaded</span>
      )}
     </div>



      </div>


     </div>

      <div>
        <div className='py-5 mb-5'>
    <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Job Details</h1>
    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"Title"} value={singleApplicantData?.job?.title} />
    <Info label={"Post"} value={singleApplicantData?.job?.jobRole} />
    <Info label={"Type"} value={singleApplicantData?.job?.jobType} />
    <Info label={"Salary"} value={singleApplicantData?.job?.salaryRange} />
    <Info label={"Location"} value={singleApplicantData?.job?.location} />
    <Info label={"Experience Requirement "} value={singleApplicantData?.job?.experienceRequired} />
    <Info label={"Available Seats "} value={singleApplicantData?.job?.totalSeats} />
    <Info label={"Deadline "} value={convertToStandardDateTime(singleApplicantData?.job?.deadline)} />
  </div>
  </div>

          
      </div>
   
     </div>

     <div>
      <h1 className="text-3xl font-bold text-gray-700">This Job was posted by - </h1>
      {singleApplicantData?.authority?.companyWebsite ? (
         <Link
        to={`/auth/admin/${id}/authority/${singleApplicantData?.authority?._id}`}
          
          className="inline-flex mt-5 items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
        >
          <ExternalLink className="w-5 h-5" />
         Know about the Company
         </Link>
       ) : (
         <span className="text-gray-500 italic">No Company Website link</span>
       )}

     </div>
   
    </div>


    </div>

   
  );
};

export default SingleApplicant;
