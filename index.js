import express from 'express'
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import chatRouter from './src/features/chats/chats.routes.js';
import tutorRouter from './src/features/tutor/tutor.routes.js';
import handleSocketEvents from './src/config/socket.js';

const app = express();
const server = http.createServer(app);

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRouter);
app.use("/api/tutor", tutorRouter);

// Socket.IO Connection
handleSocketEvents(io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectUsingMongoose();
});
