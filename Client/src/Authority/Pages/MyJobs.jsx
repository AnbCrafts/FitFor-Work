import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { WorkContext } from '../../ContextAPI/WorkContext';
import PageNav from '../../Global/Components/PageNav';
import JobCard from '../Components/JobCard';

const MyJobs = () => {
  const { userId,hash,role } = useParams();
const {
  authData,
  getCompanyByOwnerId,
  getUserDataById,
  userData,
  getJobByAuthority,
  jobs,
  convertToStandardDateTime,
  getEmployeeByCompany,thisAuthAllEmployees,
  getUserDataByEmpId,empProfileData,resetOnExit,getUserIdByToken,globalId,
} = useContext(WorkContext);

useEffect(()=>{
const id = localStorage.getItem("userId");
  if(id){
    getCompanyByOwnerId(id);
    getUserDataById(id);

  }



},[hash])


useEffect(() => {

  if (authData && authData._id) {
    getJobByAuthority(authData._id);
    getEmployeeByCompany(authData._id);
  }
}, [authData]);







const [currentJobPage, setCurrentJobPage] = useState(1);
    const jobsPerPage = 9;
    const indexOfLastJob = currentJobPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs?.slice(
      indexOfFirstJob,
      indexOfLastJob
    );
    const totalJobPages = Math.ceil(
      jobs?.length / jobsPerPage
    );

const navigate = useNavigate();
  return (
    <div>

      <div className='mx-auto w-[90%] py-10 mt-10 border-b-2 border-t-2 border-pink-500'>
        <h1 className='text-3xl font-bold text-gray-600'>Posted Jobs</h1>
        <div className='flex items-center justify-between gap-5 flex-wrap mt-10'>

          {
            currentJobs?.map((item)=>{
              return(
                <JobCard key={item._id} id={item._id} title={item.title} jobRole={item.jobRole} deadline={convertToStandardDateTime(item.deadline)} createdAt={convertToStandardDateTime(item.createdAt)} description={item.description} totalSeats={item.totalSeats} experienceRequired={item.experienceRequired} status={item.status} jobType={item.jobType} />
              )
            })
          }

        </div>

        <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
        <PageNav currentPage={currentJobPage} totalPages={totalJobPages} incrementer={setCurrentJobPage} />
      </div>


      </div>
      
    </div>
  )
}

export default MyJobs
