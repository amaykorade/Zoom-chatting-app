import { tutorModel } from "./tutor.model.js";


const generateRoomID = () => {
    return Math.random().toString(36).substring(2, 10);
}

export const getForm = async (req, res) => {
    res.render("create-room");
}

export const createRoom = async (req, res) => {
    try {
        const { topic, content } = req.body;
        const roomID = await generateRoomID();

        const data = { roomID, topic, content };

        const roomData = new tutorModel({ roomID, topic, content });

        const savedRoom = await roomData.save();

        res.status(201).json(savedRoom);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await tutorModel.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}