import { DataTypes } from "sequelize";
import sequelize from "../Config/connection.js";
import Donation from "./donationsModel.js";

const Notifications = sequelize.define("Notifications", {
  description: { type: DataTypes.STRING, allowNull: false },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Donation.hasOne(Notifications);
Notifications.belongsTo(Donation);

Notifications.sync();

export default Notifications;
