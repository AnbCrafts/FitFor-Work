import mongoose from "mongoose";


const AuthoritySchema = new mongoose.Schema({
  
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  companyLogo:{
    type:String,
  },
  companyWebsite: {
    type: String,
    required:true
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+']
  },
  industry: {
    type: String
  },
  location: {
    type: String,
    required:true
  },
  contactNumber: {
    type: String,
    required:true
  },
  about: {
    type: String
  },

  preferredSkills: {
    type: [String]
  },
  preferredExperience: {
    type: Number,
    default:0
  },
  jobTypesOffered: {
    type: [String],
    enum: ['Office', 'Home', 'Remote']
  },
  jobs: [ 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }
],


  rejectedSeekers: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant' 
  }],
  SeekersToReview: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant'
  }],
  shortlistedSeekers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seeker'
  }],
  hiredSeekers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
}, {
  timestamps: true
});


const Authority = mongoose.models.Authority || mongoose.model("Authority", AuthoritySchema);

export default Authority;
