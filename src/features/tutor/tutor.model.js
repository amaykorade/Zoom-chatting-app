import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    roomID: { type: String, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
})

export const tutorModel = mongoose.model("Tutor", tutorSchema);