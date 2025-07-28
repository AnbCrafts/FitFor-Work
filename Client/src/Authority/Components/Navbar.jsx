import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { Link, useLocation, useParams } from 'react-router-dom'
import Dropdown from './Dropdown';
import { assets } from '../assets/assets';
import { MessageCircle } from 'lucide-react';
import { WorkContext } from '../../ContextAPI/WorkContext';

const Navbar = () => { 
    const location = useLocation();
    const {hash,role} = useParams();
    const path = `/auth/${role}/${hash}`;

     const {getUserDataById,userData,getUserIdByToken,globalId,getCompanyByOwnerId,authData} = useContext(WorkContext);

    
     
     const id = localStorage.getItem("userId");
     useEffect(()=>{
       if(id){
         getUserDataById(id);
         getCompanyByOwnerId(id);
  
       }
     },[hash]);
     
     
     
      

      const [userPicture,setUserPicture]= useState(null);
      useEffect(()=>{
        if(userData && userData.picture){
setUserPicture( userData?.picture);
        }
      })
    
     
    
      
      
  return (
 
      <div className='py-3 w-[90%] mx-auto flex items-center justify-between flex-wrap gap-10 '>

<Logo/>
<ul className='flex items-center justify-between gap-5'>
    <Link to={`${path}`} className={`${location.pathname === `${path}`?"bg-green-500 ":"bg-transparent"} hover:text-[white] border border-transparent hover:border-green-500 transition-all text-lg  px-5 py-[1px] rounded-lg`}>Home</Link>
    <Link to={`${path}/about`} className={`${location.pathname === `${path}/about`?"bg-green-500  ":"bg-transparent"} hover:text-[white] border border-transparent hover:border-green-500 transition-all text-lg  px-5 py-[1px] rounded-lg`}>About</Link>
    <Link to={`${path}/contact`} className={`${location.pathname === `${path}/contact`?"bg-green-500  ":"bg-transparent"} hover:text-[white] border border-transparent hover:border-green-500 transition-all text-lg  px-5 py-[1px] rounded-lg`}>Contact</Link>
    <Link to={`${path}/service`} className={`${location.pathname === `${path}/service`?"bg-green-500  ":"bg-transparent"} hover:text-[white] border border-transparent hover:border-green-500 transition-all text-lg  px-5 py-[1px] rounded-lg`}>Services</Link>
    <Link to={`${path}/help`} className={`${location.pathname === `${path}/help`?"bg-green-500  ":"bg-transparent"} hover:text-[white] border border-transparent hover:border-green-500 transition-all text-lg  px-5 py-[1px] rounded-lg`}>Help</Link>
</ul>

<div className='flex items-start justify-between  gap-5 w-full'>
 
<div className='flex items-center justify-between gap-5'>
<Dropdown 
  Links={[
    { label: "Create Jobs", slug: "create/job-vacancy" },
    { label: "Posted Jobs", slug: "jobs" },
    { label: "Applications", slug: "applications" },
  ]}
  def={{ label: "Jobs", slug: "jobs" }}
/>
<Dropdown 
  Links={[
    { label: "Create Profile", slug: `${authData!==null ?"edit-panel":"build/employer-form"}` },
    { label: "My Profile", slug: "profile" },
  ]}
  def={{ label: "Profile", slug: "profile" }}
/>
<Dropdown 
  Links={[

    { label: "All Applicants", slug: "applicant" },
    { label: "All Employees", slug: "employee" },
  ]}
  def={{ label: "Job Applicants", slug: "applicant" }}
/>
<Dropdown 
  Links={[
    { label: "Sort Applications", slug: "/" },
    { label: "Smart Suggestions", slug: "/" },
  ]}
  def={{ label: "AI Tools", slug: "/" }}
/>



</div>

<div className='flex items-center justify-between gap-5'>

    <Link className='block ' to={'notification'}>
      <MessageCircle className='h-12 w-12 rounded-full  cursor-pointer shadow-2xs transition-all hover:shadow-2xl bg-gray-900 p-1' />
    </Link>
{
            id ? (
              <Link to={`${path}/profile`}  className='h-auto cursor-pointer w-auto py-1.5 px-5 flex items-center justify-start gap-5 border border-[#0000ff8b] bg-black '>
                <h2 className='text-gray-200 px-5 py-1 bg-gray-800 rounded-lg'>{userData?.username}</h2>
                <div className='h-12 w-12 rounded-full '>
                  <img
  src={userPicture?userPicture:assets.body3_img}

  
  alt="Profile"
  className="h-12 w-12 rounded-full border border-blue-500"
/>


                </div>

              </Link>

            
            ) : (
              <Link to={'/enroll'} className={`${location.pathname === '/enroll' ? "bg-green-500" : "bg-transparent"} hover:text-[white] hover:bg-green-500 transition-all text-lg px-10 py-[2px] rounded-lg border border-green-500`}>
                Login
              </Link>
            )
          }



</div>
</div>

</div>

    
  )
}

export default Navbar
