import mongoose from "mongoose";

const SeekerSchema = new mongoose.Schema(
    { 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
          },
        appliedFor: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
             
          }],
        savedJobs: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
             
          }],
        offeredJobs: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
             
          }],
        rejectedApplications: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
             
          }],
        
        desiredPost: {
            type: String,
            required: true,
        },
        status:{
            type:String,
            default:"Fresher",
            enum:["Fresher","Experienced"],
            required:true
        },
        skills: {
            type: [String],
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: "At least one skill is required"
            }
        },
        experience:{
            type:Number,
            default:0,
        },
        qualifications:{
            type:String,
            required:true,
            
        },
        resume:{
            type:String,
        },
        preferredLocation:{
            type:String,
            required:true,
        },
        preferredJobType:{
            type:String,
            required:true,
            default:"Office",
            enum:["Office","Home","Remote"]
        },
        availableFrom:{
            type:Date,
            default: Date.now(),
            
        },
        currentCompany:{
            type:String,
            default:"None",
            

        },
        currentPost:{
            type:String,
            default:"None"
        },
        currentCTC:{
            type:Number,
            default:0
        },
        expectedCTC:{
            type:Number,
            default:0
        },
        portfolioLink:{
            type:String,

        },
        certifications:{
            type:[String],

        },
        languagesKnown:{
            type:[String],
            required:true,
            
        },
        achievements:{
            type:[String],
            
        },

    }, 
 
    {
        timestamps: true
    }
);
 
const Seeker = mongoose.models.Seeker || mongoose.model("Seeker", SeekerSchema);

export default Seeker;