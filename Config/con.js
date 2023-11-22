import { Sequelize } from "sequelize";


//  connection
const sequelize = new Sequelize('fundforall', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port:8080,
});


// testing connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize