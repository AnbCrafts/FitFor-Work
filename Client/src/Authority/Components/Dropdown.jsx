import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { WorkContext } from '../../ContextAPI/WorkContext';

const Dropdown = ({ Links, def }) => {
  const {getUserIdByToken,globalId} = useContext(WorkContext)
  const [linkTxt, setLinkTxt] = useState(def.label);
  const [slug, setSlug] = useState(def.slug);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { userId ,hash,role} = useParams();
  const [navPath, setNavPath] = useState('');

  const location = useLocation();

 useEffect(()=>{
 const token = localStorage.getItem("userToken");
 if(token){
   getUserIdByToken(token);
 }
 },[hash])

  const clickHandler = (item) => {
    setLinkTxt(item.label);
    setSlug(item.slug);
    setToggleDropdown(false);
  };

  useEffect(() => {
    setNavPath(`/auth/${role}/${hash}`);
  }, [hash]);

  useEffect(() => {
    const currentSlug = location.pathname.split("/").pop(); // get last segment
    const found = Links.find(item => item.slug === currentSlug);
    if (found) {
      setLinkTxt(found.label);
      setSlug(found.slug);
    }
  }, [location.pathname]);

  return (
    <div className='h-10 text-center text-lg w-[200px] max-w-[200px] relative z-10'>
      <div className='rounded border border-[#0000ff6f] cursor-pointer py-1 flex items-center justify-between hover:border-[blue] transition-all'>
        <Link
          to={`${navPath}/${slug}`}
          className='inline-block ml-2 text-white text-ellipsis overflow-hidden whitespace-nowrap'
        >
          {linkTxt}
        </Link>
        <img
          src={toggleDropdown ? assets.up : assets.down}
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className='h-6 w-6 inline-block mr-2 bg-white rounded cursor-pointer'
          alt='toggle'
        />
      </div>

      <div className={`mt-3 absolute transition-all delay-200 w-full z-50 ${toggleDropdown ? "top-7" : "-top-[400px]"}`}>
        {Links.map((item, index) => (
          <span
            key={index}
            onClick={() => clickHandler(item)}
            className='block py-1 my-3 bg-gray-900 rounded transition-all cursor-pointer hover:bg-[#000] hover:text-gray-300'
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
