import { DataTypes } from "sequelize";
import sequelize from "../Config/connection.js";
import Donation from "./donationsModel.js";

const Notifications = sequelize.define("Notifications", {
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Donation.hasMany(Notifications); 
Notifications.belongsTo(Donation); 

Notifications.sync();

export default Notifications;
