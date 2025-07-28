import React, { use, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WorkContext } from '../../ContextAPI/WorkContext';

const Logo = ({path,exit}) => {

  const {exitFromPlatform} = useContext(WorkContext);
  // useEffect(()=>{
  //   if(exit ===true){
     
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   exitFromPlatform();
  
  //   }
  // },[exit]);
  

  return (
 
    
    <div className='py-2 px-6 text-center border border-indigo-500 w-fit rounded-lg shadow-2xs shadow-violet-600'>
      <Link
        to={path ? `${path}` : '/'}
        className="text-3xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text"
      >
        FitFor <span className="text-white">Work</span>
      </Link>
    </div> 
  );
};

export default Logo;
