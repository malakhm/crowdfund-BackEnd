import {sequelize} from "../Config/con";
import {DataTypes} from "sequelize";
import {User} from "./usersModel"; // imported user for the relation

const Campaign = sequelize.define("Campaign", {
  name: {type: DataTypes.STRING, allowNull: false, unique: true},
  description: {type: DataTypes.STRING, allowNull: false},
  image: {type: DataTypes.STRING, allowNull: false},
  target: {type: DataTypes.INTEGER, allowNull: false}, //better for calculations
  creatorId: {type: DataTypes.INTEGER, allowNull: false, references: {
    model: User, key: "id" //connected the campaign to its unique creator through thr User's primary key
  }},
  amount: {type: DataTypes.INTEGER, allowNull: false},
  isAccepted:{type: DataTypes.BOOLEAN, allowNull: false},
  startDate: {type: DataTypes.DATEONLY, allowNull: false},
  endDate: {type: DataTypes.DATEONLY, allowNull: false},
}
)
User.hasMany(Campaign, {foreignKey: "creatorId"}); //one user-to-many campaigns
Campaign.belongsTo(User, {foreignKey: "creatorId"}); //one campaign-to-one user through creatorId

export default Campaign;