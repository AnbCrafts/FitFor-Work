import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String, 
            required:true,
            unique:true,
        }, 
        firstName: {
            type: String,
            required: true,
        }, 
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique:true
        }, 
        picture: { 
            type: String,
            default: "", 
            required:true, 
        },
        address: {
            type: String,
            required: true,
        },
       
        password: {
            type: String,
            required: true,
        }, 
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive", "Blocked"],
        },
        role:{
            type: String,
            default: "Seeker",
            enum: ["Seeker", "Authority", "Admin"],
            required:true 
        },
        
  
    }, 
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
  