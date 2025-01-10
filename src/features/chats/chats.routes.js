import express from 'express'
import { getMessages, addMessage } from './chats.controller.js';

const chatRouter = express.Router();

// GET all messages for a room
chatRouter.get("/:room", getMessages);

// POST a new message
chatRouter.post("/", addMessage);

export default chatRouter;
