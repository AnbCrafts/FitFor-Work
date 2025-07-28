import { Upload } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { useNavigate, useParams } from "react-router-dom";

const EmployerForm = () => {
  const { registerForAuthority,getUserIdByToken,globalId } = useContext(WorkContext);
  const {role,hash}= useParams();

  useEffect(()=>{
   const token = localStorage.getItem("userToken");
   if(token){
     getUserIdByToken(token);
   }
   },[hash])
  // alert(auth)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    owner: "",
    companyEmail: "",
    companyName: "",
    companyLogo: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    location: "",
    contactNumber: "",
    about: "",
    preferredSkills: "",
    preferredExperience: "",
    jobTypesOffered: "",
  });

  const [img, setImg] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, companyLogo: file });
      setImg(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setFormData({ ...formData, owner: globalId });
  }, [globalId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => !value || String(value).trim() === ""
    );

    if (isAnyFieldEmpty) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      await registerForAuthority(formData);
      alert("Registered successfully!");
      setFormData({
    companyEmail: "",
    companyName: "",
    companyLogo: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    location: "",
    contactNumber: "",
    about: "",
    preferredSkills: "",
    preferredExperience: "",
    jobTypesOffered: "",
  })
    navigate(`/auth/${role}/${hash}/profile`);

    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
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
      

      

        {/* Company Email */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="companyEmail"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Company Email
          </label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Enter company email"
            value={formData.companyEmail}
            onChange={(e) =>
              setFormData({ ...formData, companyEmail: e.target.value })
            }
          />
        </div>

        {/* Company Name */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="companyName"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </div>

        {/* Company Logo */}

        {/* Company Website */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="companyWebsite"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Company Website
          </label>
          <input
            type="text"
            id="companyWebsite"
            name="companyWebsite"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Enter website URL"
            value={formData.companyWebsite}
            onChange={(e) =>
              setFormData({ ...formData, companyWebsite: e.target.value })
            }
          />
        </div>

        {/* Company Size */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="companySize"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Company Size
          </label>
          <input
            type="text"
            id="companySize"
            name="companySize"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="E.g., 11-50, 51-200"
            value={formData.companySize}
            onChange={(e) =>
              setFormData({ ...formData, companySize: e.target.value })
            }
          />
        </div>

        {/* Industry */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="industry"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="E.g., IT, Education"
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
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

        {/* Contact Number */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="contactNumber"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="Enter contact number"
            value={formData.contactNumber}
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
          />
        </div>

        {/* About */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="about"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            About
          </label>
          <textarea
            rows={5}
            type="text"
            id="about"
            name="about"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none flex-1"
            placeholder="Company description"
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
          />
        </div>

        {/* Preferred Skills */}
        <div className="flex flex-col items-start justify-start gap-5 mb-5 my-2 w-full">
  <label
    htmlFor="preferredSkills"
    className="text-lg font-semibold text-gray-400"
  >
    Preferred Skills
  </label>

  <div className="flex flex-wrap gap-2 mx-auto max-w-[900px]">
    { formData.preferredSkills !== "" && formData.preferredSkills?.map((skill, index) => (
      <span
        key={index}
        className="bg-green-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
      >
        {skill}
        <button
          type="button"
          onClick={() => {
            const updatedSkills = [...formData.preferredSkills];
            updatedSkills.splice(index, 1);
            setFormData({ ...formData, preferredSkills: updatedSkills });
          }}
          className="text-white hover:text-red-300"
        >
          ✕
        </button>
      </span>
    ))}
  </div>

  {/* Input to add new skills */}
  <div className="w-full flex items-center justify-center">
    <input
    type="text"
    id="preferredSkills"
    name="preferredSkills"
    className="px-5 text-gray-200   text-lg py-2 border-b bg-gray-800 rounded-sm border-green-500 outline-none h-12 flex-1 max-w-[900px] ml-19"
    placeholder="Type skill and press Enter"
    onKeyDown={(e) => {
      if (
        (e.key === "Enter" || e.key === ",") &&
        e.target.value.trim() !== ""
      ) {
        e.preventDefault();
        const skill = e.target.value.trim();
        if (
          !formData.preferredSkills?.includes(skill)
        ) {
          setFormData({
            ...formData,
            preferredSkills: [...(formData.preferredSkills || []), skill],
          });
        }
        e.target.value = "";
      }
    }}
  />
  </div>
</div>

        {/* Preferred Experience */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="preferredExperience"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Preferred Experience
          </label>
          <input
            type="number"
            id="preferredExperience"
            name="preferredExperience"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="E.g., 2 years"
            value={formData.preferredExperience}
            onChange={(e) =>
              setFormData({ ...formData, preferredExperience: e.target.value })
            }
          />
        </div>

        {/* Job Types Offered */}
        <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full">
          <label
            htmlFor="jobTypesOffered"
            className="text-lg w-[150px] font-semibold text-gray-400"
          >
            Job Types Offered
          </label>
          <input
            type="text"
            id="jobTypesOffered"
            name="jobTypesOffered"
            className="px-5 text-gray-200 text-lg py-2 border-b bg-gray-800 rounded-sm max-w-[900px] border-green-500 outline-none h-12 flex-1"
            placeholder="E.g., Office, Remote"
            value={formData.jobTypesOffered}
            onChange={(e) =>
              setFormData({ ...formData, jobTypesOffered: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-start gap-5 mt-10 my-2 w-full">
          <span className="text-lg w-[150px] font-semibold text-gray-400">
            Upload Logo
          </span>
          <label
            htmlFor="companyLogo"
            className={` ${
              img
                ? "h-[100px] w-[150px] rounded-xl border-transparent shadow-2xl shadow-gray-600"
                : " h-12 px-5"
            } text-gray-200 text-lg py-2 border border-green-500 outline-none flex items-center justify-between gap-5 cursor-pointer`}
          >
            {img ? (
              <img
                src={img}
                alt="companyLogo"
                className="w-[150px] h-[100px] rounded-xl object-cover"
              />
            ) : (
              <>
                <Upload /> <span>Upload Logo</span>
              </>
            )}
          </label>

          <input
            type="file"
            id="companyLogo"
            name="companyLogo"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
        </div>

        <div className="w-fit mx-auto mt-30">
          <button
            type="submit"
            className="py-3 px-15 border border-green-500 text-lg rounded-md cursor-pointer hover:bg-green-500 transition-all font-semibold"
          >
            Register
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

export default EmployerForm;
