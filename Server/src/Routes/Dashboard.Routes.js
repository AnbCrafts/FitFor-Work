import { Router } from "express";
import { getSuggestedJobsForSeeker } from "../Controllers/DashboardData.Controllers.js";


const DashboardRouter = Router();

DashboardRouter.get("/suggested-jobs/:seekerId",getSuggestedJobsForSeeker)


export default DashboardRouter;
