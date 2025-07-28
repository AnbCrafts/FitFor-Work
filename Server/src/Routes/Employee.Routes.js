import { Router } from "express";
import { getAllEmployees, getEmployeeByCompanyId, getEmployeeById, getEmployeeByJobId, getEmployeeBySeekerId, getUserDataByEmployeeId, removeEmployee } from "../Controllers/Employee.Controllers.js";
  
 
const EmployeeRouter = Router(); 

EmployeeRouter.get('/list/all',getAllEmployees);
EmployeeRouter.delete('/list/all/:empId/remove',removeEmployee);
EmployeeRouter.get('/list/all/:empId',getEmployeeById);
EmployeeRouter.get('/list/all/job/:jobId',getEmployeeByJobId);
EmployeeRouter.get('/list/all/company/:compId',getEmployeeByCompanyId);
EmployeeRouter.get('/list/all/seeker/:seekerId',getEmployeeBySeekerId);
EmployeeRouter.get('/profile-data/:empId',getUserDataByEmployeeId);



export default EmployeeRouter