import React, { useContext, useEffect } from "react";
import JobCard from "./JobCard";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { Dot } from "lucide-react";

const CompanyCard = ({ company, id }) => {
  const { getJobByAuthority, jobs } = useContext(WorkContext);

  
  useEffect(() => {
    if (id) {
      getJobByAuthority(id);
    }
  }, [id]);

  const getVerticalChunks = (arr, chunkSize = 10) => {
  const columns = Math.ceil(arr.length / chunkSize);
  const result = Array.from({ length: chunkSize }, () => []);

  for (let i = 0; i < arr.length; i++) {
    result[i % chunkSize].push(arr[i]);
  }
  return result;
};

const skills = company?.preferredSkills || [];
const verticalChunked = getVerticalChunks(skills, 10);


  return (
    <div className="bg-gray-950 shadow-2xl hover:-translate-y-2 transition-all delay-150 rounded-2xl p-7 my-5 w-full mx-auto">
      <div className="border-gray-500 border rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={company.companyLogo}
            alt={`${company.companyName} logo`}
            className="w-60 h-60 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text px-4">
              {company.companyName}
            </h1>
            <p className="text-sm py-2 text-gray-500">
              <span className="text-gray-300 text-lg font-semibold px-4 border-r-2 border-indigo-500">
                {company.industry}
              </span>
              <span className="text-gray-300 text-lg font-semibold px-4 border-r-2 border-indigo-500">
                {company.companySize} employees
              </span>
            </p>
            <p className="text-gray-400 text-justify px-4 text-md mb-4">{company.about}</p>
          </div>
        </div>

        {/* Company Info */}
        <div className="flex items-center justify-between">
          <div className="space-y-2 text-sm text-gray-300">
            <p className="text-lg">
              <strong>Website:</strong>{" "}
              <a href={company.companyWebsite} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                {company.companyWebsite}
              </a>
            </p>
            <p className="text-lg"><strong>Email:</strong> {company.companyEmail}</p>
            <p className="text-lg"><strong>Contact Number:</strong> {company.contactNumber}</p>
            <p className="text-lg"><strong>Location:</strong> {company.location}</p>
            <p className="text-lg"><strong>Job Types Offered:</strong> {company.jobTypesOffered.join(", ")}</p>
            <p className="text-lg"><strong>Preferred Experience:</strong> {company.preferredExperience}+ years</p>
          </div>

          {/* Job List */}
          <div className="px-5 flex-1 max-w-[900px] gap-5 flex items-center justify-between overflow-x-scroll noScroll h-auto">
            {jobs &&
              jobs
                .filter((item) => item.postedBy === id)
                .map((item) => (
                  <JobCard job={item} key={item._id || item.id} />
                ))}
          </div>
        </div>

        <div>
          <h1 className="text-pink-500 text-2xl font-semibold py-1 border-b-2 border-b-pink-500 w-fit">Preferred Skills </h1>
         <div className="p-5 flex gap-6">
  {verticalChunked.map((column, colIndex) => (
    <div key={colIndex} className="flex flex-col gap-1">
      {column.map((item, idx) => (
        <span key={idx} className="px-3 flex items-center gap-1 text-sm min-w-xs">
          <Dot className="text-pink-500" />
          {item.trim()}
        </span>
      ))}
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
