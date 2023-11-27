import sequelize from "../Config/connection.js";
import {DataTypes} from "sequelize";
import User from "./usersModel.js"; // imported user for the relation

const Campaign = sequelize.define("Campaign", {
  campaign_name: {type: DataTypes.STRING, allowNull: false, unique: true},
//---------------------------------------------------------------------------------------------------------------------------------1
  description: {type: DataTypes.STRING, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------2
  campaign_image: {type: DataTypes.STRING, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------3
  target: {type: DataTypes.INTEGER, allowNull: false}, //better for calculations
//---------------------------------------------------------------------------------------------------------------------------------4

//---------------------------------------------------------------------------------------------------------------------------------5
  amount: {type: DataTypes.INTEGER, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------6
  isAccepted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
//---------------------------------------------------------------------------------------------------------------------------------7
  isHidden: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}, //Added for hide campaign functionality
//---------------------------------------------------------------------------------------------------------------------------------8
  start_date: {type: DataTypes.DATEONLY, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------9
  end_date: {type: DataTypes.DATEONLY, allowNull: false},
}


)
//relations -----------------------------------------------------------------------------------------------------------------------
User.hasMany(Campaign); //one user-to-many campaigns
Campaign.belongsTo(User); //one campaign-to-one user through creatorId
 //one donation-to-one user through
Campaign.sync()
export default Campaign;