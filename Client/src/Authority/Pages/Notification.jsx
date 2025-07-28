import React from "react";
import { employerNotifications } from "../assets/NotificationDB";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { useEffect } from "react";
import {UserPlus} from 'lucide-react'


const Notification = () => {
  const {getNotifications_ByType,typeNotifications,convertToStandardDateTime} = useContext(WorkContext);
  const type = ["application"]

  useEffect(()=>{
    getNotifications_ByType(type)
  },[type])

  // useEffect(()=>{
  //   console.log("typeNotifications - ", typeNotifications)
  // },[typeNotifications])

  return (
    <div className="min-h-screen px-6 py-12 w-[90%] mx-auto text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
        📢 Employer Notifications
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        { typeNotifications && typeNotifications?.map((item,index) => (
          <div
            key={index}
            className={`border-l-4 ${
              item.isRead ? "border-gray-500" : "border-green-500"
            } bg-[#1e1e3f] p-5 rounded-xl shadow-md`}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="">
                <UserPlus className="h-10 w-10 p-1 rounded-full bg-green-500"/>
              </span>
              <h2 className="text-xl font-semibold">{item?.title}</h2>
            </div>
            <p className="text-gray-300 text-sm mb-3">{item?.subject}</p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {convertToStandardDateTime(item?.createdAt)}
              </p>
              <Link
                to={`${item._id}/read`}
                className="text-sm text-green-300 hover:underline font-medium"
              >
                {item.isRead?"":"View Notification"} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
