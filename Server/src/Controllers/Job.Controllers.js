import validator from 'validator';
import Authority from '../Models/Authority.Models.js';
import Job from '../Models/Job.Models.js';
import mongoose from 'mongoose';
import Seeker from '../Models/Seeker.Models.js';
import Applicant from '../Models/Applicant.Models.js';
import { sendNotification } from './Notification.Controllers.js';



const createJob = async (req, res) => {
  try {
    const {
      category,
      title,
      jobRole,
      description,
      skillsRequired,
      experienceRequired,
      jobType,
      salaryRange,
      location,
      postedBy,
      status,
      totalSeats,
      deadline,
    } = req.body;



    if (
      !title ||
      !description ||
      !skillsRequired || 
      !experienceRequired ||
      !jobType ||
      !location ||
      !postedBy ||
      !deadline ||
      !totalSeats||
      !jobRole
    ) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(postedBy)) {
      return res.status(400).json({ success: false, message: "Invalid authority ID" });
    }

    const authority = await Authority.findById(postedBy);
    if (!authority) {
      return res.status(404).json({ success: false, message: "Authority not found" });
    }

    const existingJob = await Job.findOne({
      title: title.trim(),
      location: location.trim(),
      postedBy,
      jobRole
    });

    if (existingJob) {
      return res.json({ success: false, message: "This job has already been posted" });
    }

    const newJob = new Job({
      title,
      totalSeats,
      description,
      skillsRequired,
      experienceRequired,
      jobType,
      salaryRange,
      location,
      postedBy,
      deadline,
      status,
      jobRole ,category
    });

    

    await newJob.save();

    authority.jobs.push(newJob._id);

    
    const existingSkills = authority.preferredSkills.map(skill => skill.trim().toLowerCase());

newJob.skillsRequired.forEach(skill => {
  const normalizedSkill = skill.trim().toLowerCase();
  if (!existingSkills.includes(normalizedSkill)) {
    authority.preferredSkills.push(skill.trim());
  }
});

await authority.save();

   


    
   
    return res.status(201).json({
      success: true,
      message: "Job posted successfully and sent the notification to all seeker",
      job: newJob,
    });
  } catch (error) {
    console.error("Error in createJob:", error);
    return res.status(500).json({ success: false, message: "An unexpected error occurred" });
  }
};
const getAllJobs = async(req,res)=>{
    try {
        const jobs = await Job.find({});
        if(!jobs || !jobs.length>0){
            return res.json({ success: false, message: "No Jobs found" })
        }
        return res.json({ success: true, message: "got all jobs" ,jobs})

        
    } catch (error) {
        console.log(error)
            return res.json({ success: false, message: "Something error occurred" })

    }
}
const getJobById = async(req,res)=>{
    try {
        const {jobId} = req.params;
        if(!jobId){
            return res.json({ success: false, message: "Cannot get Job Id" }) 
        }

        const job = await Job.findById(jobId);
        if(!job){
            return res.json({ success: false, message: "No Job found for this id" })
        }
        return res.json({ success: true, message: "got the job for this id" ,job})

        
    } catch (error) {
        console.log(error)
            return res.json({ success: false, message: "Something error occurred" })

    }
}
const removeJob = async(req,res)=>{
    try {
        const {jobId} = req.params;
        if(!jobId){
            return res.json({ success: false, message: "Cannot get Job Id" }) 
        }
        const job = await Job.findByIdAndDelete(jobId);
        if(!job){
            return res.json({ success: false, message: "No Job found for this id to delete" })
        }
        return res.json({ success: true, message: "deleted the job for this id" })

        
    } catch (error) {
        console.log(error)
            return res.json({ success: false, message: "Something error occurred" })

    }
}
const getAllJobsByAuthorityId = async (req, res) => {
  try {
    const { AuthId } = req.params;

    if (!AuthId) {
      return res.status(400).json({ success: false, message: "Authority Id is required" });
    }

    const jobs = await Job.find({ postedBy: AuthId });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No Jobs found for this ID" });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all jobs for this authority",
      jobs
    });

  } catch (error) {
    console.error("Error fetching jobs by authority ID:", error);
    return res.status(500).json({ success: false, message: "Server error occurred" });
  }
};
const applyForJob = async (req, res) => {
  try {
    const { jobId, seekerId } = req.params;

    // 1. Validate job and seeker existence
    const job = await Job.findById(jobId).populate("postedBy");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const seeker = await Seeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({ success: false, message: "Seeker not found" });
    }

    if(job.totalSeats<=0){
      return res.status(400).json({ success: false, message: "No seats available for this job post" });
    }
    if(job.deadline < Date.now()){
      return res.status(400).json({ success: false, message: "You are out of time" });
    }

    // 2. Check if already applied 
    const alreadyApplied = await Applicant.findOne({ job: jobId, seeker: seekerId });
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "Already applied for this job" });
    }

    // 3. Create new applicant
    const newApplicant = new Applicant({
      jobId: jobId,
      seekerId: seekerId,
      companyId: job.postedBy,  // Assuming postedBy is authority's _id
      status: 'Under Review'
    }); 

    await newApplicant.save();

    // 4. Push to authority's review list
    await Authority.findByIdAndUpdate(job.postedBy, {
      $push: { SeekersToReview: newApplicant._id }
    });
    await Seeker.findByIdAndUpdate(seekerId, {
  $addToSet: { appliedFor: jobId }  // use $addToSet to avoid duplicates
}, { new: true });

    // 5. Optional: Push to Job model's applicants list if maintained
    await Job.findByIdAndUpdate(jobId, {
      $push: { applicants: newApplicant._id }
    });
    await job.save();
    await seeker.save();

    
