import notificationsController from "../Controllers/notificationsController.js";
import express from "express";

const notificationRouter = express.Router();

notificationRouter.create("/", notificationsController.addNotifcations);

notificationRouter.get("/", notificationsController.findallNotifcations);

notificationRouter.get("/:id", notificationsController.findNotificationsByPk);

export default notificationRouter;
