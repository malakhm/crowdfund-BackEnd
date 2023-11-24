import sequelize from "../Config/connection.js";
import {DataTypes} from "sequelize";
import User from "../Models/usersModel.js"; // imported user for the relation
import Campaign from "../Models/campaignsModel.js";

const Donation= sequelize.define("Donation", {
  

//---------------------------------------------------------------------------------------------------------------------------------5
  amount: {type: DataTypes.INTEGER, allowNull: false},
//---------------------------------------------------------------------------------------------------------------------------------9
  date_of_donation: {type: DataTypes.DATE, allowNull: false},
}
)

  User.hasMany(Donation); 
Donation.belongsTo(User); 
 //one user-to-many campaigns
Campaign.hasMany(Donation);
Donation.belongsTo(Campaign) 


Donation.sync({force:true});

export default Donation;