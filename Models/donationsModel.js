import {sequelize} from "../Config/con";
import {DataTypes} from "sequelize";
import {User} from "./usersModel"; // imported user for the relation
import {Campaign} from "./campaignsModel"; // imported campaign for the relation

const Donation= sequelize.define("Donation", {
  
 campaign_id: {type: DataTypes.INTEGER, allowNull: false, references: {
    model: Campaign, key: "id" 
  }},
//---------------------------------------------------------------------------------------------------------------------------------5
  amount: {type: DataTypes.INTEGER, allowNull: false},

  donor_id: {type: DataTypes.INTEGER, allowNull: false, references: {
    model: User, key: "id" 
  }},
  
//---------------------------------------------------------------------------------------------------------------------------------9
  date_of_donation: {type: DataTypes.DATEONLY, allowNull: false},
}
)
//relations -----------------------------------------------------------------------------------------------------------------------
User.hasMany(Donation, {foreignKey: "donor_id"}); 
Donation.belongsTo(User, {foreignKey: "donor_id"}); 

Campaign.hasMany(Donation, {foreignKey: "campaign_id"}); //one user-to-many campaigns
Donation.belongsTo(Campaign, {foreignKey: "campaign_id"}); //one campaign-to-one user through campaignId
export default Donation;