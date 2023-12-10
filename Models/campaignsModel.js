import sequelize from "../Config/connection.js";
import {DataTypes} from "sequelize";
import User from "../Models/usersModel.js"; // imported user for the relation

const Campaign = sequelize.define("Campaign", {
  campaign_name: {type: DataTypes.STRING, allowNull: false, unique: true},
//---------------------------------------------------------------------------------------------------------------------------------1
  description: {type: DataTypes.STRING, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------2
  campaign_image: {type: DataTypes.STRING, allowNull: true}, //made it true for the upload
//---------------------------------------------------------------------------------------------------------------------------------3
  target: {type: DataTypes.INTEGER, allowNull: false}, //better for calculations
//---------------------------------------------------------------------------------------------------------------------------------4
  amount: {type: DataTypes.INTEGER, defaultValue: 0},
//---------------------------------------------------------------------------------------------------------------------------------5
  isAccepted: {type: DataTypes.BOOLEAN, defaultValue: false},
//---------------------------------------------------------------------------------------------------------------------------------6
  isHidden: {type: DataTypes.BOOLEAN, defaultValue: false}, //Added for hide campaign functionality
//---------------------------------------------------------------------------------------------------------------------------------7
  start_date: {type: DataTypes.DATEONLY, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------8
  end_date: {type: DataTypes.DATEONLY, allowNull: false},
}
)
//relations -----------------------------------------------------------------------------------------------------------------------
User.hasMany(Campaign); //one user-to-many campaigns
Campaign.belongsTo(User); //one campaign-to-one user through creatorId
 //one donation-to-one user through
Campaign.sync()
export default Campaign;