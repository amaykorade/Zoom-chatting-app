import { Message } from "./chats.model.js";

// Fetch messages for a specific room
export const getMessages = async (req, res) => {
    try {
        const room = req.params.room;
        const messages = await Message.find({ room });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new message
export const addMessage = async (req, res) => {
    try {
        const { room, sender, content } = req.body;
        const message = new Message({ room, sender, content });
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

