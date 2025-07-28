import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seeker',
    required: true,
  }, 
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authority',
    required: true,
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  },
  currentPost: {
    type: String,
  },
  currentCTC: {
    type: String,
  },
  experienceLevel: {
    type: String, 
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  jobType: {
    type: String,
    enum:['Full-Time', 'Part-Time', 'Internship', 'Remote', 'Contract'],
    required:true
  },
   
});

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
