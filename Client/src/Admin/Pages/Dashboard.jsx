import React from 'react'
import UserRegistrationsGraph from '../Components/Line'
import ActiveJobsByCategory from '../Components/Bar'
import TopAppliedJobs from '../Components/BarChart'
import TopSkillsGraph from '../Components/BarChartSkills'
import TopEmployersGraph from '../Components/BarChartEmp'

const Dashboard = () => {
  return (
    <div className='flex items-center gap-5 flex-wrap justify-start'>
      
      <UserRegistrationsGraph/>
      <ActiveJobsByCategory/>
      <TopAppliedJobs/>
      <TopSkillsGraph/>
      <TopEmployersGraph/>

    </div>
  )
}

export default Dashboard
