import React, { useEffect, useState } from 'react';
import Logo from '../../Global/Components/Logo';
import { Link, useLocation, useParams } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const { role, userId,hash } = useParams();
  const [navPath, setNavPath] = useState("");

  useEffect(() => {
    setNavPath(`/auth/${role}/${hash}`);
  }, [role, hash]);

  const navItems = [
    { name: 'Home', path: '' },
    { name: 'User', path: 'user' },
    { name: 'Applicants', path: 'applicant' },
    { name: 'Authority', path: 'authority' },
    { name: 'Employees', path: 'employee' },
    { name: 'Notifications', path: 'notification' },
  ];

  const currentPath = location.pathname.replace(/\/$/, ''); // remove trailing slash

  return (
    <div className='w-full h-auto flex items-center py-2 justify-start gap-10'>
      <div className='pt-4'>
        <Logo path={navPath} />
      </div>

      <div className='flex items-center justify-start gap-10 w-auto py-2 px-5'>
        {navItems.map(item => {
          const fullPath = `/auth/${role}/${hash}${item.path ? `/${item.path}` : ''}`;
          const isActive = currentPath === fullPath;

          return (
            <Link
              key={item.name}
              to={fullPath}
              className={`text-md px-4 py-1 ${isActive ? "bg-gray-900" : "bg-transparent"} cursor-pointer rounded-md shadow shadow-gray-900 hover:shadow-gray-500 hover:shadow-2xl`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
