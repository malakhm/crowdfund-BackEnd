import { DataTypes } from "sequelize";
import sequelize from "../Config/con.js";
import bcrypt from "bcrypt";
// const sequelize = new Sequelize('');

const Admin = sequelize.define(
  "Admin",
  {
    username: { 
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
  }
);
Admin.sync();
export default Admin;
