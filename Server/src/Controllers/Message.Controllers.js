import mongoose from "mongoose";
import Message from "../Models/Message.Models.js";

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      content,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, message: "Sender and receiver IDs are required" });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const getAllPings = async (req, res) => {
  try {
    const { receiverId } = req.params;

   const uniqueSenders = await Message.aggregate([
  { $match: { receiverId: new mongoose.Types.ObjectId(receiverId) } },
  { $sort: { createdAt: -1 } },
  {
    $group: {
      _id: "$senderId",
      lastMessage: { $first: "$content" },
      lastTimestamp: { $first: "$createdAt" },
      unreadCount: {
        $sum: {
          $cond: [{ $eq: ["$read", false] }, 1, 0]
        }
      }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "userInfo"
    }
  },
  { $unwind: "$userInfo" },
  {
    $project: {
      _id: 0,
      senderId: "$_id",
      name: "$userInfo.username",
      email: "$userInfo.email",
      picture: "$userInfo.picture",
      lastMessage: 1,
      lastTimestamp: 1,
      unreadCount: 1
    }
  },
  { $sort: { lastTimestamp: -1 } }
]);


    res.json({ success: true, users: uniqueSenders ,receiverId});

  } catch (err) {
    console.error("Error fetching sender list", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const readMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    await Message.updateMany(
      {
        senderId,
        receiverId,
        isRead: false,
      },
      {
        $set: { isRead: true },
      }
    );

    res.json({ success: true, message: "Messages marked as read." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export {sendMessage,getMessages,getAllPings,readMessages}