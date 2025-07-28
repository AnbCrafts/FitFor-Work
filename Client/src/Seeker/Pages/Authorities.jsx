import React, { useContext, useEffect, useState } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'
import Company from '../Components/Company';
import PageNav from '../../Global/Components/PageNav';
import { useParams } from 'react-router-dom';
import CompanyCard from '../Components/Company';
import OverView from '../Components/CompanyOverView';

const Authorities = () => {
    const{singleJob,getJobByAuthority,jobs,getWantedAuthorities,
wantedAuth,getSeekerDataByUserId,user_seekerData} = useContext(WorkContext);

const {hash} = useParams();
const [limit,setLimit] =useState(10);
const [page,setPage] = useState(1);

    useEffect(()=>{
      const userId = localStorage.getItem("userId");
      if(userId){
getSeekerDataByUserId(userId);
      }

    },[hash]);

    useEffect(()=>
      {
        if(user_seekerData && user_seekerData._id){
          getWantedAuthorities(user_seekerData._id,page,limit);
        }
      })


      // useEffect(()=>{
      //   console.log(wantedAuth)
      // },[wantedAuth])

  return (
    <div className='min-h-[100vh] w-[90%] mx-auto '>
      <div className="w-full text-left max-w-6xl mx-auto mb-6 px-4 py-5 bg-gray-900 rounded-2xl shadow-2xl">
  <h2 className="text-3xl font-bold text-pink-500 mb-2">Recommended Employers</h2>
  <p className="text-gray-400 text-lg ">
    We've matched your skills with top employers actively seeking talent like you. Explore brief company overviews below and discover your best-fit opportunities. Click on any card to view detailed insights, open roles, and more.
  </p>
</div>

    <div >
      {
        wantedAuth && wantedAuth.authorities && wantedAuth.authorities.length>0 && wantedAuth.authorities.map((item,index)=>{
          return(
            <OverView company={item} key={index} id={item._id} />
            // <CompanyCard company={item} key={index} id={item._id} />
          )
        })
      }

    </div>


      
    </div>
  )
}

export default Authorities
