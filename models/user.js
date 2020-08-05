const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
     id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
     },
     hasTicket: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
     },

     hasViolations: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
     },
});

module.exports = User;
