import React, { useContext, useEffect, useState } from "react";
import PortalHeader from "../Components/PortalHeader";
import { Upload } from "lucide-react";
import { WorkContext } from "../../ContextAPI/WorkContext";
import { useNavigate } from "react-router-dom";

const Enroll = () => {
  const [existing, setExisting] = useState(true);
  const [img, setImg] = useState(null);

  const [adminLogin, setAdminLogin] = useState(false);

  const {
    registerUser,
    registerIndicator,
    setRegisterIndicator,
    userId,   
    setAuthorityId,
    setAuthorityToken,
    setSeekerToken,
    setSeekerId,
    seekerId,
    seekerToken,
    userToken,
    authorityToken,
    authorityId,
    adminId,
    adminToken,
    loginAdmin,
    adminData,
    securePath
  } = useContext(WorkContext);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    role: "",
    address: "",
    picture: "",
  });

  const [loginUserData, setLoginUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userData, picture: file });
      setImg(URL.createObjectURL(file));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!existing) {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("role", userData.role);
      if (userData.picture) {
        formData.append("picture", userData.picture);
      }
      console.log(formData);
      registerUser(formData, "new");
    } else {
      const loginData = {
        username: loginUserData.username,
        email: loginUserData.email,
        password: loginUserData.password,
        role: loginUserData.role,
      };

      registerUser(loginData, "login");
    }
  };

  useEffect(() => {
    if (registerIndicator) {
      if (userData.role === "Seeker" || loginUserData.role === "Seeker") {
        setSeekerToken(userToken);
        setSeekerId(userId);
      } else if (
        userData.role === "Authority" ||
        loginUserData.role === "Authority"
      ) {
        setAuthorityId(userId);
        setAuthorityToken(userToken);
      }

      // const id = localStorage.getItem("userId");


      setUserData({
        firstName: "",
        lastName: "",
        phone: "",
        username: "",
        email: "",
        password: "",
        role: "",
        picture: "",
        address: "",
      });
      setImg(null);
      setRegisterIndicator(false);
    }
  }, [registerIndicator, userData.role, userId, userToken,securePath]);

  useEffect(() => {
    setLoginUserData({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    console.log(loginUserData);
  }, [userData]);



  const [adminForm, setAdminForm] = useState({
    adminName:"",
    secretCode:""
  })

  const loginAdminHandler = async(e)=>{

    e.preventDefault();
      await loginAdmin(adminForm);
  
   
    }

  return (
    <div className="min-h-[100vh] w-[90%] mx-auto py-5">
      <PortalHeader />

      <div className="p-10 my-5 bg-gray-900 shadow-2xl rounded-xl">
        <div className="w-fit mx-auto">
          <h1 className="text-5xl font-bold inline bg-gradient-to-r from-pink-500 via-violet-400 to-blue-400 text-transparent bg-clip-text ">
            {existing ? "Welcome back!!!" : "Welcome to FitFor Work"}
          </h1>
          <p className=" py-2 text-gray-400 text-lg">
            {existing
              ? "Login to your account, your may have new notifications"
              : "Create a new account, connect with us and explore yourr journey"}
          </p>
        </div>


        {
          adminLogin
          ?
          (<form onSubmit={loginAdminHandler}  className="w-[90%] mx-auto border border-green-500 py-5 px-5 max-w-[900px]">
<div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="adminName"
                  className="text-lg w-[150px] font-semibold text-gray-400"
                >
                  Admin Name
                </label>
                <input
                  type="text"
                  id="adminName"
                  name="adminName"
                  className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                  placeholder="Enter your admin name"
                  value={adminForm.adminName}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, adminName: e.target.value })
                  }
                />
              </div>
<div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="secretCode"
                  className="text-lg w-[150px] font-semibold text-gray-400"
                >
                  Secret Code
                </label>
                <input
                  type="text"
                  id="secretCode"
                  name="secretCode"
                  className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                  placeholder="Enter your secret Code"
                  value={adminForm.secretCode}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, secretCode: e.target.value })
                  }
                />
              </div>


              <div className="w-fit mx-auto my-10">
            <button
              type="submit"
              className="text-lg font-semibold px-10 py-2 shadow-2xl border border-[#8080804b] hover:bg-blue-700 hover:border-transparent transition-all cursor-pointer"
            >
              Login
            </button>
          </div>
                  

          </form>)
          :
       ( <form onSubmit={submitHandler}>
          <div className="w-[75%] mx-auto h-auto p-5 my-5 border border-blue-500 flex items-center justify-between flex-col">
            {!existing && (
              <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="firstName"
                  className="text-lg w-[150px] font-semibold text-gray-400"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                  placeholder="Enter your firstName"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </div>
            )}

            {!existing && (
              <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="lastName"
                  className="text-lg w-[150px] font-semibold text-gray-400"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                  placeholder="Enter your lastName"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
            )}

            {!existing && (
              <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="phone"
                  className="text-lg w-[150px] font-semibold text-gray-400"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                  placeholder="Enter your phone number"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </div>
            )}

            <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
              <label
                htmlFor="username"
                className="text-lg w-[150px] font-semibold text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                placeholder="Enter your username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
              <label
                htmlFor="email"
                className="text-lg w-[150px] font-semibold text-gray-400"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
              <label
                htmlFor="password"
                className="text-lg w-[150px] font-semibold text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            {!existing && (
              <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="address"
                  className="text-lg h-10 w-[150px] font-semibold text-gray-400"
                >
                  Address
                </label>
                <textarea
                  type="text"
                  id="address"
                  name="address"
                  className="px-5 text-gray-200 text-lg py-2 border-b-2 border-pink-500 outline-none h-12 flex-1 block max-w-[700px]"
                  placeholder="Enter your address"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              </div>
            )}
            {!existing && (
              <div className="flex items-center justify-start gap-5 mb-5 my-2 w-full ">
                <label
                  htmlFor="picture"
                  className={` ${
                    img
                      ? "h-[100px] w-[150px] rounded-xl border-transparent shadow-2xl shadow-gray-600"
                      : " h-12 px-5"
                  } text-gray-200 text-lg py-2 border border-pink-500 outline-none flex items-center justify-between gap-5 cursor-pointer`}
                >
                  {img ? (
                    <img
                      src={img}
                      alt="file"
                      className="w-[150px] h-[100px] rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <Upload /> <span>Upload profile picture</span>
                    </>
                  )}
                </label>

                <input
                  type="file"
                  id="picture"
                  name="picture"
                  className="hidden"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            )}

           <div className="flex items-center justify-start gap-8 w-full py-2">
  <div className="flex items-center gap-2 justify-center">
    <input 
      type="radio"
      name="role"
      id="seeker"
      value="Seeker"
      checked={userData.role === "Seeker"}
      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
    />
    <label htmlFor="seeker">Job Seeker</label>
  </div>

  <div className="flex items-center gap-2 justify-center">
    <input
      type="radio"
      name="role"
      id="authority"
      value="Authority"
      checked={userData.role === "Authority"}
      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
    />
    <label htmlFor="authority">Employer</label>
  </div>
</div>

          </div>

          <div className="w-fit mx-auto">
            <p className="text-gray-400">
              {existing
                ? "Don't have an account? No worries, "
                : "Already have an account? Great! "}
              <span
                onClick={() => setExisting(!existing)}
                className="text-lg font-bold text-gray-200 cursor-pointer"
              >
                {
                existing ? "Create an account " : "Login to your account "
                }                
              </span>
            </p>
          </div>
          <div className="w-fit mx-auto my-10">
            <button
              type="submit"
              className="text-lg font-semibold px-10 py-2 shadow-2xl border border-[#8080804b] hover:bg-blue-700 hover:border-transparent transition-all cursor-pointer"
            >
              {existing ? "Login" : "Create account"}
            </button>
          </div>
        </form>)
        }




            
                
              


        <div className="w-[90%] mx-auto mt-10 py-5">
                <span onClick={()=>setAdminLogin(!adminLogin)} className="text-gray-400 font-semibold block mx-auto w-fit py-1.5 px-9 border cursor-pointer hover:bg-white hover:text-gray-900 transition-all rounded">{adminLogin?"I am an ordinary user":"I am an Admin "}</span>
                
        </div>


      </div>
    </div>
  );
};

export default Enroll;
