const handleSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        // Handle joining a room
        socket.on("join_room", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
        });

        // Handle sending a message
        socket.on("send_message", (data) => {
            console.log(`Message from ${socket.id}:`, data);
            io.to(data.room).emit("receive_message", data);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

export default handleSocketEvents;
