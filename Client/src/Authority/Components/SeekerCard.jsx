import { DotIcon } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const SeekerCard = ({ item,id }) => {
  const {hash} = useParams();
  const {convertToStandardDateTime} = useContext(WorkContext);
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl shadow-lg p-6 w-full flex flex-col sm:flex-row items-center gap-6 transition duration-300 hover:shadow-2xl">

      {/* Left: Profile Image */}
      <div className="w-28  h-28 min-w-[7rem] rounded-full overflow-hidden border-2 border-white/40 shadow-md">
        <img
          src={item.picture}
          alt={`${item.firstName} ${item.lastName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center: Info */}
      <div className="flex-1 bg-gray-900 px-5 py-5 rounded-2xl shadow-2xl text-white">
        <h2 className="text-2xl font-bold">
          {item.firstName} {item.lastName}
        </h2>
        <p className=" text-white/60 mb-2 flex items-center justify-start gap-3">
        <span className="px-3 border-r-2 border-pink-500 font-semibold">{item.email}</span>
           <span className="px-3 border-r-2 border-pink-500 font-semibold">{item.phone}</span>
        </p>

        <div className="text-sm flex items-center justify-start gap-3 flex-wrap ">
          <p><span className="font-semibold text-gray-500">🎯 Desired Post:</span> {item.desiredPost}</p>
          <p><span className="font-semibold text-gray-500">💼 Current:</span> {item.currentPost} @ {item.currentCompany}</p>
          <p><span className="font-semibold text-gray-500">📍 Desired Location:</span> {item.preferredLocation}</p>
          <p><span className="font-semibold text-gray-500">📊 Experience:</span> {item.experience}</p>
          <p><span className="font-semibold text-gray-500">🕒 Available From:</span> {convertToStandardDateTime(item.availableFrom)}</p>
          <p><span className="font-semibold text-gray-500">📌 Desired Job Type:</span> {item.preferredJobType}</p>
          <p><span className="font-semibold text-gray-500">📄 Status:</span> {item.status}</p>
          
        </div>
        <div className="bg-gray-950 w-fit px-6 mt-5 py-2 rounded-xl shadow-2xl">
            
                <span className="font-semibold text-gray-500 ">🛠 Skills:
                </span> 
         <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
  {item.skills?.map((skill, index) => (
    <li key={index} className="flex items-center space-x-2">
      <DotIcon className="text-pink-500" />
      <span>{skill}</span>
    </li>
  ))}
</ul>

        
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-col gap-3 mt-4 sm:mt-0">
        <Link to={`suggested/detail/${id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition">
          View Profile
        </Link>
        <Link className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition">
          Shortlist
        </Link>
      </div>

    </div>
  );
};

export default SeekerCard;
