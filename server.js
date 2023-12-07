import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/connection.js";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from 'socket.io';
import bodyParser from "body-parser";

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
const FRONT_END_PORT = process.env.FRONT_END_PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const io = new SocketIOServer(server, {
  cors: {
    origin: `http://localhost:${FRONT_END_PORT}`,
    methods: ["GET", "POST"],
    credentials: true
  }
});

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
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("send_notification", (notification_message) => {
    //notification data will be sent and received as object: {message}
    console.log("notification data object: ", notification_message); //to check
    socket.broadcast.emit("receive_notification", notification_message); //send notification to all users in frontend, it is the same notification received but sent as a different event to all through broadcast keyword
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

server.listen

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});