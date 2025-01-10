import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    room: { type: String, required: true },
    sender: { type: String, required: true },
    comment: { type: String, required: true },
    prediction: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);
