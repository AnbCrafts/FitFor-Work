import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import User from './Pages/User'
import Authority from './Pages/Authority'
import Applicant from './Pages/Applicant'
import Navbar from './Components/Navbar'
import "react-datepicker/dist/react-datepicker.css";
import SingleUser from './Components/SingleUser'
import SingleAuth from './Components/SingleAuth'
import SingleApplicant from './Components/SingleApplicant'
import Notifications from './Pages/Notifications'
 
const AdminApp = () => {
  
  return (
    <div>
      
    <div className='w-[90%] mx-auto'>
      <Navbar/>

</div>
 
      <Routes> 
        <Route path='/' element={<Home/>} />
        <Route path='user' element={<User />}></Route> 

        <Route path='notification' element={<Notifications/>} />
        <Route path='authority' element={<Authority/>} />
        <Route path='applicant' element={<Applicant/>} />
        <Route path='applicant/single-applicant/detail/:applicantId' element={<SingleApplicant />} />
        <Route path='user/single-seeker/detail/:userId' element={<SingleUser />} />
        <Route path='user/single-authority/detail/:userId' element={<SingleAuth path={"user"} />} />
        <Route path='authority/single-authority/detail/:userId' element={<SingleAuth path={"authority"} />} />
        
      </Routes>
      
      
    </div>
  )
}

export default AdminApp
