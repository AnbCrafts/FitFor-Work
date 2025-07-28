import mongoose from "mongoose";
 

const ApplicantSchema = new mongoose.Schema({
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
 
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Under Review', 'Accepted', 'Rejected'],
    default: 'Under Review',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps:true});

const Applicant = mongoose.models.Applicant || mongoose.model("Applicant", ApplicantSchema);

export default Applicant;
