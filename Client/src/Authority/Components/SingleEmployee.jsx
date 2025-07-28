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

const SingleEmployee = () => {
  const { hash, jobId, empId } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(`/auth/authority/${hash}/profile/job/${jobId}`);
  };
  const {
    getEmployeeById,
    singleEmployee,
    getUserDataByEmpId,
    empProfileData,
    convertToStandardDateTime,
  } = useContext(WorkContext);

  useEffect(() => {
    getEmployeeById(empId);
    getUserDataByEmpId(empId);
  }, [empId]);

  useEffect(() => {
    console.log("empProfileData - ", empProfileData);
  }, [empProfileData]);
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
          <div className="w-[200px] h-[200px] rounded-full shadow-2xl">
            <img
              className="h-full w-full rounded-full p-1 object-cover border border-pink-500"
              src={empProfileData?.picture}
              alt=""
            />
          </div>
          <DetailCard
            array={empProfileData?.skills}
            head={"Skills"}
            icon={
              <Settings className="h-10 w-10 p-1 bg-green-500 rounded-full text-white" />
            }
          />
              
            <div className="w-fit flex-1">
                <div className="py-5 w-fit">
                <h1 className="text-3xl mb-4 text-gray-500 font-semibold">
                  Applicant Personal Details
                </h1>

                <div className=" flex items-center justify-start gap-3 flex-wrap ">
                  <Info label={"Name"} value={empProfileData?.name} />
                  <Info label={"Contact"} value={empProfileData?.phone} />
                  <Info label={"E-mail"} value={empProfileData?.email} />
                  <Info
                    label={"Applied at : "}
                    value={convertToStandardDateTime(empProfileData?.joinedOn)}
                  />
                </div>
              </div>

              <div className="py-5 w-fit mb-5">
                <h1 className="text-3xl mb-4 text-gray-500 font-semibold">
                  Abilities and Aspirations
                </h1>
                <div className=" flex items-center justify-start gap-3 flex-wrap ">
                  <Info
                    label={"Experience"}
                    value={empProfileData?.experience}
                  />
                </div>
              </div>

             
            </div>
         

        </div>

         <div className="py-5 my-5 border border-gray-800 rounded-xl w-fit">
                <h1 className="text-xl text-center mb-4 text-gray-500 font-semibold">
                  Know More
                </h1>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {empProfileData?.portfolioLink ? (
                    <a
                      href={empProfileData?.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Portfolio
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">
                      No portfolio link
                    </span>
                  )}

                  {empProfileData?.resume ? (
                    <a
                      href={empProfileData.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Resume
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">
                      No resume uploaded
                    </span>
                  )}
                </div>
              </div>


      </div>
    </div>
  );
};

export default SingleEmployee;
