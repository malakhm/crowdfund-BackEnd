import notificationsController from "../Controllers/notificationsController.js";
import express from "express";

const notificationRouter = express.Router();

notificationRouter.get("/", notificationsController.findallNotifcations);

notificationRouter.get("/", notificationsController.findNotificationsByPk);

export default notificationRouter;
