import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Dropdown from './Dropdown';
import { assets } from '../assets/assets';
import Logo from '../../Global/Components/Logo';
import { WorkContext } from '../../ContextAPI/WorkContext';
import { MessageCircle, MessageCircleCode, MessageCircleMoreIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const {hash, role } = useParams();
  const [navPath,setNavPath ] = useState("");

  const {getUserDataById,userData,getUserIdByToken,globalId} = useContext(WorkContext);

    useEffect(()=>{
      getUserIdByToken();

    },[hash])
  useEffect(()=>{
    getUserDataById(globalId);
  },[globalId])

  


  
  const userPicture = userData?.picture;


  useEffect(()=>{
    setNavPath(`/auth/${role}/${hash}`)
  },[globalId])


  return (
    <div className='py-3 w-[90%] mx-auto flex items-center justify-between flex-wrap gap-10'>
      <Logo path={navPath} />

      <ul className='flex items-center justify-between gap-5'>
        <Link to={navPath} className={`${location.pathname === `${navPath}` ? "bg-[blue]" : "bg-transparent"} hover:text-[white] border border-transparent hover:border-[blue] transition-all text-lg px-5 py-[1px] rounded-lg`}>
          Home
        </Link>
        <Link to={`${navPath}/about`} className={`${location.pathname === `${navPath}/about` ? "bg-[blue]" : "bg-transparent"} hover:text-[white] border border-transparent hover:border-[blue] transition-all text-lg px-5 py-[1px] rounded-lg`}>
          About
        </Link>
        <Link to={`${navPath}/contact`} className={`${location.pathname === `${navPath}/contact` ? "bg-[blue]" : "bg-transparent"} hover:text-[white] border border-transparent hover:border-[blue] transition-all text-lg px-5 py-[1px] rounded-lg`}>
          Contact
        </Link>
        <Link to={`${navPath}/service`} className={`${location.pathname === `${navPath}/service` ? "bg-[blue]" : "bg-transparent"} hover:text-[white] border border-transparent hover:border-[blue] transition-all text-lg px-5 py-[1px] rounded-lg`}>
          Services
        </Link>
        <Link to={`${navPath}/help`} className={`${location.pathname === `${navPath}/help` ? "bg-[blue]" : "bg-transparent"} hover:text-[white] border border-transparent hover:border-[blue] transition-all text-lg px-5 py-[1px] rounded-lg`}>
          Help
        </Link>
      </ul>

      <div className='flex items-start justify-between gap-5 w-full'>
        <div className='flex items-center justify-between gap-5'>
          <Dropdown 
  Links={[
    { label: "Find Jobs", slug: "jobs" },
    { label: "Companies", slug: "companies" },
    { label: "Saved Jobs", slug: "saved-jobs" },
    { label: "My Applications", slug: "my-applications" },
    { label: "Resume Builder", slug: "resume-builder" },
    { label: "Career Advice", slug: "career-advice" },
  ]}
  def={{ label: "Find Jobs", slug: "jobs" }}
/>
          <Dropdown
  Links={[
    { label: "Resume Enhancer", slug: "resume-enhancer" },
    { label: "Cover Letter Generator", slug: "generate/cover-letter" }, 
    { label: "Smart Job Recommendations", slug: "smart-job-recommendations" },
  ]}
  def={{ label: "AI Tools", slug: "resume-enhancer" }} // default slug must match one of the items
/>

<Dropdown
  Links={[
    { label: "Create Profile", slug: "enroll" },
    { label: "My Profile", slug: "profile" },
    { label: "Dashboard", slug: "dashboard" },
    { label: "Edit Resume", slug: "edit-resume" },
    { label: "Settings", slug: "settings" },
    { label: "Logout", slug: "logout" },
  ]}
  def={{ label: "Me", slug: "my-profile" }} // default slug must match one of the items
/>

        </div>

        <div className='flex items-center justify-between gap-5'>
          <Link className='block bg-blue-500 p-2 rounded-full shadow-2xl' to={`${navPath}/notification`} >
            <MessageCircleMoreIcon className='h-8 w-8'/>
          </Link>

          {
            hash && (
              <Link to={`${navPath}/profile`}  className='h-auto cursor-pointer w-auto py-1.5 px-5 flex items-center justify-start gap-5 border border-[#0000ff8b] bg-black '>
                <h2 className='text-gray-200 px-5 py-1 bg-gray-800 rounded-lg'>{userData?.username}</h2>
                <div className='h-12 w-12 rounded-full '>
                  <img
  src={userPicture?userPicture:assets.body3_img}

  
  alt="Profile"
  className="h-12 w-12 rounded-full border border-blue-500"
/>


                </div>

              </Link>

            
            ) 
          }
          {
            !hash && (
              <Link to={'/enroll'} className={`${location.pathname === '/enroll' ? "bg-pink-500" : "bg-transparent"} hover:text-[white] hover:bg-pink-500 transition-all text-lg px-10 py-[2px] rounded-lg border border-pink-500`}>
                Login
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
