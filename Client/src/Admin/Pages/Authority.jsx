import React from 'react'
import { useContext } from 'react';
import { WorkContext } from '../../ContextAPI/WorkContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import PageNav from '../../Global/Components/PageNav';



const Authority = () => {
  const { getAllUsersList, allUsersList } = useContext(WorkContext);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const [view, setView] = useState("List View");
  const [singleAuthorityId, setSingleAuthorityId] = useState(null);

  const navigate = useNavigate();
    
 


  useEffect(() => {
    getAllUsersList();
  }, []);



  function getFormattedDateTime(isoString) {
    const date = new Date(isoString);

    const formattedDateTime = date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return formattedDateTime;
  }

 
  const [currentAuthorityPage, setCurrentAuthorityPage] = useState(1);
  const authorityPerPage = 6;
  const indexOfLastAuthority = currentAuthorityPage * authorityPerPage;
  const indexOfFirstAuthority = indexOfLastAuthority - authorityPerPage;

  const currentAuthorities = allUsersList?.authorities.slice(
    indexOfFirstAuthority,
    indexOfLastAuthority
  );
  const totalAuthorityPages = Math.ceil(
    allUsersList?.authorities.length / authorityPerPage
  );


 

  useEffect(()=>{
    if(singleAuthorityId !== null){
      navigate(`single-authority/detail/${singleAuthorityId}`)
    }
  },[singleAuthorityId])


  return (
     <div className="min-h-[100vh] w-[90%] mx-auto">
      <div className="mb-8 mt-5 py-5 px-10 mx-auto w-fit border-t border-l border-pink-500 rounded-2xl bg-gray-800">
        <h1 className="text-4xl font-bold text-pink-500">
          User Directory & Access Control
        </h1>
        <p className="mt-2 text-gray-400 text-base max-w-3xl">
          This panel provides administrators with a centralized view of all
          registered users on the platform. Monitor user roles, account
          statuses, and take quick actions like view, edit, or suspend access.
          Use the integrated search and filters to efficiently manage and
          oversee user activity, ensuring platform security and streamlined
          operations.
        </p>
      </div>

           <div>
       
      {/* FILTERS NOT FUNCTIONAL YET */}
      <div className="flex justify-start gap-5 items-center mb-4 w-full py-5 px-10 border border-gray-600 rounded-lg bg-gray-900 ">
        <div className="w-[500px] md:w-1/3 flex items-center justify-between">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search by name or email"
            className="w-full outline-none p-2.5 text-lg border-t border-l border-b border-pink-500 shadow-sm text-white"
          />
          <button className="bg-pink-500 p-2.5 rounded-r-lg">
            <Search className="h-7.5 w-7 " />
          </button>
        </div>

        <div
          className={` px-5 py-2.5 flex items-center justify-start relative gap-5 w-[380px]`}
        >
          <div
            onClick={() => setOpenDialogBox(!openDialogBox)}
            className="flex items-center justify-between bg-pink-500 hover:bg-pink-600 cursor-pointer rounded-md px-2"
          >
            <span className="text-white px-2 py-1 text-lg cursor-pointer ">
              Filter
            </span>
            <span>
              {openDialogBox ? (
                <ArrowUp className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
              ) : (
                <ArrowDown className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
              )}
            </span>
          </div>
          <div
            className={`border border-pink-500 absolute right-0 bg-gray-900 z-10 ${
              openDialogBox ? "h-fit top-2" : "h-10"
            } text-center text-lg overflow-y-hidden`}
          >
            <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center bg-gray-800">
              All
            </span>
            <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
              All
            </span>
            <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
              All
            </span>
            <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
              All
            </span>
            <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800">
              All
            </span>
          </div>
        </div>

        <div
          className={` px-5 py-2.5 flex items-center justify-start relative gap-5 w-[380px]`}
        >
          <div
            onClick={() => setToggleView(!toggleView)}
            className="flex items-center justify-between bg-pink-500 hover:bg-pink-600 cursor-pointer rounded-md px-2"
          >
            <span className="text-white px-2 py-1 text-lg cursor-pointer ">
              View
            </span>
            <span>
              {toggleView ? (
                <ArrowUp className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
              ) : (
                <ArrowDown className="bg-gray-900 rounded-full p-0.5 h-7 w-7" />
              )}
            </span>
          </div>
          <div
            className={`border border-pink-500 absolute right-0 bg-gray-900 z-10 ${
              toggleView ? "h-fit top-2" : "h-10"
            } text-center text-lg overflow-y-hidden`}
          >
            <span className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center bg-gray-800">
              {view}
            </span>
            <span
              className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800"
              onClick={() => setView("List View")}
            >
              List View
            </span>
            <span
              className="block w-[250px] cursor-pointer hover:bg-pink-500 h-10 py-1 text-center mt-1 bg-gray-800"
              onClick={() => setView("Card View")}
            >
              Card View
            </span>
          </div>
        </div>
      </div>

     

      <div className="py-5 px-5 mt-5 bg-gray-800">
        <h1 className="text-3xl mb-5">Employers/Authorities List</h1>
        {view === "List View" ? (
          <div>
            {currentAuthorities?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="py-1 bg-gray-900 flex items-center justify-between mb-2 text-center cursor-pointer hover:shadow-xl"
                  onClick={()=>setSingleAuthorityId(item._id)}
               
               >
                  <div className="flex-1 px-5 py-2">
                    <img
                      src={item?.picture}
                      className="object-cover rounded h-15 w-15"
                      alt=""
                    />
                  </div>
                  <span className="flex-1 ml-5 text-lg overflow-hidden whitespace-nowrap text-ellipsis border-l-2 px-5 border-gray-600">
                    {item?.username}
                  </span>
                  <span className="flex-1 ml-5 text-lg overflow-hidden whitespace-nowrap text-ellipsis border-l-2 px-5 border-gray-600">
                    {item?.email}
                  </span>
                  <span className="flex-1 ml-5 text-lg overflow-hidden whitespace-nowrap text-ellipsis border-l-2 px-5 border-gray-600">
                    {item?.phone}
                  </span>
                  <div className="flex-1 ml-5 border-l-2 px-5 border-gray-600">
                    <span
                      className={`w-fit overflow-hidden whitespace-nowrap text-ellipsis px-5 py-0.5 ${
                        item?.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } rounded`}
                    >
                      {item?.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-start gap-5 flex-wrap">
            {currentAuthorities?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="py-1 bg-gray-900 rounded-2xl shadow-2xl my-2 text-center cursor-pointer hover:shadow-xl"
                  onClick={()=>setSingleAuthorityId(item._id)}
                
                >
                  <div className="p-5 w-full h-auto">
                    <img
                      src={item?.picture}
                      className="object-cover rounded h-55 w-55 mx-auto"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <span
                      className={`w-fit overflow-hidden whitespace-nowrap text-ellipsis px-5 py-0.5 ${
                        item?.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } rounded`}
                    >
                      {item?.status}
                    </span>
                  </div>

                  <div className="flex p-5 items-center justify-between flex-wrap max-w-[400px] h-auto">
                    <h2 className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                      {" "}
                      <span className="text-gray-500">Username</span> -{" "}
                      {item?.username}
                    </h2>
                    <h2 className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                      <span className="text-gray-500">E-mail</span> -{" "}
                      {item?.email}
                    </h2>
                    <h2 className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                      <span className="text-gray-500">Phone</span> -{" "}
                      {item?.phone}
                    </h2>
                    <h2 className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                      <span className="text-gray-500">Joined on - </span>
                      {getFormattedDateTime(item?.createdAt)}
                    </h2>
                  </div>

                  <div className="py-5">
                    <span className="px-10 py-1.5 border border-gray-600 rounded cursor-pointer hover:bg-green-500 ">
                      View More
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

         <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
        <PageNav currentPage={currentAuthorityPage} totalPages={totalAuthorityPages} incrementer={setCurrentAuthorityPage} />
      </div>
      </div>


    </div>

     

   
   
   



    </div>
  )
}

export default Authority
