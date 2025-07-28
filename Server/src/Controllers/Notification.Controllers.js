import Admin from "../Models/Admin.Models.js";
import Notification from "../Models/Notification.Models.js";
import User from "../Models/User.Models.js";

const getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({ success: false, message: "Provide User Id" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found for this id" });
    }

    const notifications = user.notifications;

    if (!notifications || notifications.length === 0) {
      return res.json({ success: false, message: "No notifications found for this user" });
    }

    return res.json({
      success: true,
      message: "Notifications found for this user",
      notifications,
    });

  } catch (error) {
    console.log("Error in getNotificationsByUserId:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};  
const createNotification = async (req, res) => {
  try {
    const { recipientId, title, type, recipientMail, subject } = req.body;
    const { adminId } = req.params;

    if (!adminId) {
      return res.json({ success: false, message: "Provide your ID, admin" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.json({ success: false, message: "Cannot find admin" });
    }

    if (!recipientId || !recipientMail || !title || !type || !subject) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(recipientId);
    if (!user) {
      return res.json({ success: false, message: "Cannot find user" });
    }

    const notification = new Notification({
      title,
      type,
      recipientId,
      isRead: false,
      createdAt: Date.now(),
      recipientMail,
      subject,
      sender: adminId,
    });

    await notification.save();

    await User.findByIdAndUpdate(recipientId, {
      $push: { notifications: notification._id },
    });

    await Admin.findByIdAndUpdate(adminId, {
      $push: { sentNotifications: notification._id },
    });

    return res.json({ success: true, message: "Notification sent successfully" });

  } catch (error) {
    console.error("Error in createNotification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
 const sendNotification = async ({ title, subject, type, metaData }) => {
  try {
    const notification = new Notification({ title, subject, type, metaData });
    await notification.save();
    console.log("✅ Notification sent");
  } catch (err) {
    console.error("❌ Notification error:", err.message);
  }
};
const getAllNotifications = async(req,res)=>{
  try {
    const notifications = await Notification.find({});
    if(notifications){
      return res.json({success:true,message:"Got all notifications", notifications});

    }else{
      return res.json({success:false,message:"Cannot get notifications"});

    }
  } catch (error) {
      return res.json({success:false,message:"Internal Sever Error"});
    
  }
}
const getAllNotificationsById = async(req,res)=>{
  try {
    const {notificationId} = req.params;

    const notification = await Notification.findById(notificationId);
    if(notification){
      return res.json({success:true,message:"Got all notification", notification});

    }else{
      return res.json({success:false,message:"Cannot get notifications"});

    }
  } catch (error) {
      return res.json({success:false,message:"Internal Sever Error"});
    
  }
}
const getNotificationByType = async (req, res) => {
  try {
    const { type } = req.params;

    const notifications = await Notification.find({ type: type }).sort({ createdAt: -1 });

    if (notifications.length > 0) {
      return res.status(200).json({
        success: true,
        message: `Found ${notifications.length} notification(s) for type - ${type}`,
        notifications
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `No notifications found for type - ${type}`
      });
    }

  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const sendFeedbackToAdmin = async (req, res) => {
  try {
    const {
      title,
      message,
      type,            // 'feedback' or 'complaint'
      category,        // 'bug', 'suggestion', 'inconvenience', etc.
      sender,          // User ID
      sendersMail,     // Email of sender
      recipientId,     // Admin ID (optional)
      recipientMail,   // Admin email (optional)
      attachments      // Array of URLs (optional)
    } = req.body;

    // Validate mandatory fields
    if (!title || !message || !type) {
      return res.status(400).json({
        success: false,
        message: "Title, message, and type are required."
      });
    }

    const notification = new Notification({
      title: title.trim(),
      message: message.trim(),
      type: type.toLowerCase(),
      category: category?.toLowerCase() || "other",
      sender,
      sendersMail,
      recipientId: recipientId || null,
      recipientMail: recipientMail || "",
      attachments: Array.isArray(attachments) ? attachments : [],
      isRead: false,
      status: "pending",
      metaData: {
        source: "UserSubmission"
      }
    });

    await notification.save();

    return res.status(201).json({
      success: true,
      message: `Your ${type.toLowerCase()} has been submitted to the admin.`,
      notification
    });
  } catch (error) {
    console.error("Error in sendFeedbackToAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};














export {getNotificationsByUserId,createNotification,sendNotification,getAllNotifications,getNotificationByType,getAllNotificationsById,sendFeedbackToAdmin};