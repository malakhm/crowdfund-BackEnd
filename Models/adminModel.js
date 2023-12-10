import { DataTypes } from "sequelize";
import sequelize from "../Config/connection.js";
import bcrypt from "bcrypt";
// const sequelize = new Sequelize('');

const Admin = sequelize.define("Admin", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});
Admin.sync();
export default Admin;
