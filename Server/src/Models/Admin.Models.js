import mongoose from "mongoose";
import { ADMIN_PERMISSIONS } from "../Constants/Constant.js";

const AdminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  adminName: {
    type: String,
    required: true,
    unique: true
  },
  secretCode: {
    type: String,
    required: true
  },
  accessLevel: {
    type: String,
    enum: ["SuperAdmin", "Moderator", "Support"],
    default: "Moderator"
  },
  permissions: {
    type: [String],
    enum: ADMIN_PERMISSIONS,
    default: []
  },
  sentNotifications:[
    {type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
    }
  ]
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
