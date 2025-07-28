import React from 'react';
import { Link, useParams } from 'react-router-dom';
 
const Logo = () => {
  const {hash} = useParams();
    const path = `/auth/authority/${hash}`;

  return (
    <div className='py-2 px-6 text-center border border-indigo-500 w-fit rounded-lg shadow-2xs shadow-violet-600'>
      <Link
        to={`${path}`}
        className="text-3xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text"
      >
        FitFor <span className="text-white">Work</span>
      </Link>
    </div>
  );
};

export default Logo;
