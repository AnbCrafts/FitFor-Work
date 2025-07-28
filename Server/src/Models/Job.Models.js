import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  
    title: { 
    type: String, 
    required: true,
    trim: true
  }, 
  description: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: [String],
    required: true
  },
  experienceRequired: {
    type: String, 
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Remote', 'Contract','Hybrid'],
    required: true
  },
  jobRole:{
    type:String,
    required:true, 
  },
  salaryRange: {
    type: String 
  },
  location: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authority',
    required: true
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant'
  }], 
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }], 
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  },
  totalSeats:{
    type:Number,
    default:0,
    required:true
  },
  category:{
    type:String,
    required:true
  }
});  

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;

