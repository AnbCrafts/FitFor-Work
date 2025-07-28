// routes/messageRoutes.js

import express from "express";
import { getAllPings, getMessages, readMessages, sendMessage } from "../Controllers/Message.Controllers.js";

const MessageRouter = express.Router();

MessageRouter.post("/send", sendMessage);       // Send a message
MessageRouter.get("/all-pings/receiver=:receiverId", getAllPings);    
MessageRouter.get("/all/sender=:senderId&receiver=:receiverId", getMessages);    
MessageRouter.put("/all/sender=:senderId&receiver=:receiverId/read", readMessages);    

export default MessageRouter;
