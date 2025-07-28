import React from "react";
import { Dot, MapPin, Mail, Phone, Globe, Users, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OverView = ({ company,id }) => {
  const navigate = useNavigate();
  const {
    companyName,
    companyLogo,
    location,
    preferredSkills = [],
    about,
    companyEmail,
    contactNumber,
    companyWebsite,
    companySize,
    industry,
    _id,
  } = company;

  const handleViewDetails = () => {
    navigate(`detail/${_id}`);
  };
  

  return (
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-md border border-gray-700 hover:shadow-lg transition-all duration-300 max-w-2xl">
      <div className="flex gap-4 items-center">
        <img
          src={companyLogo}
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full object-cover border border-gray-500"
        />
        <div>
          <h2 className="text-xl font-bold text-pink-500">{companyName}</h2>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {location}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-300 line-clamp-2">{about}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {preferredSkills.slice(0, 10).map((skill, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-200"
          >
            <Dot className="text-pink-500 w-4 h-4" />
            {skill.trim()}
          </span>
        ))}
        {preferredSkills.length > 10 && (
          <span className="text-sm text-gray-400">+ more</span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-400" />
          {companyEmail}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-indigo-400" />
          {contactNumber}
        </p>
        <p className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          {companyWebsite}
        </p>
        <p className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          {companySize}
        </p>
        <p className="flex items-center gap-2">
          <BriefcaseBusiness className="w-4 h-4 text-indigo-400" />
          {industry}
        </p>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleViewDetails}
          className="text-pink-500 hover:text-pink-400 font-semibold"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default OverView;
