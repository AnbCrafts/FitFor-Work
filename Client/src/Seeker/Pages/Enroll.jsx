import { useNavigate, useParams } from 'react-router-dom';
import { WorkContext } from '../../ContextAPI/WorkContext';
import React, { useContext, useEffect, useState } from "react";
import { File } from 'lucide-react';
// import Thumbnail from '../UI/FileIcon';


const Enroll = () => {
  const {userId,hash} = useParams();
  const {createSeekerProfile,getUserDataById,userData,initProfileData,setInitProfileData, getUserIdByToken,globalId,} = useContext(WorkContext);
useEffect(()=>{
  getUserIdByToken();
},[hash]);

  const navigate = useNavigate();

  useEffect(()=>{
    getUserDataById(globalId);
    setFormData((prev) => ({ ...prev, userId: globalId }));

  },[globalId]);

  useEffect(() => {
  if (userData && userData._id) {
    setFormData((prev) => ({ ...prev, userId: userData._id }));
  }
}, [userData]);





  const [formData, setFormData] = useState({
    userId: "",
    desiredPost: "",
    status: "Fresher",
    skills: [],
    experience: 0,
    qualifications: "",
    resume: "",
    preferredLocation: "",
    preferredJobType: "Office",
    availableFrom: "",
    currentCompany: "None",
    currentPost: "None",
    currentCTC: 0,
    expectedCTC: 0,
    portfolioLink: "",
    certifications: [],
    languagesKnown: [],
    achievements: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["skills", "certifications", "languagesKnown", "achievements"].includes(name)) {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e) => {
  const { name, files } = e.target;

  if (files && files.length > 0) {
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Store actual file object
    }));
  }
};

 
  // useEffect(()=>{
  //   setFormData({ ...formData, email: email });
  // },[email])


  useEffect(()=>{
    setInitProfileData(initProfileData)
  },[initProfileData])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    createSeekerProfile(formData);

      setFormData({
    desiredPost: "",
    status: "Fresher",
    skills: [],
    experience: 0,
    qualifications: "",
    resume: "",
    preferredLocation: "",
    preferredJobType: "Office",
    availableFrom: "",
    currentCompany: "None",
    currentPost: "None",
    currentCTC: 0,
    expectedCTC: 0,
    portfolioLink: "",
    certifications: [],
    languagesKnown: [],
    achievements: [],
      })

      alert("Profile has been created");
      navigate(`/auth/seeker/${hash}`);
      
    
  };

 

  return (
    <div className="min-h-screen py-10 px-6 w-[90%] mt-10 mx-auto bg-gray-900 rounded-2xl border border-pink-600">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500">
        Enroll Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">UserId</label>
            <input placeholder='' type="text" name="userId" value={formData.userId} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required />
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Desired Post</label>
            <input placeholder='Name your desired job post' type="text" name="desiredPost" value={formData.desiredPost} onChange={handleChange} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Skills (comma-separated)</label>
            <input placeholder='' type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Experience (years)</label>
            <input placeholder='' type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Qualifications</label>
            <input placeholder='' type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required />
          </div>
        </div>

       <div className="input-group">
  <label className="block text-white font-medium mb-2">Upload Resume (PDF only)</label>
  
  {!formData.resume && <input
    type="file"
    name="resume"
    accept=".pdf"
    onChange={handleFileChange}
    className="w-full p-3 bg-gray-700 rounded-xl text-white"
    required
  />}

  {formData.resume && (
  <div className='flex items-center justify-start gap-25 py-5'>
    <div>
      <p className=" flex items-center justify-start gap-2 text-sm text-gray-300 border w-fit px-10 py-2 rounded-lg border-green-500">
   <File/> Selected: {formData.resume.name}
  </p>
  
    </div>
  <button
  type="button"
  onClick={() => setFormData({ ...formData, resume: null })}
  className="text-sm text-red-500 hover:bg-red-500 hover:text-white block px-4 py-2 border border-red-500 cursor-pointer rounded-lg"
>
  Remove
</button>
  </div>

)}
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Preferred Location</label>
            <input placeholder='' type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required />
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Preferred Job Type</label>
            <select name="preferredJobType" value={formData.preferredJobType} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl">
              <option value="Office">Office</option>
              <option value="Home">Home</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Available From</label>
            <input placeholder='' type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Current Company</label>
            <input placeholder='' type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Current Post</label>
            <input placeholder='' type="text" name="currentPost" value={formData.currentPost} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Current CTC</label>
            <input placeholder='' type="number" name="currentCTC" value={formData.currentCTC} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Expected CTC</label>
            <input placeholder='' type="number" name="expectedCTC" value={formData.expectedCTC} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>

          <div className="input-group">
            <label className="block text-gray-500 font-medium mb-2">Portfolio Link</label>
            <input placeholder='' type="url" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
          </div>
        </div>

        <div className="input-group">
          <label className="block text-gray-500 font-medium mb-2">Certifications (comma-separated)</label>
          <input placeholder='' type="text" name="certifications" value={formData.certifications} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
        </div>

        <div className="input-group">
          <label className="block text-gray-500 font-medium mb-2">Languages Known (comma-separated)</label>
          <input placeholder='' type="text" name="languagesKnown" value={formData.languagesKnown} onChange={handleChange} className="w-full p-3 outline-none bg-gray-700 rounded-xl" required />
        </div>

        <div className="input-group">
          <label className="block text-gray-500 font-medium mb-2">Achievements (comma-separated)</label>
          <input placeholder='' type="text" name="achievements" value={formData.achievements} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl mt-6 hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Enroll;
