import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from '../Global/Pages/About'
import Contact_ from '../Global/Pages/Contact'
import Help from '../Global/Pages/Help'
import Services from '../Global/Pages/Services'
import Notification from './Pages/Notification'
import Profile from './Pages/Profile'
import EmployerForm from './Pages/EmployerForm'
import CreateJob from './Pages/CreateJob'
import SingleJob from './Components/SingleJob'
import Navbar from './Components/Navbar'
import SingleApplicant from './Components/SingleApplicant'
import SingleNotification from './Components/SingleNotification'
import Error from './Pages/Error'
import SingleEmployee from './Components/SingleEmployee'
import MyJobs from './Pages/MyJobs'
import CustomSuggestion from './Pages/CustomSuggestion'
import Applicant from './Pages/Applicant'
import Employee from './Pages/Employee'
import SeekerDetailsCard from './Components/DetailedSeeker'
import AllSuggestedSeekers from './Pages/AllSuggestedSeekers'
import EditPanel from './Pages/EditPanel'
import ChatBox from '../Global/Pages/ChatBox'

 
const AuthorityApp = () => {
  return (
    <div> 

      <Navbar/>  


      <Routes>
        <Route path='*' element={<Error/>} />
        <Route path='/' element={<Home/>} />
        <Route path='about' element={<About/>} />
        <Route path='contact' element={<Contact_/>} />
        <Route path='help' element={<Help/>} />
        <Route path='service' element={<Services/>} />
        <Route path='notification' element={<Notification/>} />
        <Route path='notification/:notificationId/read' element={<SingleNotification/>} />
        <Route path='profile' element={<Profile/>} /> 
        <Route path='profile/job/:jobId' element={<SingleJob/>} />
        <Route path='profile/job/:jobId/applicant/profile-detail/:applicantId' element={<SingleApplicant/>} />
        <Route path='profile/job/:jobId/employee/profile-detail/:empId' element={<SingleEmployee/>} />
        <Route path='notification/:notificationId/read/applicant/profile-detail/:applicantId' element={<SingleApplicant/>} />
        <Route path='notification/:notificationId/read/job/:jobId' element={<SingleJob/>} />
        <Route path='build/employer-form' element={<EmployerForm/>} />
        <Route path='create/job-vacancy' element={<CreateJob/>} />
        <Route path='jobs' element={<MyJobs/>} />
        <Route path='jobs/job/:jobId' element={<SingleJob/>} />

        <Route path='custom-suggestions/:params' element={<CustomSuggestion/>} />
        <Route path='applicant' element={<Applicant/>} />
        <Route path='employee' element={<Employee/>} />
        <Route path='suggested/detail/:id' element={<SeekerDetailsCard/>} />
        <Route path='profile/suggested/detail/:id' element={<SeekerDetailsCard/>} />
        <Route path='profile/suggested/list/all/:id' element={<SeekerDetailsCard/>} />
        <Route path='suggested/list/all/:id' element={<SeekerDetailsCard/>} />
        <Route path='suggested/list/all' element={<AllSuggestedSeekers/>} />
        <Route path='profile/suggested/list/all' element={<AllSuggestedSeekers/>} />
        <Route path='profile/edit-panel' element={<EditPanel/>} />
        <Route path='edit-panel' element={<EditPanel/>} />
        <Route path='help/chat' element={<ChatBox/>} />
        <Route path='seeker/chat' element={<ChatBox/>} />


  
      </Routes>
      
    </div>
  )
}

export default AuthorityApp
