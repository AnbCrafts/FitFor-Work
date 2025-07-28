import mongoose from "mongoose";
import { DB_NAME } from "../Constants/Constant.js";

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_CONNECTION_STRING;
    const db_name = DB_NAME;

    // ✅ First connect to the DB
    const connectionInstance = await mongoose.connect(`${url}/${db_name}`);
    console.log("✅ Connected to DB SUCCESSFULLY!!");
    console.log(`🔗 Host: ${connectionInstance.connection.host}\n`);

    // ✅ Now drop the index (only once!)
    try {
      await mongoose.connection.collection("authorities").dropIndex("notifications.id_1");
      console.log("🧹 Index 'notifications.id_1' dropped successfully.");
    } catch (err) {
      if (err.codeName === "IndexNotFound") {
        console.log("⚠️ Index already removed or not found.");
      } else {
        throw err;
      }
    }

    // ✅ Check if specific user exists in 'users' collection
    const ObjectId = mongoose.Types.ObjectId;
    const userIdToCheck = new ObjectId("6881f4c78b859887f84a9b2d");

    const user = await mongoose.connection.collection("users").findOne({ _id: userIdToCheck });

    if (user) {
      console.log("✅ User found:", user._id.toString(), "-", user.name || "No name field");
    } else {
      console.log("❌ User with ID 6881f4c78b859887f84a9b2d not found in 'users' collection.");
    }

  } catch (error) {
    console.log("❌ Error while connecting to DB or running post-connection tasks:", error);
  }
};

export default connectDB;
