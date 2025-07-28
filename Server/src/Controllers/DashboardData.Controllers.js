import Seeker from "../Models/Seeker.Models.js";
import Job from "../Models/Job.Models.js";

const getSuggestedJobsForSeeker = async (req, res) => {
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

    const seekerDetails = {
      skills: seeker.skills,
      location: seeker.preferredLocation,
      jobType: seeker.preferredJobType,
      experience: seeker.experience,
      role: seeker.desiredPost,
    };

    const suggestedJobs = await Job.find({
      status: "Open",
      $or: [
        { location: seekerDetails.location },
        { jobType: seekerDetails.jobType },
        { jobRole: { $regex: seekerDetails.role, $options: "i" } },
        { skillsRequired: { $in: seekerDetails.skills } },
        { experienceRequired: { $regex: seekerDetails.experience.toString(), $options: "i" } }
      ]
    })
    .select("title description location jobType jobRole _id") // 👈 Only include these fields
    .limit(20);

    return res.status(200).json({
      success: true,
      totalMatches: suggestedJobs.length,
      suggestedJobs,
    });
  } catch (error) {
    console.error("Error in getSuggestedJobsForSeeker:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export { getSuggestedJobsForSeeker };
