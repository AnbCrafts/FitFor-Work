import React from 'react'
import { useState } from 'react';

const CustomApplicant = ({data}) => {
   if (!data) return null;




  const {
    desiredPost,
    status,
    skills,
    experience,
    qualifications,
    certifications,
    achievements,
    languagesKnown,
    portfolioLink,
    resume,
    preferredLocation,
    preferredJobType,
    currentCompany,
    currentPost,
    currentCTC,
    expectedCTC,
    availableFrom,
    createdAt,
    updatedAt
  } = data;


  


  const renderArray = (arr) =>
    arr?.length > 0 && arr[0] !== 'None' ? (
      <div className="flex flex-wrap gap-2 mt-1">
        {arr.map((item, idx) => (
          <span key={idx} className="px-3 py-1 text-sm bg-pink-700 text-white rounded-full">
            {item.trim()}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-400">None</p>
    );

  return (
    <div className="mb-5 w-full bg-[#1e1e2f] rounded-2xl p-6 shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          {desiredPost}
        </h2>
        <p className={`text-sm text-indigo-500 font-semibold ${status === "Experienced" && "bg-indigo-500 text-white rounded-2xl px-4 py-1"}`}>{status}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Experience:</span> {experience} Years</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Qualifications:</span> {qualifications}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Preferred Location:</span> {preferredLocation}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Job Type:</span> {preferredJobType}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Current Company:</span> {currentCompany}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Current Post:</span> {currentPost}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Current CTC:</span> ₹{currentCTC}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Expected CTC:</span> ₹{expectedCTC}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Available From:</span> {availableFrom?.slice(0, 10)}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Profile Created:</span> {createdAt?.slice(0, 10)}</p>
        <p className='text-lg'><span className="text-gray-500 font-semibold ">Last Updated:</span> {updatedAt?.slice(0, 10)}</p>
      </div>

      <div className='flex items-center justify-start gap-5 py-5'>
        <div className="mt-4 min-h-40 p-10 bg-gray-950 shadow-2xl rounded-2xl">
        <p className="font-semibold ">Skills:</p>
        {renderArray(skills)}
      </div>

      <div className="mt-4 min-h-40 p-10 bg-gray-950 shadow-2xl rounded-2xl">
        <p className="font-semibold ">Certifications:</p>
        {renderArray(certifications)}
      </div>

      <div className="mt-4 min-h-40 p-10 bg-gray-950 shadow-2xl rounded-2xl">
        <p className="font-semibold ">Languages Known:</p>
        {renderArray(languagesKnown)}
      </div>
      <div className="mt-4 min-h-40 p-10 bg-gray-950 shadow-2xl rounded-2xl">
        <p className="font-semibold ">Achievements:</p>
        {renderArray(achievements)}
      </div>

      </div>


      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={portfolioLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold  hover:bg-blue-600"
        >
          View Portfolio
        </a>
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-semibold  hover:bg-indigo-700"
        >
          View Resume
        </a>
        <span
          className="bg-green-600 px-4 py-2 rounded-lg text-white font-semibold  hover:bg-green-700"
        >
          Hire Applicant
        </span>
      </div>
    </div>
  );
};


export default CustomApplicant
