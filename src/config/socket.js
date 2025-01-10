import { Message } from "../features/chats/chats.model.js";
import { tutorModel } from "../features/tutor/tutor.model.js";

const handleSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        // Handle joining a room
        socket.on("join_room", async ({ roomID, userName }) => {
            try {
                const roomExists = await checkRoomExists(roomID);

                if (!roomExists) {
                    socket.emit("room_error", { error: "Room does not exist" });
                    return;
                }

                socket.join(roomID);
                console.log(`${userName} joined room: ${roomID}`);


                // Fetch previous messages for the room
                const roomMessages = await fetchRoomMessages(roomID);

                // Send previous messages to the user
                socket.emit("room_messages", roomMessages);
            } catch (err) {
                console.error("Error during room joining:", err);
                socket.emit("room_error", { error: "An error occurred while joining the room" });
            }
        });

        // Handle sending a message
        socket.on("send_message", async (data) => {
            const { room, sender, chat } = data;

            try {
                // Send a POST request to the API endpoint
                const response = await axios.post("http://localhost:5000/api/chat/", {
                    room,
                    sender,
                    chat,
                });

                // Broadcast the saved message to all users in the room
                io.to(room).emit("receive_message", response.data);
            } catch (err) {
                console.error("Error saving or broadcasting message:", err.message);
                socket.emit("message_error", { error: "Message could not be sent" });
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

export default handleSocketEvents;


const checkRoomExists = async (roomID) => {
    try {
        const room = await tutorModel.findOne({ roomID });
        return !!room;
    } catch (err) {
        console.error("Error checking room existence:", err);
        throw err;
    }
};

const fetchRoomMessages = async (roomID) => {
    try {
        const messages = await tutorModel.find({ roomID: roomID }).sort({ createdAt: 1 });
        return messages;
    } catch (err) {
        console.error("Error fetching room messages:", err);
        return [];
    }
};
