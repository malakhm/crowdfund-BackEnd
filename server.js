import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

import sequelize from "./Config/connection.js";

import campaignRouter from "./Routes/campaignsRouter.js";
import donationsRouter from "./Routes/donationsRouter.js";
import userRouter from "./Routes/usersRouter.js";
import notificationRouter from "./Routes/notificationsRouter.js";
import adminRouter from "./Routes/adminRouter.js";

dotenv.config();
sequelize.sync();

// initialize express app
const app = express();
const server = http.createServer(app);

// middleware
// app.use(express.json())
app.use(cors());
const FRONT_END_PORT = process.env.FRONT_END_PORT;
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${FRONT_END_PORT}`,
  },
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routers
app.use("/api/users", userRouter);
app.use("/api/campaignRoute", campaignRouter);
app.use("/api/donationRoute", donationsRouter);
app.use("/api/adminRoute", adminRouter);
app.use("/api/notificationRoute", notificationRouter);

// server
// back-end port
const PORT = process.env.PORT || 8090;

// websocket
io.on("connection", (socket) => { //needs frontend code to work
    console.log(`user Connected: ${socket.id}`);
    socket.on("join_room", (room_data) => {
        // console.log("Room data object: ", room_data); //for debugg
        socket.join(room_data);
    });

    socket.on("send_announcement", (announcement_message) => { //announcement data will be sent and received as object: {message}
        // console.log("announcement data object: ", announcement_message); //to check
        socket.broadcast.emit("receive_announcement", announcement_message); //send announcement to all users in frontend, it is the same announcement received but sent as a different event to all through broadcast keyword
    });

    socket.on("send_message", (message_data) => { //message data will be an object containing {message , room}, room is a number specified by user, each user putting same number will communicate with each others
        // console.log("message data object: ", message_data); //to check
        socket.to(message_data.room).emit("receive_message", message_data); //send message data as it is to room users instead of broadcast in frontend, specify which room users through message.room {message, room}.room
    });
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
