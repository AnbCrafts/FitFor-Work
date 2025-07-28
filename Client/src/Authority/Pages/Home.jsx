import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MessageBox from '../Components/MessageBox';
import Bottom from '../Components/Bottom';
import { skillsDB } from '../assets/SkillsDB';
import { ArrowBigRightDash } from 'lucide-react';
import { WorkContext } from '../../ContextAPI/WorkContext';
import PageNav from '../../Global/Components/PageNav';
import Dashboard from '../Components/Dashboard';

const Home = () => { 
const {hash }= useParams();

const {getSkills,allSkills,getUserIdByToken,globalId,getCompanyByOwnerId,authData
} = useContext(WorkContext)


useEffect(()=>{
  const id = localStorage.getItem("userId");
  if(id){
    getCompanyByOwnerId(id);
    

  }
},[hash]);












  const [currOption,setCurrOption] = useState("Options");
  const [selectedValue, setSelectedValue] = useState("");
  const [search,setSearch] = useState(false);

  useEffect(()=>{
    getSkills();
  })





  const formatLabel = (str) => {
  if (!str) return "";
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize first letter
};

const navigate = useNavigate();

useEffect(() => {
  if (
    search &&
    allSkills &&
    currOption &&
    Array.isArray(allSkills[currOption]) &&
    allSkills[currOption].includes(selectedValue)
  ) {

    navigate(`custom-suggestions/${currOption}=${selectedValue}`)
  }
}, [search, selectedValue, currOption, allSkills]);


const [currentOptionPage, setCurrentOptionPage] = useState(1);
const OptionsPerPage = 9;

const allSkillEntries = allSkills ? Object.entries(allSkills) : [];

const indexOfLastOption = currentOptionPage * OptionsPerPage;
const indexOfFirstOption = indexOfLastOption - OptionsPerPage;

const currentOptions = allSkillEntries.slice(indexOfFirstOption, indexOfLastOption);

const totalOptionPages = Math.ceil(allSkillEntries.length / OptionsPerPage);





  




  return (
    <div className='rounded-lg mb-5 min-h-[100vh] '>

{
  authData &&(
    <Dashboard/>

  )
}
{
  !authData && (
 <div className='mt-5 text-center p-10 border-l border-b border-[#0000ff3c] rounded-2xl w-[90%] mx-auto'>
  <h1 className='text-5xl font-bold inline bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text'>
    Hire the Right Talent
  </h1>
  <p className='text-xl mt-4 text-gray-400'>
    Post jobs, search for candidates, and streamline your hiring process with ease.
  </p>

  <div className='p-5 bg-gray-800 w-fit mx-auto my-5 rounded-lg shadow-2xs shadow-[violet]'>
    <h1 className='text-2xl'>
      First time hiring?{' '}
      <span className='font-bold inline bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text'>
        Build your Employer Profile
      </span>
    </h1>
    <Link
      to="build/employer-form"
      className='text-lg font-semibold block my-7 py-2 px-8 border w-fit mx-auto rounded-lg border-indigo-700 hover:bg-indigo-700 transition-all'
    >
      🧾 Create Employer Profile
    </Link>
  </div>

 </div>

  )
}
      
      <div className='mt-5 text-center p-10 border-l border-b border-[#0000ff3c] rounded-2xl w-[90%] mx-auto'>
 




  <div className='w-fit mx-auto'>
    <div className='bg-gray-900 w-fit mx-auto mb-5 rounded-lg p-2 shadow-md shadow-[#1a1a40]'>
      <h1 className='text-2xl text-gray-200 px-8 pt-2 font-semibold '>
        Can’t find suitable candidates?
      </h1>
      <p className='text-lg px-8 pb-2 font-semibold text-gray-400'>
        Search talent pool or post new openings
      </p>
    </div>

    <div className='w-[700px] mx-auto flex items-center justify-between gap-5 flex-row-reverse'>

      <button onClick={()=>setSearch(true)} className='h-full w-10 p-0.5'>
        <img src={assets.search} className='h-full w-full cursor-pointer' alt="Search icon" />
      </button>

     <select
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-indigo-500 outline-none shadow-2xl"
>
  <option value="">
    ----- Select {formatLabel(currOption)} -----
  </option>

  {allSkills?.[currOption]?.map((option, index) => {
    const displayValue =
      currOption === "availability"
        ? new Date(option).toLocaleString() // or use `.toLocaleDateString()` for only date
        : option;

    return (
      <option key={index} value={option}>
        {displayValue}
      </option>
    );
  })}
</select>


    </div>
    
    <div className=' w-[90%] mx-auto py-5'>
        <h1 className='text-2xl font-bold inline bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text'>Search for Skilled Employees</h1>
      <div className='flex items-center justify-between gap-5 flex-wrap mt-10'>
       {
  allSkills &&
  currentOptions?.map(([key]) => {
    // Format the key to readable form
    const formattedKey = key
      .replace(/([A-Z])/g, " $1")        // Insert space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter

     
    return (
      <div key={key} className="mb-4">
        <div onClick={()=>setCurrOption(key)} className="text-xl gap-5 font-semibold text-white bg-gray-950 h-25 rounded-xl shadow-2xl min-w-xs flex items-center justify-center cursor-pointer hover:shadow-pink-500 hover:shadow-sm border border-indigo-500">
          <span>{formattedKey}</span>
          <ArrowBigRightDash className='h-10 w-10 p-0.5 rounded-full bg-pink-500 text-yellow-500 '/>
        </div>

      
      </div>
    );
  })
}

      
    
   
    </div>


    <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
            <PageNav currentPage={currentOptionPage} totalPages={totalOptionPages} incrementer={setCurrentOptionPage} />
          </div>
    </div>



  </div>
</div>



<div className="rounded-xl py-12 my-10 w-[90%] mx-auto border border-green-500 px-6 bg-[#0f1a2f] text-white text-center">
  <h2 className="text-4xl font-bold mb-6 text-green-400">📄 Create Employment</h2>
  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
    Easily post new job opportunities and connect with qualified candidates. Define job requirements, set filters, and start hiring top talent in just a few clicks.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      {
        icon: "🛠️",
        title: "Define Role",
        desc: "Specify job title, description, responsibilities, and requirements.",
      },
      {
        icon: "🎯",
        title: "Set Preferences",
        desc: "Choose skills, location, experience, and education filters.",
      },
      {
        icon: "📅",
        title: "Schedule & Publish",
        desc: "Set deadlines, publish instantly, or schedule for later.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-[#1a1a40] p-6 rounded-xl border border-green-600 hover:shadow-md hover:shadow-green-400/30 transition-all"
      >
        <div className="text-4xl mb-3">{item.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-gray-300">{item.desc}</p>
      </div>
    ))}
  </div>

  <Link to={'create/job-vacancy'} className="mt-10 inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300">
    + Post a Job
  </Link>
</div>


<div className='w-[90%] mx-auto'>
<div className='mx-auto w-fit mt-5'>
<h1 className='text-5xl font-bold inline bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text'>
    Some Trending Skills
  </h1>
</div>
<div className='p-10 w-full mx-auto flex items-center justify-center gap-10 mt-10 flex-wrap rounded-2xl border-b-2 border-blue-500 '>
  
  {
    skillsDB.map((item,index)=>{
      return(
        <div key={index} className='p-5 min-h-[150px] min-w-[150px] bg-gray-900 text-gray-400 rounded-xl border-b border-l border-pink-500 hover:shadow-2xl shadow'>

        <h1 className='text-2xl py-2'>{item.name}</h1>
        <span className='text-4xl w-fit block mx-auto my-2'>{item.icon}</span>
        </div>
      )
    })
  }

</div>
</div>



     


<div className="rounded-xl py-15 mt-10 w-[90%] mx-auto border border-blue-500 px-4 bg-transparent text-white text-center">
  <h2 className="text-3xl font-semibold mb-10">
    🏢 How <span className="text-blue-400">Hiring Works</span> for Employers
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {[
      {
        icon: "📝",
        title: "Create Employer Account",
        desc: "Register your company and set up your hiring profile easily.",
      },
      {
        icon: "📢",
        title: "Post a Job",
        desc: "List your job openings with custom filters and detailed descriptions.",
      },
      {
        icon: "🧠",
        title: "Review Applicants",
        desc: "Browse and filter candidates matched to your job’s requirements.",
      },
      {
        icon: "🤝",
        title: "Hire the Best",
        desc: "Connect, interview, and finalize your hiring — all in one place.",
      },
    ].map((step, index) => (
      <div
        key={index}
        className="bg-[#0f1a2f] p-6 rounded-2xl border border-blue-700 hover:shadow-xl hover:shadow-pink-400/20 transition-all"
      >
        <div className="text-5xl mb-4">{step.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-gray-300">{step.desc}</p>
      </div>
    ))}
  </div>
</div>




<div className="py-16 text-white w-[90%] mx-auto px-10 border-b border-t border-[#0044ff4d] rounded-2xl mb-5 mt-10">
  <h2 className="text-3xl font-bold text-center mb-10 text-blue-400">
    What Employers Say About Us 💼
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      {
        name: "Sonal Kapoor",
        quote: "We filled 3 technical roles in record time. The candidate filtering saved us days of effort.",
        role: "Recruitment Lead at DevSolutions",
      },
      {
        name: "Rajeev Arora",
        quote: "The dashboard is intuitive and helped our HR team stay organized and efficient.",
        role: "HR Head at FinVerse Inc.",
      },
      {
        name: "Meenal Desai",
        quote: "Highly satisfied with the quality of applications. The platform delivers serious job seekers.",
        role: "Talent Acquisition Manager at BrightEdge",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className="bg-[#0f1a2f] p-6 rounded-xl border border-blue-600 shadow-lg shadow-blue-500/20 transition hover:shadow-pink-500/30"
      >
        <p className="italic text-lg mb-4">“{testimonial.quote}”</p>
        <div className="font-semibold text-blue-300">{testimonial.name}</div>
        <div className="text-sm text-gray-400">{testimonial.role}</div>
      </div>
    ))}
  </div>
</div>


<MessageBox/>

<div className='w-[90%] mx-auto'>
<Bottom/>

</div>






    </div>
  )
}

export default Home
