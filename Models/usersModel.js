import sequelize from "../Config/connection.js"
import { DataTypes } from "sequelize"

import bcrypt from 'bcrypt'
const User = sequelize.define("users", {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        
        unique: true
    },
    password :{
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
        },
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY, //use YYYY-MM-DD for input
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
    },
    isDonor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isCreator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    confirmedByAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

User.sync()
export default User