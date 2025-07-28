import { Router } from "express";
import { createNotification, getAllNotifications, getAllNotificationsById, getNotificationByType, getNotificationsByUserId, sendFeedbackToAdmin } from "../Controllers/Notification.Controllers.js";


const notificationRouter = Router(); 

notificationRouter.get('/user/:userId/list/all', getNotificationsByUserId)
notificationRouter.get('/list/all/:notificationId', getAllNotificationsById)
notificationRouter.get('/list/all', getAllNotifications)
notificationRouter.get('/list/all/:type', getNotificationByType)
notificationRouter.post('/admin/:adminId/send', createNotification)
notificationRouter.post('/user-feedback/send', sendFeedbackToAdmin)
  
 
export default notificationRouter

