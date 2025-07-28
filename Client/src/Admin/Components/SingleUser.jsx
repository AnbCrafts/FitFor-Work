import React, { useContext, useEffect } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeft, ExternalLink, File, Languages, MoveLeftIcon, Settings, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Info = ({ label, value, status = false }) => (
  <div className='flex shrink-0 w-full items-center gap-5 justify-start border py-1 px-3 rounded-lg border-gray-800'>
    <p className="text-lg font-medium text-pink-500">{label} - </p>
    <p
      className={`text-lg font-semibold ${
        status
          ? value === 'Active'
            ? 'text-green-600'
            : 'text-red-600'
          : 'text-white'
      }`}
    >
      {value}
    </p>
  </div>
);

const DetailCard = ({array,head,icon})=>{
 return ( <div className='p-3 min-w-[200px] min-h-[200px]  h-auto w-auto bg-gray-900 shadow-2xl rounded-xl text-center'>
      <p className='text-3xl flex items-center justify-start gap-5 text-gray-400 mb-5 mx-auto w-fit'>{head}
        {/* <icon className='h-10 w-10 bg-green-500 text-white p-1 rounded-full '/> */}
        {icon}
      </p>
      <ul>
        {array?.map((item,index)=>{
          return(
            <span className='block text-lg text-white mb-2' key={index}>{item === "None"?"Nothing available":item}</span>
          )
        })}
      </ul>
    </div>
)

}


// Helper date formatter
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};


const SingleUser = () => {

    const {getUserDataById, userData, getSeekerDataByUserId,user_seekerData,getAllUsersList} = useContext(WorkContext);
    const {userId,hash} = useParams();

    useEffect(()=>{
        getUserDataById(userId);
        getSeekerDataByUserId(userId);
    },[userId]);

    useEffect(()=>{
        console.log("userData - > ", userData);


    },[userData])
    useEffect(()=>{
        console.log("user-seekerData - > ", user_seekerData);

    },[user_seekerData])

    const id = localStorage.getItem("adminId");
    const navigate = useNavigate();
    const handleGoBack = ()=>{
      navigate('/auth/admin/'+hash+'/user');
        getAllUsersList();
          
    }
    


  return (
    <div className='min-h-[100vh] w-[90%] p-5 mx-auto bg-gray-800 mt-10'> 
  <div className='flex items-center justify-start gap-5 py-5 px-5 border-b border-blue-500 mb-2'>
   
    <MoveLeftIcon onClick={handleGoBack} className='h-12 w-12 cursor-pointer bg-black rounded-full p-2'/>
    
    <h1 className="text-3xl font-bold text-gray-300">
    User Profile
  </h1>
  </div>

  <div className="flex flex-col lg:flex-row items-start justify-center gap-10 flex-wrap mt-5 ">
    
    <DetailCard  array={user_seekerData?.skills} head={"Skills"} icon={<Settings className='h-10 w-10 p-1 bg-green-500 rounded-full text-white' />}  />
    <DetailCard  array={user_seekerData?.languagesKnown} head={"Languages"} icon={<Languages className='h-10 w-10 p-1 bg-pink-500 rounded-full text-white' />}  />
    <DetailCard  array={user_seekerData?.certifications} head={"Certificates"} icon={<File className='h-10 w-10 p-1 bg-blue-500 rounded-full text-white' />}  />
    <DetailCard  array={user_seekerData?.achievements} head={"Achievements"} icon={<Trophy className='h-10 w-10 p-1 bg-violet-500 rounded-full text-white' />}  />

  </div>

  <div className='flex h-auto items-start justify-start gap-15 py-5 mt-5 bg-gray-900 px-5 rounded-2xl'>
    <div className="w-auto max-w-[300px] h-auto">
      <img
        src={userData?.picture}
        alt={`${userData?.username}'s avatar`}
        className=" h-[200px] w-[200px] block mx-auto object-cover rounded-full border-2 border-transparent  bg-gray-900 p-1 shadow-md shadow-blue-500"
      />

      <div className='py-5 border border-gray-800 px-5 mt-5'>
        <span className='block text-center text-lg font-semibold text-white'>{userData?.firstName ? userData.firstName + " " + userData.lastName : "Loading..."}
</span>
        <span className='block text-center text-lg font-semibold text-gray-500'> - {userData?.username}</span>
        <div className='flex items-center justify-start gap-5'>
          <p className='text-gray-400 '>Joined on - {formatDate(userData?.createdAt)}</p>
          <p className='bg-green-500 py-1 px-2 rounded '>{userData?.status}</p>
        </div>

      </div>

       <div className='py-5 my-5 border border-gray-800 rounded-xl'>
    <h1 className='text-xl text-center mb-4 text-gray-500 font-semibold'>Know More</h1>
    <div className='flex items-center justify-center gap-3 flex-wrap'>
  {user_seekerData?.portfolioLink ? (
    <a
      href={user_seekerData.portfolioLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
    >
      <ExternalLink className="w-5 h-5" />
      Portfolio
    </a>
  ) : (
    <span className="text-gray-500 italic">No portfolio link</span>
  )}

  {user_seekerData?.resume ? (
    <a
      href={user_seekerData.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
    >
      <ExternalLink className="w-5 h-5" />
      Resume
    </a>
  ) : (
    <span className="text-gray-500 italic">No resume uploaded</span>
  )}
</div>

  </div>
  </div>

  <div>
    <div className='py-5 mb-5'>
    <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Personal Details</h1>
    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"E-mail"} value={userData?.email} />
    <Info label={"Contact"} value={userData?.phone} />
    <Info label={"Enrolled as"} value={userData?.role} />
    <Info label={"Address"} value={userData?.address} />
  </div>
  </div>
  
  <div className='py-5 mb-5'>
    <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Professional Details</h1>
    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"Qualifications"} value={user_seekerData?.qualifications} />
    <Info label={"Currently working in "} value={user_seekerData?.currentCompany} />
    <Info label={"Posted as"} value={user_seekerData?.currentPost} />
    <Info label={"Current CTC"} value={user_seekerData?.currentCTC} />
  </div>
  </div>

  <div className='py-5 mb-5'>
    <h1 className='text-3xl mb-4 text-gray-500 font-semibold'>Abilities and Aspirations</h1>
    <div className=' flex items-center justify-start gap-3 flex-wrap '>
    <Info label={"Experience"} value={user_seekerData?.experience} />
    <Info label={"Desired Post "} value={user_seekerData?.desiredPost} />
    <Info label={"CTC expected"} value={user_seekerData?.expectedCTC} />
    <Info label={"Job Preference"} value={user_seekerData?.preferredJobType} />
    <Info label={"Location"} value={user_seekerData?.preferredLocation} />
  </div>
  </div>
 


  </div>

  </div>


</div>
 
  )
}

export default SingleUser
