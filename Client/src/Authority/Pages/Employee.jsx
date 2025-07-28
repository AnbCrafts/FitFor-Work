import React, { useContext } from 'react'
import { WorkContext } from '../../ContextAPI/WorkContext'

const Employee = () => {
  const {getEmployeeByCompany,thisAuthAllEmployees} = useContext(WorkContext);
  return (
    <div>
      
    </div>
  )
}

export default Employee
