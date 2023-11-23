import {sequelize} from "../Config/con";
import {DataTypes} from "sequelize";
import {User} from "./usersModel"; // imported user for the relation

const Campaign = sequelize.define("Campaign", {
  campaign_name: {type: DataTypes.STRING, allowNull: false, validate: { //try validate, if found benificial do it for all attributes
    notnull: {
      msg: "Please enter a name for the campaign"
    }
  }, unique: true},
  description: {type: DataTypes.STRING, allowNull: false},
  campaign_image: {type: DataTypes.STRING, allowNull: false},
  target: {type: DataTypes.INTEGER, allowNull: false}, //better for calculations
  creator_id: {type: DataTypes.INTEGER, allowNull: false, references: {
    model: User, key: "id" //connected the campaign to its unique creator through thr User's primary key
  }},
  amount: {type: DataTypes.INTEGER, allowNull: false},
  isAccepted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  isHidden: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  start_date: {type: DataTypes.DATEONLY, allowNull: false},
  end_date: {type: DataTypes.DATEONLY, allowNull: false},
}
)
User.hasMany(Campaign, {foreignKey: "creator_id"}); //one user-to-many campaigns
Campaign.belongsTo(User, {foreignKey: "creator_id"}); //one campaign-to-one user through creatorId

export default Campaign;