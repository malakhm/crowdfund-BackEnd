import sequelize from "../config/db.Config.js"
import { DataTypes } from "sequelize"
import bcrypt from 'bcrypt'
const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
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
        default: false,
        allowNull: false,

    },
    isCreator: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,

    },
    confirmedByAdmin: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,

    },
   

}, {
    hooks: {
     beforeCreate: async (user) => {
      if (user.password) {
       const salt = await bcrypt.genSaltSync(10, 'a');
       user.password = bcrypt.hashSync(user.password, salt);
      }
    }
},
})

User.sync()

export default User