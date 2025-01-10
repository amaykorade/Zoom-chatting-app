import express from 'express';
import { createRoom, getRooms } from './tutor.controller.js';

const tutorRouter = express.Router();

tutorRouter.post('/', createRoom);

tutorRouter.get('/', getRooms);

export default tutorRouter;