import sequelize from "../Config/connection.js"
import { DataTypes } from "sequelize"

const User = sequelize.define("users", {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        
        unique: true
    },
    password :{
        type: DataTypes.STRING,
        allowNull: false,
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
        unique:true,
    },
    dob: {
        type: DataTypes.DATE,
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

export default User