const sub = `An application has been received for the ${job.jobRole} role posted at ${job.location}. You may review and shortlist the candidate based on their qualifications.`;

  
    await sendNotification({
  title: "Applied for Job",
  subject: sub,
  type: "application",
 metaData: {
  job: {
    id: job._id,
    
  },
  seeker: {
    id:seeker._id,
  },
  applicant:{
    id:newApplicant._id
  }
}


   })

   








    return res.status(200).json({ success: true, message: "Applied successfully", applicantId: newApplicant._id });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  } 
};
const saveJob = async (req, res) => {
  try {
    const { jobId, seekerId } = req.params;

    if (!seekerId || !jobId) {
      return res.status(400).json({ success: false, message: "Seeker ID and Job ID are required." });
    }

    const seeker = await Seeker.findById(seekerId);
    const job = await Job.findById(jobId);

    if (!seeker) {
      return res.status(404).json({ success: false, message: "Seeker not found." });
    }

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    // Check if already saved
    const alreadySaved = seeker.savedJobs.includes(jobId);

    if (alreadySaved) {
      return res.status(400).json({ success: false, message: "Job already saved." });
    }

    // Save the job
    seeker.savedJobs.push(jobId);
    await seeker.save();

    return res.status(200).json({ success: true, message: "Job saved successfully." });

  } catch (error) {
    console.error("Error in saveJob:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const getSavedJobBySeekerId = async (req, res) => {
  try {
    const { seekerId } = req.params;

    if (!seekerId) {
      return res.status(400).json({
        success: false,
        message: "Seeker ID is required."
      });
    }

    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "Seeker not found."
      });
    }

    const savedJobs = seeker.savedJobs;

    if (!savedJobs || savedJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No saved jobs found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Jobs found.",
      savedJobs
    });

  } catch (error) {
    console.error("Error in getSavedJobBySeekerId:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};
const getCustomizedJobs = async (req, res) => {
  try {
    const {
      skills,
      location,
      jobType,
      jobRole,
      minExperience,
      authorityId,
      category,
      sortBy,
      status,
    } = req.query;

    let filter = {};

    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      filter.skillsRequired = { $in: skillsArray };
    }

    if (location) {
      filter.location = location;
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (jobRole) {
      filter.jobRole = jobRole;
    }

    if (minExperience) {
      // Assuming experience is stored as a number-like string e.g. "2", "3"
      filter.experienceRequired = { $gte: minExperience };
    }

    if (authorityId) {
      filter.postedBy = authorityId;
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    let sort = {};
    if (sortBy === "applicants") sort = { applicants: -1 };
    else if (sortBy === "deadline") sort = { deadline: 1 };
    else if (sortBy === "vacancies") sort = { totalSeats: -1 };
    else if (sortBy === "createdAt") sort = { createdAt: -1 };

    let jobs = await Job.find(filter)
      .populate("postedBy", "companyName industry") 
      .populate("applicants") 
      .sort(sort);

      if (minExperience) {
  const minExp = parseInt(minExperience);
  jobs = jobs.filter(job => {
    const match = job.experienceRequired.match(/\d+/);
    if (!match) return false;
    const jobExp = parseInt(match[0]);
    return jobExp >= minExp;
  });
}

    return res.status(200).json({
      success: true,
      message: "Filtered job list fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error in getCustomizedJobs:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getAllRequirements = async (req, res) => {
  try {
    const jobs = await Job.find({});

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    const uniqueSkills = new Set();
    const uniqueExperiences = new Set();
    const uniqueJobTypes = new Set();
    const uniqueRoles = new Set();
    const uniqueSalaryRanges = new Set();
    const uniqueLocations = new Set();
    const uniqueCategories = new Set();
    const uniqueOwnerIds = new Set();

    jobs.forEach(job => {
      if (Array.isArray(job.skillsRequired)) {
        job.skillsRequired.forEach(skill => uniqueSkills.add(skill));
      }
      if (job.experienceRequired) uniqueExperiences.add(job.experienceRequired);
      if (job.jobType) uniqueJobTypes.add(job.jobType);
      if (job.jobRole) uniqueRoles.add(job.jobRole);
      if (job.salaryRange) uniqueSalaryRanges.add(job.salaryRange);
      if (job.location) uniqueLocations.add(job.location);
      if (job.category) uniqueCategories.add(job.category);
      if (job.postedBy) uniqueOwnerIds.add(job.postedBy.toString());
    });

    const uniqueOwners = await Authority.find({
      _id: { $in: Array.from(uniqueOwnerIds) }
    }).select("companyName industry _id");

    return res.json({
      success: true,
      message: "Got the categories",
      categories: {
        skills: Array.from(uniqueSkills),
        salary: Array.from(uniqueSalaryRanges),
        jobType: Array.from(uniqueJobTypes),
        roles: Array.from(uniqueRoles),
        experience: Array.from(uniqueExperiences),
        location: Array.from(uniqueLocations),
        category: Array.from(uniqueCategories),
        owners: uniqueOwners,
        ownerIds: Array.from(uniqueOwnerIds)
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

 




export {createJob,getAllJobs,getJobById,removeJob,getAllJobsByAuthorityId,applyForJob,saveJob,getSavedJobBySeekerId,getCustomizedJobs,getAllRequirements}