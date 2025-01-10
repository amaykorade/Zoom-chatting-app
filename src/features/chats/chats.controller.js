import { tutorModel } from "../tutor/tutor.model.js";
import { lstm } from "../utils/lstm.js";
import { Message } from "./chats.model.js";

// Fetch messages for a specific room
export const getMessages = async (req, res) => {
    try {
        const { room } = req.params;

        const tutor = await tutorModel.findOne({ roomID: room }).populate("messages");

        if (!tutor) {
            return res.status(404).json({ error: "Tutor not found" });
        }

        res.status(200).json(tutor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new message
export const addMessage = async (req, res) => {
    try {
        const { room, sender, chat } = req.body;

        const result = await lstm(chat);

        const comment = result.results[0].comment;
        const prediction = result.results[0].prediction;

        // console.log("result: ", result);

        const tutor = await tutorModel.findOne({ roomID: room });
        if (!tutor) {
            return res.status(200).json({ error: "Room does not exist" }); // Return here to stop execution
        }

        const message = new Message({ room, sender, comment, prediction });
        await message.save();

        tutor.messages.push(message._id);
        await tutor.save();

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

