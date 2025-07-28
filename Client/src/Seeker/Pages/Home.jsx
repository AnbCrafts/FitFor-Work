import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { companyDB } from '../assets/companyDB';
import MessageBox from '../Components/MessageBox';
import { vaccancy } from '../assets/VaccancyDB';
import Vaccancy from '../Components/Vaccancy';
import { WorkContext } from '../../ContextAPI/WorkContext';
import { categoryIcons } from '../assets/iconMap';
import Dashboard from '../Components/Dashboard';
const Home = () => {
 
  const {getUserIdByToken,globalId,getAllRequirementsForJob,requirements,getSeekerDataByUserId,user_seekerData} = useContext(WorkContext);
  const {role,hash} = useParams();
  const [skills, setSkills] = useState(null);
  const [allJobs,setAllJobs]= useState(null);
  const [navPath,setNavPath] = useState(null);
  const navigate = useNavigate(); 
  const [id,setId] = useState(null);

  useEffect(()=>{
      setNavPath(`/auth/${role}/${hash}`);
      const id = localStorage.getItem("userId");
      if(id){
  getSeekerDataByUserId(id);

        setId(id);
      }
    },[hash])

  
useEffect(()=>{
  getAllRequirementsForJob()
},[]);



const [suggestionForm,setSuggestionForm] = useState({
  roles:"",
  location:"",
  jobType:"",
  category:"",
  experience:"",
  skills:"",

})


const submitHandler = (e) => {
  e.preventDefault();

  const { roles, location, jobType, category, experience, skills } = suggestionForm;
  const params = new URLSearchParams();

  if (roles) params.append("roles", roles.trim());
  if (location) params.append("location", location.trim());
  if (jobType) params.append("jobType", jobType.trim());
  if (category) params.append("category", category.trim());
  if (experience) params.append("experience", experience.trim());
  if (skills) params.append("skills", skills.trim()); // since you said it's a string now


  if (!params.toString()) {
    navigate("jobs");
  } else {
    navigate(`jobs/custom/${params.toString()}`);
  }
};












  return (
    <div className='rounded-lg mb-5 min-h-[100vh] '>
      
     {
  user_seekerData ? (
    <Dashboard />
  ) : (
    <div className='mt-5 text-center p-10 border-l border-b border-[#0000ff3c] rounded-2xl w-[90%] mx-auto'>
      <h1 className='text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text'>
        Find Your Next Opportunity
      </h1>
      <p className='text-xl mt-4 text-gray-400'>
        Browse jobs, build your profile, and connect with top employers.
      </p>

      {/* Resume Builder Box */}
      <div className='p-5 bg-gray-800 w-fit mx-auto my-5 rounded-lg shadow-2xs shadow-[violet]'>
        <h1 className='text-2xl'>
          Fresher??
          <span className='font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text'>
            {' '}Looking for a job resume?
          </span>
        </h1>
        <Link
          to={'enroll'}
          className='text-lg font-semibold block my-7 py-2 px-8 border w-fit mx-auto rounded-lg border-indigo-700 hover:bg-indigo-700 transition-all'
        >
          ✍️ Build Your Profile
        </Link>
      </div>

      {/* Search Block */}
      <div className='w-fit mx-auto'>
        <div className='bg-gray-900 w-fit mx-auto mb-5 rounded-lg p-2 shadow-md shadow-[#1a1a40]'>
          <h1 className='text-2xl text-gray-200 px-8 pt-2 font-semibold'>
            Couldn't find a job?
          </h1>
          <p className='text-lg px-8 pb-2 font-semibold text-gray-400'>
            Let us help you
          </p>
        </div>

        <div className='w-[700px] mx-auto flex items-center justify-between gap-5 flex-row-reverse'>
          <button className='h-full w-10 p-0.5'>
            <img src={assets.search} className='h-full w-full cursor-pointer' alt="Search" />
          </button>
          <input
            className="block rounded-lg outline-none border border-indigo-500 text-white text-lg w-full h-12 py-3 px-6 
                       shadow-[0_0_0px_#7f5af0] focus:shadow-[0_0_5px_#7f5af0] transition-all duration-300 bg-gray-900"
            type="search"
            id="search"
            name="search"
            placeholder="Search for jobs..."
          />
        </div>
      </div>
    </div>
  )
}



    


 

       <div className='mt-25 border-l border-r border-[#ee82ee62]  rounded-2xl mx-auto w-[90%]'>
        <div className='w-fit mx-auto'>
        <h1 className='text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text '>Trending Jobs and Vacancies</h1>

        </div>
        
      <div className='mt-5 flex items-center justify-between gap-7 flex-wrap text-center p-10  w-full '>
        {
            vaccancy.map((item,index)=>{
                return(
                    <Vaccancy key={index} vacancies={item} />
                )
            })
        }


      </div>


      <div className='mx-auto w-fit my-10'>
        <Link to={'jobs'} className='text-2xl border py-2 px-10 border-[red] rounded-lg font-semibold hover:bg-[red] transition-all cursor-pointer'>Explore More</Link>


      </div>
      </div>     

      <div className='mt-10 p-5 mx-auto w-[90%] border-r border-t border-[#ff000076] rounded-2xl'>
      <div className='w-fit  mx-auto'>
      <h1 className="text-4xl font-bold inline  bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text ">
        Explore Job Categories
      </h1>
      </div>
      
    <div className="flex items-center justify-center gap-10 flex-wrap w-full h-auto py-15">
  {requirements?.category?.slice(0, 15).map((item, index) => {
    const Icon = categoryIcons[index % categoryIcons.length]; // Consistent icon selection

    return (
      <Link
        to={`jobs/custom/category=${item}`}
        key={index}
        className="w-[280px] h-[150px] text-white text-xl flex flex-col items-center justify-center 
                   bg-[#1a1a40] rounded-xl
                   border-b border-l border-[red]
                   hover:scale-105 transition-transform duration-300 text-center hover:shadow-xl hover:shadow-[#ff000052]"
      >
        <div>
          <Icon className="h-10 w-10 p-1 text-center rounded-2xl text-teal-500" />
        </div>
        <div>{item}</div>
      </Link>
    );
  })}

  {requirements?.category?.length > 15 && (
    <div className='w-full text-center py-2 px-10 rounded-lg font-semibold transition-all cursor-pointer  text-lg mt-5'>
    <Link
      to="jobs"
      className="  text-4xl font-semibold transition-all cursor-pointer hover:text-teal-700 text-teal-500 mt-5"
    >
      Explore More →
    </Link>
    </div>
  )}
</div>
 




      </div>

      <div className='mt-10 p-5 mx-auto w-[90%] border-r border-t border-[#ff000076] rounded-2xl'>
      <div className='w-fit  mx-auto'>
      <h1 className="text-4xl font-bold inline  bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text ">
      🔍 Top Hiring Companies You Can Explore
      </h1>
      </div>
      <div className='flex items-center justify-center gap-7 flex-wrap w-full h-auto py-15'>
  {companyDB.map((company, index) => (
    <div
      key={index}
      className="w-[280px] h-[150px] text-white text-xl flex flex-col items-center justify-center 
                 bg-[#1a1a40] rounded-xl
                 border-b border-l border-[#8a2be2]
                 hover:scale-105 transition-transform duration-300 text-center 
                 hover:shadow-xl hover:shadow-[#8a2be26b]"
    >
      <div className="text-4xl mb-2">{company.logo}</div>
      <div>{company.name}</div>
    </div>
  ))}
</div>

      </div>

      <div className='py-10 mt-5 shadow-2xl rounded-2xl w-[90%] mx-auto border-l border-b border-violet-400 text-center'>

      <div className='w-fit mb-15 mx-auto border border-[red] px-10 py-5 rounded-2xl '>
      <h1 className="text-4xl font-bold inline  bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text ">
      Want to apply for the job ??
      </h1>
      <p className="text-center text-lg text-gray-500 my-8 max-w-2xl mx-auto">
  Fill out the form below to get personalized job suggestions tailored to your <span className="text-indigo-400">skills</span>, 
  <span className="text-indigo-400"> experience</span>, and <span className="text-indigo-400">career preferences</span>. 
  We’ll match you with the most relevant opportunities!
</p>

      </div>

<form
  onSubmit={submitHandler}
  className="w-[90%] mx-auto bg-[#1a1a40] p-8 rounded-xl shadow-lg space-y-6 text-white"
>
  {/* Job Role */}
  <div className="flex items-center justify-between gap-5">
    <label htmlFor="roles" className="mb-1 text-md">Job Role</label>
    <select
      id="roles"
      name="roles"
      onChange={(e) =>
        setSuggestionForm((prev) => ({
          ...prev,
          roles: e.target.value,
        }))
      }
      className="rounded-lg flex-1 max-w-[900px] bg-transparent border border-[#23237a] px-4 py-3 outline-none"
    >
      <option className='text-[#1a1a40] py-1' value="">Select Role</option>
      {requirements && requirements.roles.map((item, index) => (
        <option key={index} className='text-[#1a1a40] py-1' value={item}>{item}</option>
      ))}
    </select>
  </div>

  {/* Job Category */}
  <div className="flex items-center justify-between gap-5">
    <label htmlFor="category" className="mb-1 text-md">Job Category</label>
    <select
      id="category"
      name="category"
      onChange={(e) =>
        setSuggestionForm((prev) => ({
          ...prev,
          category: e.target.value,
        }))
      }
      className="rounded-lg flex-1 max-w-[900px] bg-transparent border border-[#23237a] px-4 py-3 outline-none"
    >
      <option className='text-[#1a1a40] py-1' value="">Select Category</option>
      {requirements && requirements.category.map((item, index) => (
        <option key={index} className='text-[#1a1a40] py-1' value={item}>{item}</option>
      ))}
    </select>
  </div>

  {/* Preferred Location */}
  <div className="flex items-center justify-between gap-5">
    <label htmlFor="location" className="mb-1 text-md">Preferred Location</label>
    <select
      id="location"
      name="location"
      onChange={(e) =>
        setSuggestionForm((prev) => ({
          ...prev,
          location: e.target.value,
        }))
      }
      className="rounded-lg flex-1 max-w-[900px] bg-transparent border border-[#23237a] px-4 py-3 outline-none"
    >
      <option className='text-[#1a1a40] py-1' value="">Select Location</option>
      {requirements && requirements.location.map((item, index) => (
        <option key={index} className='text-[#1a1a40] py-1' value={item}>{item}</option>
      ))}
    </select>
  </div>

  {/* Skills (single string) */}
  <div className="flex items-center justify-between gap-5">
    <label htmlFor="skills" className="mb-1 text-md">Skills</label>
    <select
      id="skills"
      name="skills"
      onChange={(e) =>
        setSuggestionForm((prev) => ({
          ...prev,
          skills: e.target.value,
        }))
      }
      className="rounded-lg flex-1 max-w-[900px] bg-transparent border border-[#23237a] px-4 py-3 outline-none"
    >
      <option className='text-[#1a1a40] py-1' value="">Select Skills</option>
      {requirements && requirements.skills.map((item, index) => (
        <option key={index} className='text-[#1a1a40] py-1' value={item}>{item}</option>
      ))}
    </select>
  </div>

  {/* Job Type */}
  <div className="flex items-center justify-between gap-5">
    <label htmlFor="jobType" className="mb-1 text-md">Job Type</label>
    <select
      onChange={(e) =>
        setSuggestionForm((prev) => ({
          ...prev,
          jobType: e.target.value,
        }))
      }
      id="jobType"
      name="jobType"
      className="rounded-lg flex-1 max-w-[900px] bg-transparent border border-[#23237a] px-4 py-3 outline-none"
    >
      <option className='text-[#1a1a40] py-1' value="">Select Job Type</option>
      {requirements && requirements.jobType.map((item, index) => (
        <option key={index} className='text-[#1a1a40] py-1' value={item}>{item}</option>
      ))}
    </select>
  </div>

  {/* Experience */}
  <div className="flex items-center justify-between gap-5">
    <label htmlFor="experience" className="mb-1 text-md">Experience Level</label>
    <select
      onChange={(e) =>
        setSuggestionForm((prev) => ({
          ...prev,
          experience: e.target.value,
        }))
      }
      id="experience"
      name="experience"
      className="rounded-lg flex-1 max-w-[900px] bg-transparent border border-[#23237a] px-4 py-3 outline-none"
    >
      <option className='text-[#1a1a40] py-1' value="">Select Experience</option>
      {requirements && requirements.experience.map((item, index) => (
        <option key={index} className='text-[#1a1a40] py-1' value={item}>{item}</option>
      ))}
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg py-3 font-semibold"
  >
    Submit & Get Suggestions
  </button>
</form>




      </div>


      <div className="rounded-xl py-15 mt-10 w-[90%] mx-auto border border-[red] px-4 bg-transparent text-white text-center">
  <h2 className="text-3xl font-semibold mb-10">
    🚀 How <span className="text-indigo-400">It Works</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {[
      { icon: "👤", title: "Create Your Profile", desc: "Sign up and set up your job-seeker profile in minutes." },
      { icon: "🔍", title: "Browse & Search Jobs", desc: "Explore categories, filter, and find your dream job." },
      { icon: "📩", title: "Apply in One Click", desc: "Send your profile to employers instantly with one click." },
      { icon: "🎉", title: "Get Hired!", desc: "Hear back from companies and land the job you deserve." }
    ].map((step, index) => (
      <div key={index} className="bg-[#1a1a40] p-6 rounded-2xl border border-[#23237a] hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
        <div className="text-5xl mb-4">{step.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-gray-300">{step.desc}</p>
      </div>
    ))}
  </div>
</div>



<div className="py-16  text-white w-[90%] mx-auto px-10 border-b border-t border-[#ff00004d] rounded-2xl mb-5 mt-10">
  <h2 className="text-3xl font-bold text-center mb-10 text-indigo-400">
    Success Stories From Our Users 💬
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      {
        name: "Amit Sharma",
        quote: "I found my dream job in less than a week! The suggestions were spot on.",
        role: "Frontend Developer at TechNova",
      },
      {
        name: "Priya Mehta",
        quote: "The job matching form helped me land an interview with my top-choice company.",
        role: "HR Manager at PeopleCore",
      },
      {
        name: "Ravi Kumar",
        quote: "Amazing platform! Clean, fast, and accurate job suggestions.",
        role: "Data Analyst at InfoSpark",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className="bg-[#1a1a40] p-6 rounded-xl border border-indigo-600 shadow-lg shadow-indigo-500/20 transition hover:shadow-pink-500/30"
      >
        <p className="italic text-lg mb-4">“{testimonial.quote}”</p>
        <div className="font-semibold text-indigo-300">{testimonial.name}</div>
        <div className="text-sm text-gray-400">{testimonial.role}</div>
      </div>
    ))}
  </div>
</div>


<MessageBox/>






    </div>
  )
}

export default Home
