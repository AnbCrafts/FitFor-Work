import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["system", "user", "feedback", "complaint", "announcement"],
    },

    category: {
      type: String,
      trim: true,
      enum: ["feedback", "complaint", "bug", "suggestion", "other"],
      default: "other",
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sendersMail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    recipientMail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "in-review", "resolved", "closed"],
      default: "pending",
    },

    attachments: {
      type: [String],
      default: [],
    },

    metaData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;
