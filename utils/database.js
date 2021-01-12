const { Sequelize } = require("sequelize");
const config = require("../config.json");


//sequalizw
const sequelize = new Sequelize("craftnepal_discordbot", config.sqlUsername, config.sqlPassword, {
     dialect: "mysql",
     host: "localhost",
});


module.exports = sequelize;
