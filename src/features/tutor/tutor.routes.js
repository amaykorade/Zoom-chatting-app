import express from 'express';
import { createRoom, getForm, getRooms } from './tutor.controller.js';

const tutorRouter = express.Router();

tutorRouter.post('/create-room-form', createRoom);

tutorRouter.get('/', getRooms);

tutorRouter.get('/create-room-form', getForm);

export default tutorRouter;