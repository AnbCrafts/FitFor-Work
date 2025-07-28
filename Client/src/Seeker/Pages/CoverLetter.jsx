import React, { useContext, useEffect, useState } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext';
import { useParams } from 'react-router-dom';

const CoverLetter = () => {

  const {getAllCompanyNames,allCompanies,getUserDataById,userData} = useContext(WorkContext);

  const {hash}= useParams();
  useEffect(()=>{
    getAllCompanyNames();
    const userID = localStorage.getItem("userId");
    getUserDataById(userID);

  },[hash]);



  const [loading, setLoading] = useState(false);
const [output, setOutput] = useState('');
const [isEditing, setIsEditing] = useState(false);
const [editedText, setEditedText] = useState('');

const handleGenerate = () => { /* generate logic */ };
const handleRegenerate = () => { /* regenerate logic */ };
const handleManualEdit = () => setIsEditing(true);
const handleDownload = () => { /* download PDF logic */ };
const handleCopy = () => { /* clipboard logic */ };



const [formData,setFormData] = useState({
  name:"",
  phone:"",
  email:"",
  company:"",
  description:"",
  post:"",
  skills:[],
  experienceSummary:""

})

useEffect(() => {
  if (userData && userData.firstName && userData.lastName && userData.phone && userData.email) {
    setFormData(prev => ({
      ...prev,
      name: userData.firstName + " " + userData.lastName,
      phone: userData.phone,
      email: userData.email,
    }));
  }
}, [userData]);


const [skillInput, setSkillInput] = useState("");

const handleSkillKeyDown = (e) => {
  if (e.key === "Enter" && skillInput.trim()) {
    e.preventDefault();
    if (!formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
    }
    setSkillInput(""); // clear input
  }
};

const removeSkill = (skillToRemove) => {
  setFormData((prev) => ({
    ...prev,
    skills: prev.skills.filter((skill) => skill !== skillToRemove),
  }));
};





  return (
    <div className='min-h-[100vh] w-[90%] mx-auto'>
        <div className="w-full px-6 py-8 bg-[#0c0c3a] text-[#fff] rounded-2xl shadow-md">
  {/* Heading & Subheading */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-[#FF6B6B] mb-2">✨ Create Your Perfect Cover Letter</h1>
    <p className="text-lg text-gray-200">
      Craft a job-winning cover letter in seconds with AI-powered guidance tailored to your profile and target role.
    </p>
  </div>

  {/* How it Works */}
  <div className="max-w-3xl mx-auto">
    <h2 className="text-2xl font-semibold text-[#fff] mb-4">🚀 How it works</h2>
    <ul className="space-y-3 text-gray-400 list-decimal list-inside">
      <li><strong>Enter</strong> job role & company name</li>
      <li><strong>Add</strong> key skills and achievements</li>
      <li><strong>Generate</strong> and download your personalized cover letter</li>
    </ul>
  </div>
</div>

<div className="bg-[#0c0c3a] text-white p-6 rounded-2xl shadow-md mt-5 w-full mx-auto space-y-8">
  {/* 👤 Applicant Information */}
  <div>
    <h2 className="text-xl font-bold text-coral-500 mb-4">👤 Applicant Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Full Name"
        className="custom-input"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="custom-input"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        className="custom-input md:col-span-2"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
    </div>
  </div>

  {/* 💼 Job Details */}
  <div>
    <h2 className="text-xl font-bold text-coral-500 mb-4">💼 Job Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select
        className="custom-input"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      >
        <option value="">Select Company</option>
        {allCompanies && allCompanies.map((company, index) => (
          <option key={index} value={company}>
            {company}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Which post are you looking for (post/role)"
        className="custom-input mb-4 w-full"
        value={formData.post}
        onChange={(e) => setFormData({ ...formData, post: e.target.value })}
      />
    </div>
    <textarea
      placeholder="Why you want this role (optional)"
      className="custom-input mt-4 w-full h-24 resize-none"
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    ></textarea>
  </div>

  {/* 🛠️ Skills & Experience */}
  <div>
    <h2 className="text-xl font-bold text-coral-500 mb-4">🛠️ Skills & Experience</h2>
    <div>
  {/* Display added skills */}
  <div className="flex flex-wrap gap-2 mb-2">
    {formData.skills.map((skill, idx) => (
      <span
        key={idx}
        className="bg-gray-900 shadow-2xl text-white px-3 py-1 rounded-full flex items-center space-x-2"
      >
        <span>{skill}</span>
        <button
          type="button"
          onClick={() => removeSkill(skill)}
          className="ml-2 text-gray-900 bg-white rounded-full px-1 cursor-pointer py-0.5 font-semibold hover:text-gray-800"
        >
          &times;
        </button>
      </span>
    ))}
  </div>

  {/* Skill input */}
  <input
    type="text"
    placeholder="Press Enter to add a skill"
    className="custom-input mb-4 w-full"
    value={skillInput}
    onChange={(e) => setSkillInput(e.target.value)}
    onKeyDown={handleSkillKeyDown}
  />
</div>

    <textarea
      placeholder="Brief Experience Summary (optional)"
      className="custom-input w-full h-24 resize-none mb-4"
      value={formData.experienceSummary}
      onChange={(e) => setFormData({ ...formData, experienceSummary: e.target.value })}
    ></textarea>
    <input
      type="file"
      className="custom-input w-full cursor-pointer file:bg-coral-500 file:border-none file:text-white file:px-4 file:py-2"
      onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
    />
  </div>
</div>


<div className="cover-letter-section">

  {/* Generate Button Section */}
  <div className="generate-section">
    <button className="generate-button" onClick={handleGenerate} disabled={loading}>
      {loading ? (
        <span className="spinner"></span>
      ) : (
        'Generate Cover Letter'
      )}
    </button>
  </div>

  {/* Output Section (Visible After Generation) */}
  {output && (
    <div className="output-section">
      <div className="output-box">
        {isEditing ? (
          <textarea
            className="manual-edit"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <p>{output}</p>
        )}
      </div>

      <div className="output-actions">
        <button onClick={handleRegenerate}>🔄 Regenerate</button>
        <button onClick={handleManualEdit}>✍️ Edit Manually</button>
        <button onClick={handleDownload}>⬇️ Download as PDF</button>
        <button onClick={handleCopy}>📋 Copy to Clipboard</button>
      </div>
    </div>
  )}

</div>

<div class="extra-sections-container mt-10">
  <section class="tips-panel">
    <h3>Tips for Effective Cover Letters</h3>
    <ul>
      <li>✅ Keep it one page.</li>
      <li>✅ Mention the company and why you’re a fit.</li>
      <li>✅ Highlight how you can solve their problems.</li>
    </ul>
  </section>

  <section class="success-messages">
    <p class="message">✅ Cover letter copied to clipboard!</p>
    <p class="message">✅ PDF downloaded successfully.</p>
  </section>
</div>

{/* <div className="mt-10 p-6 bg-white/5 rounded-xl space-y-4 text-white">
  <h2 className="text-2xl font-bold text-coral-500">🧠 Bonus Features to Add Later</h2>
  <ul className="list-disc list-inside space-y-2">
    <li><span className="font-semibold">Tone selector:</span> Formal, Friendly, Enthusiastic</li>
    <li><span className="font-semibold">Language selector</span> (English, Hindi, etc.)</li>
    <li><span className="font-semibold">Auto-suggest based on resume</span> (if uploaded)</li>
    <li><span className="font-semibold">Save to profile / Save history</span></li>
    <li><span className="font-semibold">Email directly to employer</span></li>
  </ul>
</div> */}






      
    </div>
  )
}

export default CoverLetter
