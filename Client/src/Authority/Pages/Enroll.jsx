import React, { useState } from 'react';

const Enroll = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    location: '',
    relocation: false,
    jobTitle: '',
    industry: '',
    experience: '',
    skills: '',
    education: '',
    languages: '',
    resume: null,
    jobType: '',
    salaryRange: '',
    jobCategories: [],
    linkedin: '',
    portfolio: '',
    github: '',
    referral: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen py-10 px-6 w-[90%] mt-10 mx-auto bg-gray-900 rounded-2xl border border-pink-600">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-500">
        Create an Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-white font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3  bg-gray-700 rounded-xl"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-white font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3  bg-gray-700 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-white font-medium mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3  bg-gray-700 rounded-xl"
            />
          </div>

          <div className="input-group">
            <label className="block text-white font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3  bg-gray-700 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label className="block text-white font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
            required
          />
        </div>

        {/* Location and Relocation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="block text-white font-medium mb-2">Preferred Job Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3  bg-gray-700 rounded-xl"
            />
          </div>

          <div className="input-group">
            <label className="block text-white font-medium mb-2">Willing to Relocate?</label>
            <input
              type="checkbox"
              name="relocation"
              checked={formData.relocation}
              onChange={handleChange}
              className="w-full p-3  bg-gray-700 rounded-xl"
            />
          </div>
        </div>

        {/* Professional Details */}
        <div className="input-group">
          <label className="block text-white font-medium mb-2">Current Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          />
        </div>

        <div className="input-group">
          <label className="block text-white font-medium mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          />
        </div>

        <div className="input-group">
          <label className="block text-white font-medium mb-2">Years of Experience</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          />
        </div>

        <div className="input-group">
          <label className="block text-white font-medium mb-2">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          />
        </div>

        <div className="input-group">
          <label className="block text-white font-medium mb-2">Education Level</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          />
        </div>

        {/* Resume Upload */}
        <div className="input-group">
          <label className="block text-white font-medium mb-2">Upload Resume</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          />
        </div>

        {/* Job Preferences */}
        <div className="input-group">
          <label className="block text-white font-medium mb-2">Preferred Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-3  bg-gray-700 rounded-xl"
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
            <option value="remote">Remote</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Terms and Conditions */}
        <div className="input-group flex items-center">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label className="text-white">I agree to the Terms and Conditions</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl mt-6 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Enroll;
