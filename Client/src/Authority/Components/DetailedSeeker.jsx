import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { useEffect } from "react";
import { useState } from "react";
import { ArrowLeftCircleIcon, SkipBackIcon, StepBack } from "lucide-react";

const SeekerDetailsCard = () => {



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

    <>
    {
        matchedData && matchedData.seekers && id ?
        (

    <div className="w-[90%] md:w-[80%] mx-auto bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-8 text-white mt-10">
      <div className="bg-gray-900 p-5 mb-5 rounded-xl shadow-2xl">
        <ArrowLeftCircleIcon onClick={()=>navigate(`/auth/authority/${hash}/profile`)} className="h-10 w-10 cursor-pointer"/>


      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <img
          src={matchedData?.seekers[id]?.picture}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white/30"
        />
        <div>
          <h1 className="text-3xl font-bold text-pink-400">{name}</h1>
          <p className="text-lg">{matchedData?.seekers[id]?.email}</p>
          <p className="text-md">{matchedData?.seekers[id]?.phone}</p>
        </div>
      </div>

      <div className="space-y-4 text-lg leading-7">
        <p><strong className="text-pink-400">Address:</strong> {matchedData?.seekers[id]?.address}</p>
        <p><strong className="text-pink-400">Desired Post:</strong> {matchedData?.seekers[id]?.desiredPost}</p>
        <p><strong className="text-pink-400">Status:</strong> {matchedData?.seekers[id]?.status}</p>
        <p><strong className="text-pink-400">Experience:</strong> {matchedData?.seekers[id]?.experience}</p>
        <p><strong className="text-pink-400">Qualifications:</strong> {matchedData?.seekers[id]?.qualifications}</p>
        <p><strong className="text-pink-400">Preferred Location:</strong> {matchedData?.seekers[id]?.preferredLocation}</p>
        <p><strong className="text-pink-400">Preferred Job Type:</strong> {matchedData?.seekers[id]?.preferredJobType}</p>
        <p><strong className="text-pink-400">Available From:</strong> {matchedData?.seekers[id]?.availableFrom}</p>
        <p><strong className="text-pink-400">Current Company:</strong> {matchedData?.seekers[id]?.currentCompany}</p>
        <p><strong className="text-pink-400">Current Post:</strong> {matchedData?.seekers[id]?.currentPost}</p>
        <p><strong className="text-pink-400">Current CTC:</strong> {matchedData?.seekers[id]?.currentCTC}</p>
        <p><strong className="text-pink-400">Expected CTC:</strong> {matchedData?.seekers[id]?.expectedCTC}</p>

        {matchedData?.seekers[id]?.portfolioLink && (
          <p>
            <strong className="text-pink-400">Portfolio:</strong>{" "}
            <a href={matchedData?.seekers[id]?.portfolioLink} target="_blank" className="underline text-blue-400">View</a>
          </p>
        )}

        {matchedData?.seekers[id]?.resume && (
          <p>
            <strong className="text-pink-400">Resume:</strong>{" "}
            <a href={matchedData?.seekers[id]?.resume} target="_blank" className="underline text-blue-400">Download</a>
          </p>
        )}

        {matchedData?.seekers[id]?.certifications?.length > 0 && (
          <div>
            <strong className="text-pink-400">Certifications:</strong>
            <ul className="list-disc ml-5 mt-1">
              {matchedData?.seekers[id]?.certifications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {matchedData?.seekers[id]?.languagesKnown?.length > 0 && (
          <div>
            <strong className="text-pink-400">Languages Known:</strong>
            <ul className="list-disc ml-5 mt-1">
              {matchedData?.seekers[id]?.languagesKnown.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {matchedData?.seekers[id]?.achievements?.length > 0 && (
          <div>
            <strong className="text-pink-400">Achievements:</strong>
            <ul className="list-disc ml-5 mt-1">
              {matchedData?.seekers[id]?.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {matchedData?.seekers[id]?.skills?.length > 0 && (
          <div>
            <strong className="text-pink-400">Skills:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {matchedData?.seekers[id]?.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold border border-pink-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
        )
        :(
            <p>
                No Data Found
                
            </p>
        )
    }
    </>
  );
};

export default SeekerDetailsCard;
