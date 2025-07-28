// src/database/NotificationDB.js

export const jobSeekerNotifications = [
    {
      id: 1,
      icon: "🎯",
      title: "New Job Match Found!",
      description: "5 jobs now match your skills and preferences.",
      timestamp: "2025-05-01T14:30:00Z",
      isRead: false,
      actionText: "View Jobs",
      actionLink: "/jobs/matched"
    },
    {
      id: 2,
      icon: "📩",
      title: "Application Viewed",
      description: "ABC Corp has viewed your application for Frontend Developer.",
      timestamp: "2025-04-30T11:10:00Z",
      isRead: true,
      actionText: "View Application",
      actionLink: "/applications/abc-corp"
    },
    {
      id: 3,
      icon: "📅",
      title: "Interview Invitation",
      description: "XYZ Ltd invited you for an interview for the Backend Developer role.",
      timestamp: "2025-04-29T17:45:00Z",
      isRead: false,
      actionText: "Respond Now",
      actionLink: "/interviews/xyz-ltd"
    },
    {
      id: 4,
      icon: "🚫",
      title: "Application Rejected",
      description: "Unfortunately, your application to ByteForce was not shortlisted.",
      timestamp: "2025-04-28T09:15:00Z",
      isRead: true,
      actionText: "View Feedback",
      actionLink: "/applications/byteforce"
    },
    {
      id: 5,
      icon: "⚠️",
      title: "Complete Your Profile",
      description: "Update your resume to get better job matches.",
      timestamp: "2025-04-27T16:00:00Z",
      isRead: false,
      actionText: "Update Now",
      actionLink: "/profile"
    },
    {
      id: 6,
      icon: "📢",
      title: "New Resume Builder Tool",
      description: "Build a professional resume in minutes with our new tool.",
      timestamp: "2025-04-26T08:20:00Z",
      isRead: false,
      actionText: "Try It",
      actionLink: "/tools/resume-builder"
    }
  ];
// export {jobSeekerNotifications}  