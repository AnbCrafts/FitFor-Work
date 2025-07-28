import Seeker from "../Models/Seeker.Models.js";
import Applicant from "../Models/Applicant.Models.js";
import User from "../Models/User.Models.js";
import Job from "../Models/Job.Models.js";
import Authority from "../Models/Authority.Models.js";

const getApplicationStatus = async (req, res) => {
  try {
    const { seekerId } = req.params;

    if (!seekerId) {
      return res.status(400).json({
        success: false,
        message: "Seeker ID is required.",
      });
    }

    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "Seeker not found.",
      });
    }

    const applied = seeker.appliedFor?.length || 0;
    const viewed = seeker.savedJobs?.length || 0;

    // Simulating static numbers for other categories until real data exists
    const rejected =seeker.rejectedApplications.length || Math.floor(applied * 0.1) ; // 20% rejected for now
    const offered =  seeker.offeredJobs.length || Math.floor(applied * 0.2); // 10% offered for now

    return res.status(200).json({
      success: true,
      data: {
        Applied: applied,
        Viewed: viewed,
        Rejected: rejected,
        Offered: offered,
      },
    });
  } catch (error) {
    console.error("Error in getApplicationStatus:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching application status.",
    });
  }
};
const getApplicationStatusByDate = async (req, res) => {
  try {
    const { seekerId } = req.params;

    if (!seekerId) {
      return res.status(400).json({
        success: false,
        message: "Seeker ID is required.",
      });
    }
    const applicant = await Applicant.find({seekerId:seekerId});
    if(!applicant || applicant.length<0){
      return res.status(404).json({
        success: false,
        message: "Applicant not found.",
      });
    }
    if(applicant.length===0){
      return res.status(404).json({
        success: false,
        message: "No Applicant found ,array was empty",
      });
    }

   
    const dateCounts = {};

    applicant.forEach((item) => {
      const appliedDate = new Date(item.appliedAt).toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
      if (dateCounts[appliedDate]) {
        dateCounts[appliedDate]++;
      } else {
        dateCounts[appliedDate] = 1;
      }
    });

    // Convert to array format for chart
    const result = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in getApplicationStatusByDate:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
const getApplicationStatusByJobCategory = async (req, res) => {
  try {
    const { seekerId } = req.params;

    if (!seekerId) {
      return res.status(400).json({
        success: false,
        message: "Seeker ID is required.",
      });
    }

    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "Seeker not found for this ID.",
      });
    }

    const jobIds = seeker.appliedFor.map((item) => {
      return item.job ? item.job : item; // handle both object or direct ID
    });

    const jobs = await Promise.all(
      jobIds.map((id) => Job.findById(id).select("category"))
    );

    const categoryCounts = {};

    jobs.forEach((job) => {
      if (!job || !job.category) return;
      const category = job.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const result = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in getApplicationStatusByJobCategory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
const getApplicationStatusByJobLocation = async (req, res) => {
  try {
    const { seekerId } = req.params;

    if (!seekerId) {
      return res.status(400).json({
        success: false,
        message: "Seeker ID is required.",
      });
    }

    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "Seeker not found for this ID.",
      });
    }

    const jobIds = seeker.appliedFor.map((item) =>
      item.job ? item.job : item
    );

    const jobs = await Promise.all(
      jobIds.map((id) => Job.findById(id).select("location")) // ✅ select location
    );

    const locationCounts = {};

    jobs.forEach((job) => {
      if (!job || !job.location) return;
      const location = job.location;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    const result = Object.entries(locationCounts).map(([location, count]) => ({
      location,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in getApplicationStatusByJobLocation:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
const calculateProfileCompletion = async (seeker) => {
  let score = 0;
  const brief = {
    basicInfo: 0,
    desiredPostAndStatus: 0,
    skills: 0,
    experienceAndCurrent: 0,
    qualifications: 0,
    certifications: 0,
    resume: 0,
    preferences: 0,
    portfolioLink: 0,
    languagesKnown: 0,
    achievements: 0,
  };

  const user = await User.findById(seeker.userId);
  if (user?.firstName && user?.lastName && user?.email) {
    score += 10;
    brief.basicInfo = 10;
  }

  if (seeker.desiredPost && seeker.status) {
    score += 10;
    brief.desiredPostAndStatus = 10;
  }

  if (seeker.skills && seeker.skills.length > 0) {
    score += 10;
    brief.skills = 10;
  }

  if (
    seeker.experience > 0 ||
    seeker.currentPost !== "None" ||
    seeker.currentCompany !== "None"
  ) {
    score += 10;
    brief.experienceAndCurrent = 10;
  }

  if (seeker.qualifications) {
    score += 5;
    brief.qualifications = 5;
  }

  if (seeker.certifications && seeker.certifications.length > 0) {
    score += 5;
    brief.certifications = 5;
  }

  if (seeker.resume) {
    score += 10;
    brief.resume = 10;
  }

  if (
    seeker.preferredLocation &&
    seeker.preferredJobType &&
    seeker.availableFrom
  ) {
    score += 10;
    brief.preferences = 10;
  }

  if (seeker.portfolioLink) {
    score += 10;
    brief.portfolioLink = 10;
  }

  if (seeker.languagesKnown && seeker.languagesKnown.length > 0) {
    score += 10;
    brief.languagesKnown = 10;
  }

  if (seeker.achievements && seeker.achievements.length > 0) {
    score += 10;
    brief.achievements = 10;
  }

  return { score, brief };
};
const getProfileGrade = async (req, res) => {
  try {
    const { seekerId } = req.params;

    if (!seekerId) {
      return res.status(400).json({
        success: false,
        message: "Seeker ID is required.",
      });
    }

    const seeker = await Seeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "Seeker not found for this ID.",
      });
    }

    // Destructure score and brief from the helper
    const { score, brief } = await calculateProfileCompletion(seeker);

    return res.status(200).json({
      success: true,
      data: score,  // This is the profile completion score
      brief         // This is the object with individual scores
    });

  } catch (error) {
    console.error("Error in getProfileGrade:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


// Authority GRAPHS

const getApplicationCountPerJob = async (req, res) => {
  try {
    const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({ success: false, message: "Authority ID is required" });
    }

    const authority = await Authority.findById(authId);
    if (!authority) {
      return res.status(404).json({ success: false, message: "Authority not found" });
    }

    const jobs = authority.jobs;

    // Collect counts for each job
    const results = await Promise.all(
      jobs.map(async (jobId) => {
        const job = await Job.findById(jobId).select("title applicants");

        if (!job) return null;

        return {
          title: job.title,
          count: job.applicants?.length || 0,
        };
      })
    );

    // Filter out any null results (e.g., deleted jobs)
    const filteredResults = results.filter(Boolean);

    return res.status(200).json({
      success: true,
      data: filteredResults,
    });
  } catch (error) {
    console.error("Error in getApplicationCountPerJob:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getWeeklyApplicationStats = async (req, res) => {
  try {
    const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "authId is required.",
      });
    }

    const authority = await Authority.findById(authId).select("jobs");
    if (!authority) {
      return res.status(404).json({
        success: false,
        message: "Authority not found.",
      });
    }

    const jobs = authority.jobs;

    // Get all applicants related to authority's jobs
    const allApplicants = await Applicant.find({
      jobId: { $in: jobs },
    }).select("appliedAt");

    const dateCounts = {};

    allApplicants.forEach((item) => {
      const appliedDate = new Date(item.appliedAt).toISOString().split("T")[0]; // 'YYYY-MM-DD'
      if (dateCounts[appliedDate]) {
        dateCounts[appliedDate]++;
      } else {
        dateCounts[appliedDate] = 1;
      }
    });

    // Convert to array format for graph
    const result = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in getWeeklyApplicationStats:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
const getAllApplicantStatus = async(req,res)=>{
    try {
      const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "authId is required.",
      });
    }

    const authority = await Authority.findById(authId);
    if (!authority) {
      return res.status(404).json({
        success: false,
        message: "Authority not found.",
      });
    }

    const viewed = authority.SeekersToReview.length;
    const shortlisted  = authority.shortlistedSeekers.length;
    const rejected = authority.rejectedSeekers.length;
    const hired = authority.hiredSeekers.length;

    return res.json({
      success:true,
      data:{
        viewed,
        shortlisted,
        rejected,
        hired
      }
    })



      
    } catch (error) {
      console.log(error);
      return res.json({success:false,message:"Internal Server Error"})
    }
}
const getApplicationsByLocations = async (req, res) => {
  try {
    const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "authId is required.",
      });
    }

    const authority = await Authority.findById(authId).select("jobs");
    if (!authority) {
      return res.status(404).json({
        success: false,
        message: "Authority not found.",
      });
    }

    const jobs = await Job.find({ _id: { $in: authority.jobs } }).select("location _id");

    // Create map to count applicants by location
    const locationCounts = {};

    for (const job of jobs) {
      const applicants = await Applicant.countDocuments({ jobId: job._id });
      if (locationCounts[job.location]) {
        locationCounts[job.location] += applicants;
      } else {
        locationCounts[job.location] = applicants;
      }
    }

    // Convert to array format
    const result = Object.entries(locationCounts).map(([location, count]) => ({
      location,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in getApplicationsByLocations:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getApplicationsByJobRole = async (req, res) => {
  try {
    const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "authId is required.",
      });
    }

    // Get all job IDs posted by this authority
    const authority = await Authority.findById(authId).select("jobs");
    if (!authority || !authority.jobs || authority.jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this authority.",
      });
    }

    // Step 1: Fetch jobRole for each job
    const jobs = await Job.find({ _id: { $in: authority.jobs } }).select("jobRole");

    // Create a map of jobId => jobRole
    const jobRoleMap = {};
    jobs.forEach(job => {
      jobRoleMap[job._id.toString()] = job.jobRole;
    });

    // Step 2: Aggregate applicants and group by jobId
    const applicantCounts = await Applicant.aggregate([
      {
        $match: {
          jobId: { $in: authority.jobs },
        },
      },
      {
        $group: {
          _id: "$jobId",
          count: { $sum: 1 },
        },
      },
    ]);

    // Step 3: Accumulate by jobRole
    const roleCounts = {};

    for (const item of applicantCounts) {
      const jobId = item._id.toString();
      const role = jobRoleMap[jobId] || "Unknown";
      roleCounts[role] = (roleCounts[role] || 0) + item.count;
    }

    const result = Object.entries(roleCounts).map(([role, count]) => ({
      role,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Error in getApplicationsByJobRole:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getApplicationsByJobType = async (req, res) => {
  try {
    const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "authId is required.",
      });
    }

    // Step 1: Get all job IDs posted by the authority
    const authority = await Authority.findById(authId).select("jobs");
    if (!authority || !authority.jobs || authority.jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this authority.",
      });
    }

    // Define all job types supported
    const ALL_JOB_TYPES = ["Full-Time", "Part-Time", "Internship", "Remote", "Contract"];

    // Step 2: Fetch jobType for each job
    const jobs = await Job.find({ _id: { $in: authority.jobs } }).select("jobType");

    // Create a map: jobId => jobType
    const jobTypeMap = {};
    jobs.forEach(job => {
      jobTypeMap[job._id.toString()] = job.jobType;
    });

    // Step 3: Aggregate applicants grouped by jobId
    const applicantCounts = await Applicant.aggregate([
      {
        $match: {
          jobId: { $in: authority.jobs },
        },
      },
      {
        $group: {
          _id: "$jobId",
          count: { $sum: 1 },
        },
      },
    ]);

    // Step 4: Initialize all job types to 0
    const jobTypeCounts = {};
    ALL_JOB_TYPES.forEach(type => {
      jobTypeCounts[type] = 0;
    });

    // Step 5: Add counts based on actual data
    for (const item of applicantCounts) {
      const jobId = item._id.toString();
      const type = jobTypeMap[jobId] || "Unknown";
      jobTypeCounts[type] = (jobTypeCounts[type] || 0) + item.count;
    }

    // Step 6: Convert to array format
    const result = Object.entries(jobTypeCounts).map(([type, count]) => ({
      type,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Error in getApplicationsByJobType:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getApplicationsByJobCategory = async (req, res) => {
  try {
    const { authId } = req.params;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "authId is required.",
      });
    }

    // Step 1: Get all job IDs posted by this employer
    const authority = await Authority.findById(authId).select("jobs");
    if (!authority || !authority.jobs || authority.jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this authority.",
      });
    }

    // Step 2: Fetch category of each job
    const jobs = await Job.find({ _id: { $in: authority.jobs } }).select("category");

    // Map jobId => category
    const jobCategoryMap = {};
    jobs.forEach(job => {
      jobCategoryMap[job._id.toString()] = job.category;
    });

    // Step 3: Aggregate applicants grouped by jobId
    const applicantCounts = await Applicant.aggregate([
      {
        $match: {
          jobId: { $in: authority.jobs },
        },
      },
      {
        $group: {
          _id: "$jobId",
          count: { $sum: 1 },
        },
      },
    ]);

    // Step 4: Map applicant counts to categories
    const categoryCounts = {};
    for (const item of applicantCounts) {
      const jobId = item._id.toString();
      const category = jobCategoryMap[jobId] || "Unknown";
      categoryCounts[category] = (categoryCounts[category] || 0) + item.count;
    }

    // Step 5: Format result for charts
    const result = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    }));

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in getApplicationsByJobCategory:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

 










export {getApplicationStatus,getApplicationStatusByDate,getApplicationStatusByJobCategory,getApplicationStatusByJobLocation,getProfileGrade,getApplicationCountPerJob,getWeeklyApplicationStats,getAllApplicantStatus,getApplicationsByLocations,getApplicationsByJobRole,
  getApplicationsByJobCategory,
  getApplicationsByJobType
}



