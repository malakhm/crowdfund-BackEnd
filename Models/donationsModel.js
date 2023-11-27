import sequelize from "../Config/connection.js";
import {DataTypes} from "sequelize";
import User from "../Models/usersModel.js"; // imported user for the relation
import Campaign from "../Models/campaignsModel.js";

const Donation = sequelize.define("Donation", {
  

//---------------------------------------------------------------------------------------------------------------------------------1
  amount: {type: DataTypes.INTEGER, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------2
  //created date is being automatically created
}
)

User.hasMany(Donation); 
Donation.belongsTo(User); 
 //one user-to-many campaigns
Campaign.hasMany(Donation);
Donation.belongsTo(Campaign) 


Donation.sync();

export default Donation;