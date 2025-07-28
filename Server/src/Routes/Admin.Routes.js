import {Router} from 'express'
import { createAdmin, getAllAdmins, loginExistingAdmin } from '../Controllers/Admin.Controllers.js';


const AdminRoutes = Router();

AdminRoutes.post('/create/new',createAdmin)
AdminRoutes.post('/existing/login',loginExistingAdmin)
AdminRoutes.get('/list/all',getAllAdmins)


export default AdminRoutes;