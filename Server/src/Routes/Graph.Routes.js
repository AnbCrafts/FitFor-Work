import { Router } from "express";
import { getAllApplicantStatus, getApplicationCountPerJob, getApplicationsByJobCategory, getApplicationsByJobRole, getApplicationsByJobType, getApplicationsByLocations, getApplicationStatus, getApplicationStatusByDate, getApplicationStatusByJobCategory, getApplicationStatusByJobLocation, getProfileGrade, getWeeklyApplicationStats } from "../Controllers/Graph.Controllers.js";
 

const GraphRouter = Router(); 

GraphRouter.get('/application/status/:seekerId',getApplicationStatus)
GraphRouter.get('/application/status/:seekerId/date',getApplicationStatusByDate)
GraphRouter.get('/application/status/:seekerId/category',getApplicationStatusByJobCategory)
GraphRouter.get('/application/status/:seekerId/location',getApplicationStatusByJobLocation)
GraphRouter.get('/applicant-profile/:seekerId/grade',getProfileGrade)


// Authority Graph Routes
 

GraphRouter.get('/job-applications/:authId/count',getApplicationCountPerJob)
GraphRouter.get('/job-applications/:authId/count/weekly',getWeeklyApplicationStats)
GraphRouter.get('/job-applications/:authId/count/status',getAllApplicantStatus)
GraphRouter.get('/job-applications/:authId/count/location',getApplicationsByLocations)
GraphRouter.get('/job-applications/:authId/count/role',getApplicationsByJobRole)
GraphRouter.get('/job-applications/:authId/count/type',getApplicationsByJobType)
GraphRouter.get('/job-applications/:authId/count/category',getApplicationsByJobCategory)


export default GraphRouter; 