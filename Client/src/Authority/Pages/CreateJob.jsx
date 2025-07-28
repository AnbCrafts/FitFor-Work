import React, { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { WorkContext } from "../../ContextAPI/WorkContext";

const CreateJob = () => { 

  const { hash } = useParams();
  const { createJob,authData,getCompanyByOwnerId, } = useContext(WorkContext);
  


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    experienceRequired: "",
    jobType: "",
    salaryRange: "",
    location: "",
    postedBy: "",
    totalSeats: "",
    deadline: "",
    jobRole:"",
    category:""
  });
 

  useEffect(() => {
   const userId = localStorage.getItem("userId") 
   if(userId){
    getCompanyByOwnerId(userId);
 
   }
}, [hash]);

useEffect(()=>{
  if(authData && authData._id){
     setFormData((prev) => ({ ...prev, postedBy: authData._id }));

  }
},[authData])



  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData)
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => !value || String(value).trim() === ""
    );

    if (isAnyFieldEmpty) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const preparedData = {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
        totalSeats: Number(formData.totalSeats),
        deadline: new Date(formData.deadline),
      };
      const done = await createJob(preparedData);
      if(done){
        alert("Done")
      }else{
        alert("Not Done")

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[100vh] w-[90%] mx-auto mt-5">
      <div className="max-w-[900px] mx-auto py-5 px-10 border-t border-l border-green-500 rounded-2xl">
        <h1 className="text-green-500 text-3xl font-semibold ">
          Become an Official Authority Partner
        </h1>
        <p className="text-gray-400 text-md mt-5">
          Join our network of trusted employers and start discovering top talent
          today. By enrolling your organization, you gain access to a dedicated
          dashboard, smart hiring tools, and the ability to post jobs tailored
          to your company's needs. Let's grow your team with the right
          candidates.
        </p>
      </div>

      <form
        
        onSubmit={submitHandler}
        className="max-w-[90%] mx-auto  p-10 border-green-500 border-b border-r rounded-2xl mt-10"
      >
        {/* title */}

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="title"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Job title , e.g. Frontend Developer "
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="jobRole"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Job Role
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Job role , e.g. SDE, Analyst "
            value={formData.jobRole}
            onChange={(e) =>
              setFormData({ ...formData, jobRole: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="description"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            About the Job
          </label>
          <textarea
            rows={5}
            type="text"
            id="description"
            name="description"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none flex-1"
            placeholder="Something about the job post"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="experienceRequired"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Experience Required
          </label>
          <input
            type="text"
            id="experienceRequired"
            name="experienceRequired"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Enter experience required (in years) e.g. 2 "
            value={formData.experienceRequired}
            onChange={(e) =>
              setFormData({ ...formData, experienceRequired: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="skillsRequired"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Required Skills
          </label>
          <input
            type="text"
            id="skillsRequired"
            name="skillsRequired"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Enter comma separated values e.g. C, C++"
            value={formData.skillsRequired}
            onChange={(e) =>
              setFormData({ ...formData, skillsRequired: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="jobType"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Job Type
          </label>
          <select
  id="jobType"
  name="jobType"
  className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
  value={formData.jobType}
  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
>
  <option value="">Select job type</option>
  <option value="Full-Time">Full-Time</option>
  <option value="Part-Time">Part-Time</option>
  <option value="Internship">Internship</option>
  <option value="Remote">Remote</option>
  <option value="Contract">Contract</option>
</select>

        </div>

        {/* salaryRange */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="salaryRange"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            salaryRange
          </label>
          <input
            type="text"
            id="salaryRange"
            name="salaryRange"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="E.g. 0-5 LPA"
            value={formData.salaryRange}
            onChange={(e) =>
              setFormData({ ...formData, salaryRange: e.target.value })
            }
          />
        </div>

        {/* Location */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="location"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="City, Country"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="totalSeats"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Available Seats
          </label>
          <input
            type="number"
            id="totalSeats"
            name="totalSeats"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Number of posts available"
            value={formData.totalSeats}
            onChange={(e) =>
              setFormData({ ...formData, totalSeats: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="category"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Job category e.g. IT"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="deadline"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Last date to apply
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="E.g., 25-10-25"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />
        </div>

        <div className="w-fit mx-auto mt-30">
          <button
            type="submit"
            className="py-3 px-15 border border-green-500 text-lg rounded-md cursor-pointer hover:bg-green-500 transition-all font-semibold"
          >
            Post Job
          </button>
        </div>
      </form>

      <div className="w-full mt-10 py-16 bg-[#0c0c3a] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-10 text-coral-500">
            Why Choose Us as an Authority?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-green-500 transition-all">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Targeted Talent Access
              </h2>
              <p className="text-gray-500">
                Reach skilled individuals tailored to your job requirements
                using our smart filters and advanced matching engine.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-green-500 transition-all">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Streamlined Hiring
              </h2>
              <p className="text-gray-500">
                Manage applications, shortlist candidates, and schedule
                interviews – all from one seamless dashboard.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-green-500 transition-all">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Company Branding
              </h2>
              <p className="text-gray-500">
                Showcase your company profile, values, and open roles to attract
                the right talent and build credibility.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-green-500 transition-all">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                AI-Powered Shortlisting
              </h2>
              <p className="text-gray-500">
                Let our AI assist in identifying the best-fit candidates
                quickly, saving you hours of manual effort.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-green-500 transition-all">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Insightful Analytics
              </h2>
              <p className="text-gray-500">
                Get access to recruitment insights, application trends, and
                hiring efficiency reports in real-time.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-sm hover:shadow-green-500 transition-all">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Reliable Support
              </h2>
              <p className="text-gray-500">
                Our support team is available to assist you throughout the
                hiring process for a smooth experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
