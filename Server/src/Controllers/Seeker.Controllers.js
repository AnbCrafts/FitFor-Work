import validator from 'validator';
import Seeker from '../Models/Seeker.Models.js';
import User from "../Models/User.Models.js";
import Notification from "../Models/Notification.Models.js";
import { uploadOnCloudinary } from '../Utils/CloudConfig.Utils.js';
import fs from 'fs'
import Job from '../Models/Job.Models.js';
import Authority from '../Models/Authority.Models.js';


const createProfile = async (req, res) => {
    const toArray = (value) => {
        if (Array.isArray(value)) return value;
        if (typeof value === "string") return value.split(",").map(v => v.trim());
        return [];
    };

    try {


        const {
            userId,
            desiredPost,
            status,
            skills,
            experience,
            qualifications,
            preferredLocation,
            preferredJobType,
            availableFrom,
            currentCompany,
            currentPost,
            currentCTC,
            expectedCTC,
            portfolioLink,
            certifications,
            languagesKnown,
            achievements,
            resume
        } = req.body;

        const resumePath = req.file?.path;
        let uploadedResume = "";
        if (resumePath) {
         uploadedResume= await uploadOnCloudinary(resumePath);
            if (!uploadedResume) {
                return res.status(500).json({ error: "Failed to upload resume to Cloudinary." });
            }
    
            fs.unlinkSync(resumePath)
        }



        if (!userId || !desiredPost || !status || !skills || skills.length === 0 || !qualifications || !preferredLocation || !preferredJobType || !languagesKnown) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const validUser = await User.findById(userId);
        if (!validUser) {
            return res.json({ success: false, message: "You need to create an account first" })
        }

        const newSeeker = new Seeker({
            userId,
            desiredPost,
            status,
            skills: toArray(skills),
            experience: Number(experience),
            qualifications,
            resume: uploadedResume.secure_url ||"",
            preferredLocation,
            preferredJobType,
            availableFrom,
            currentCompany,
            currentPost,
            currentCTC: Number(currentCTC),
            expectedCTC: Number(expectedCTC),
            portfolioLink,
            certifications: toArray(certifications),
            languagesKnown: toArray(languagesKnown),
            achievements: toArray(achievements),
        });

        await newSeeker.save();



        return res.json({ success: true, message: "Your profile was successfully created", newSeeker })





    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Something error occurred" })
    }

}
const getAllSeekers = async (req, res) => {
    try {
        const seeker = await Seeker.find({});
        if (!seeker) {
            return res.json({ success: false, message: "Cannot find seekers" })

        }
        if (!seeker.length > 0) {
            return res.json({ success: false, message: "no seekers found" })

        }
        return res.json({ success: true, message: "Found all the Seekers", seeker });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something error occurred" })
    }
}
const getSeekerById = async (req, res) => {
    try {
        const { seekerId } = req.params;
        if (!seekerId) {
            return res.json({ success: false, message: "Cannot get seeker id" })
        }
        const seeker = await Seeker.findById(seekerId);
        if (!seeker) {
            return res.json({ success: false, message: "Cannot find seeker with this id" })

        }

        return res.json({ success: true, message: "Found  the Seeker for this id", seeker });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something error occurred" })
    }
}
const getSeekerByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.json({ success: false, message: "Cannot get userId id" })
        }


        const seeker = await Seeker.findOne({ userId: userId });
        if (!seeker) {
            return res.json({ success: false, message: "Cannot find seeker with this id" })

        }

        return res.json({ success: true, message: "Found  the Seeker for this id", seeker });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something error occurred" })
    }
}
const removeSeeker = async (req, res) => {
    try {
        const { seekerId } = req.params;
        if (!seekerId) {
            return res.json({ success: false, message: "Cannot get seeker id" })
        }
        const seeker = await Seeker.findByIdAndDelete(seekerId);
        if (!seeker) {
            return res.json({ success: false, message: "Cannot delete seeker with this id" })
        }

        return res.json({ success: true, message: "Deleted  the Seeker for this id" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something error occurred" })
    }
}

const pushItem = (arr, item) => {
    if (item && !arr.includes(item)) {
        arr.push(item);
    }
};
const getAllFactors = async (req, res) => {
    try {
        const seekers = await Seeker.find({});

        if (!seekers || seekers.length === 0) {
            return res.json({ success: false, message: "Cannot get Seekers" });
        }

        let allSkills = {
            skills: [],
            certifications: [],
            languagesKnown: [],
            achievements: [],
            experiences: [],
            availability: [],
            status: [],
            desiredPost: [],
            qualifications: [],
            preferredLocation: [],
            preferredJobType: [],
            expectedCTC: []
        };

        seekers.forEach(seeker => {
            pushItem(allSkills.experiences, seeker.experience.toString() + " Years");
            pushItem(allSkills.availability, seeker.availableFrom);
            pushItem(allSkills.status, seeker.status);
            pushItem(allSkills.desiredPost, seeker.desiredPost);
            pushItem(allSkills.qualifications, seeker.qualifications);
            pushItem(allSkills.preferredLocation, seeker.preferredLocation);
            pushItem(allSkills.preferredJobType, seeker.preferredJobType);
            pushItem(allSkills.expectedCTC, seeker.expectedCTC);

            seeker.skills?.forEach(item => pushItem(allSkills.skills, item));
            seeker.achievements?.forEach(item => pushItem(allSkills.achievements, item));
            seeker.languagesKnown?.forEach(item => pushItem(allSkills.languagesKnown, item));
            seeker.certifications?.forEach(item => pushItem(allSkills.certifications, item));
        });

        return res.json({
            success: true,
            message: "Got all unique factors",
            allSkills
        });
    } catch (error) {
        console.error("❌ Error in getAllFactors:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};
const getCustomSeekers = async (req, res) => {
  try {
    const {
      skills,
      certifications,
      languagesKnown,
      achievements,
      experiences,
      availability,
      status,
      desiredPost,
      qualifications,
      preferredLocation,
      preferredJobType,
      expectedCTC
    } = req.query;

    let filterQuery = {};

    // For fields that accept arrays or single values
    const applyInFilter = (field, value) => {
      if (value) {
        filterQuery[field] = {
          $in: Array.isArray(value) ? value : [value]
        };
      }
    };

    applyInFilter("skills", skills);
    applyInFilter("certifications", certifications);
    applyInFilter("languagesKnown", languagesKnown);
    applyInFilter("achievements", achievements);

    // For exact numeric match
    if (experiences !== undefined) {
      filterQuery.experience = Number(experiences);
    }

    if (expectedCTC !== undefined) {
      filterQuery.expectedCTC = Number(expectedCTC);
    }

    // For exact date match
    if (availability) {
      filterQuery.availableFrom = new Date(availability);
    }

    // Case-insensitive exact string matches
    const applyRegexFilter = (field, value) => {
      if (value) {
        filterQuery[field] = {
          $regex: `^${value}$`, // ^ and $ ensure exact match
          $options: 'i' // case-insensitive
        };
      }
    };

    applyRegexFilter("status", status);
    applyRegexFilter("desiredPost", desiredPost);
    applyRegexFilter("qualifications", qualifications);
    applyRegexFilter("preferredLocation", preferredLocation);
    applyRegexFilter("preferredJobType", preferredJobType);

    const seekers = await Seeker.find(filterQuery);

    return res.status(200).json({
      success: true,
      message: "Filtered seekers fetched successfully.",
      seekers
    });

  } catch (error) {
    console.error("❌ Error in getCustomSeekers:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};

const getMatchingJobs = async (req, res) => {
  try {
    const { seekerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!seekerId) {
      return res.status(400).json({ success: false, message: "Seeker ID is required" });
    }

    const seeker = await Seeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({ success: false, message: "Seeker not found" });
    }

    const seekerSkills = seeker.skills?.map(skill => skill.trim()) || [];
    if (seekerSkills.length === 0) {
      return res.status(404).json({ success: false, message: "No skills found for this seeker" });
    }

    // Get total count first
    const totalMatches = await Job.countDocuments({
      skillsRequired: { $in: seekerSkills }
    });

    // Fetch paginated jobs
    const paginatedJobs = await Job.find({
      skillsRequired: { $in: seekerSkills }
    })
      .skip(skip)
      .limit(limit)
      .select('_id title description location type salary experienceRequired skillsRequired companyId') // Optional: keep only public fields
      .populate('companyId', 'companyName companyLogo'); // Optional: populate company info

    return res.status(200).json({
      success: true,
      message: "Matching jobs fetched successfully",
      totalMatches,
      currentPage: page,
      totalPages: Math.ceil(totalMatches / limit),
      jobs: paginatedJobs,
    });

  } catch (error) {
    console.error("Error in getMatchingJobs:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

const getWantedAuthorities = async (req, res) => {
  try {
    const { seekerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!seekerId) {
      return res.status(400).json({ success: false, message: "Seeker ID is required" });
    }

    const seeker = await Seeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({ success: false, message: "Seeker not found" });
    }

    const seekerSkills = (seeker.skills || [])
      .map(skill => skill && skill.trim())
      .filter(skill => skill); // removes empty or undefined

    if (seekerSkills.length === 0) {
      return res.status(404).json({ success: false, message: "No skills found for this seeker" });
    }

    const totalMatches = await Authority.countDocuments({
      preferredSkills: { $in: seekerSkills }
    });

   const matchingAuthorities = await Authority.find({
  preferredSkills: { $in: seekerSkills }
})
  .select('_id companyName companyEmail companyLogo companyWebsite companySize industry location contactNumber about preferredSkills preferredExperience jobTypesOffered jobs')
  .skip(skip)
  .limit(limit);


    return res.status(200).json({
      success: true,
      message: "Matching authorities fetched successfully",
      totalMatches,
      currentPage: page,
      totalPages: Math.ceil(totalMatches / limit),
      authorities: matchingAuthorities,
    });

  } catch (error) {
    console.error("Error in getWantedAuthorities:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const editProfile = async(req,res)=>{
  try {
    const {seekerId} = req.params;
    const updates = req.body;
    if (!seekerId) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }
    const seeker = await Seeker.findById(seekerId);
    if (!seeker) {
      return res.status(404).json({ success: false, message: "Seeker not found" });
    }
    const updatedSeeker= await Seeker.findByIdAndUpdate(seekerId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedSeeker) {
      return res.status(404).json({ success: false, message: "Seeker not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      authority: updatedSeeker,
    });

    
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}












export {editProfile, createProfile, getAllSeekers, getSeekerById, removeSeeker, getSeekerByUserId, getAllFactors,getCustomSeekers,getMatchingJobs,getWantedAuthorities }