import React from "react";
import { jobSeekerNotifications } from "../assets/NotificationDB";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <div className="min-h-screen px-6 py-12 w-[90%] mx-auto text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
        🔔 Your Notifications
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {jobSeekerNotifications.map((item) => (
          <div
            key={item.id}
            className={`border-l-4 ${
              item.isRead ? "border-gray-500" : "border-indigo-500"
            } bg-[#1e1e3f] p-5 rounded-xl shadow-md`}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl">{item.icon}</span>
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-gray-300 text-sm mb-3">{item.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </p>
              <Link
                to={item.actionLink}
                className="text-sm text-indigo-300 hover:underline font-medium"
              >
                {item.actionText} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
