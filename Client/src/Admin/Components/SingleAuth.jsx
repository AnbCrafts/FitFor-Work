import React, { useContext, useEffect } from "react";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowBigLeft,
  BriefcaseBusinessIcon,
  ExternalLink,
  File,
  Joystick,
  Languages,
  MoveLeftIcon,
  Settings,
  TowerControl,
  Trophy,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";

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

// Helper date formatter
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SingleAuth = ({path}) => {
  const {
    authData,
    getCompanyByOwnerId,
    getUserDataById,
    userData,
    getAllUsersList,
  } = useContext(WorkContext);

  const { userId,hash } = useParams();

  useEffect(() => {
    getUserDataById(userId);
  }, [userId]);

  useEffect(() => {
    console.log(userData);
    getCompanyByOwnerId(userData?._id);
  }, [userData]);

  useEffect(() => {
    console.log(authData);
  }, [authData]);

  const id = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/auth/admin/" + hash + "/"+path);
    getAllUsersList();
  };

  return (
    <div className="min-h-[100vh] w-[90%] p-5 mx-auto bg-gray-800 mt-10">
      <div className="flex items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2">
        <MoveLeftIcon
          onClick={handleGoBack}
          className="h-12 w-12 cursor-pointer bg-black rounded-full p-2"
        />

        <h1 className="text-3xl font-bold text-gray-300">User Profile</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 flex-wrap mt-5 ">
        <DetailCard
          array={authData?.preferredSkills}
          head={"Skills Required"}
          icon={
            <Settings className="h-10 w-10 p-1 bg-green-500 rounded-full text-white" />
          }
        />
        <DetailCard
          array={authData?.jobTypesOffered}
          head={"Job Types Offered"}
          icon={
            <BriefcaseBusinessIcon className="h-10 w-10 p-1 bg-pink-500 rounded-full text-white" />
          }
        />
      </div>

      <div className="flex h-auto items-start justify-start gap-15 py-5 mt-5 bg-gray-900 px-5 rounded-2xl">
        <div className="w-auto max-w-[300px] h-auto">
          <img
            src={userData?.picture}
            alt={`${userData?.username}'s avatar`}
            className=" h-[200px] w-[200px] block mx-auto object-cover rounded-full border-2 border-transparent  bg-gray-900 p-1 shadow-md shadow-blue-500"
          />

          <div className="py-5 border border-gray-800 px-5 mt-5">
            <span className="block text-center text-lg font-semibold text-white">
              {userData?.firstName
                ? userData.firstName + " " + userData.lastName
                : "Loading..."}
            </span>
            <span className="block text-center text-lg font-semibold text-gray-500">
              {" "}
              - {userData?.username}
            </span>
            <div className="flex items-center justify-start gap-5">
              <p className="text-gray-400 ">
                Joined on - {formatDate(userData?.createdAt)}
              </p>
              <p className="bg-green-500 py-1 px-2 rounded ">
                {userData?.status}
              </p>
            </div>
          </div>
          </div>

          <div>
            <div className="py-5 mb-5">
              <h1 className="text-3xl mb-4 text-gray-500 font-semibold">
                Personal Details
              </h1>
              <div className=" flex items-center justify-start gap-3 flex-wrap ">
                <Info label={"E-mail"} value={userData?.email} />
                <Info label={"Contact"} value={userData?.phone} />
                <Info label={"Enrolled as"} value={userData?.role} />
                <Info label={"Address"} value={userData?.address} />
              </div>
            </div>
          </div>

        </div>

        <div className="py-5 mt-5 bg-gray-900 px-5 rounded-2xl">
           
            <div className="flex items-start justify-start gap-15">
            <div className="w-auto max-w-[300px] h-auto">
          <img
            src={authData?.companyLogo}
            alt={`${authData?.companyName}'s avatar`}
            className=" h-[200px] w-[200px] block mx-auto object-cover rounded-full border-2 border-transparent  bg-gray-900 p-1 shadow-md shadow-blue-500"
          />

          <div className="py-5 border border-gray-800 px-5 mt-5">
            <span className="block text-center text-lg font-semibold text-white">
              {authData?.companyName
                ? authData?.companyName
                : "Loading..."}
            </span>
            <span className="block text-center text-lg font-semibold text-gray-500">
              {" "}
              - {authData?.location}
            </span>
            <div className="flex items-center justify-start gap-5">
              <p className="text-gray-400 ">
                Joined on - {formatDate(authData?.createdAt)}
              </p>
              <p className="bg-green-500 py-1 px-2 rounded ">
                Hiring
              </p>
            </div>
          </div>

          <div className="mx-auto mt-5 w-fit">
            {authData?.companyWebsite ? (
                <a
                  href={authData.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Website
                </a>
              ) : (
                <span className="text-gray-500 italic">No Website Found</span>
              )}

          </div>
          </div>

          <div>
            <div className="py-5 mb-5 max-w-[900px]">
              <h1 className="text-3xl mb-4 text-gray-500 font-semibold">
                About the Company
              </h1>
              <div className=" flex items-center justify-start gap-3 flex-wrap ">
                <Info label={"E-mail"} value={authData?.companyEmail} />
                <Info label={"Contact Info"} value={authData?.contactNumber} />
                <Info label={"Industry"} value={authData?.industry} />
                <Info label={"Size"} value={authData?.companySize} />
                <Info label={"Location"} value={authData?.location} />
                <Info label={"About"} value={authData?.about} />
              </div>
            </div>
          </div>

             
            

        </div>

        </div>

        <div className="py-5 mt-5 bg-gray-900 px-5 rounded-2xl">
              <h1 className="text-3xl mb-4 text-gray-500 font-semibold">
                Posted Jobs 
              </h1>

              
        </div>

      </div>
  );
};

export default SingleAuth;
