import {sequelize} from "../Config/con";
import {DataTypes} from "sequelize";
import {User} from "./usersModel"; // imported user for the relation

const Campaign = sequelize.define("Campaign", {
  campaign_name: {type: DataTypes.STRING, allowNull: false, validate: { //try validate, if found benificial do it for all attributes
    notnull: {
      msg: "Please enter a name for the campaign"
    }
  }, unique: true},
//---------------------------------------------------------------------------------------------------------------------------------1
  description: {type: DataTypes.STRING, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------2
  campaign_image: {type: DataTypes.STRING, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------3
  target: {type: DataTypes.INTEGER, allowNull: false}, //better for calculations
//---------------------------------------------------------------------------------------------------------------------------------4
  creator_id: {type: DataTypes.INTEGER, allowNull: false, references: {
    model: User, key: "id" //connected the campaign to its unique creator through thr User's primary key
  }},
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
User.hasMany(Campaign, {foreignKey: "creator_id"}); //one user-to-many campaigns
Campaign.belongsTo(User, {foreignKey: "creator_id"}); //one campaign-to-one user through creatorId

export default Campaign;