const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");
const { databaseVersion } = require("../utils/database");

const Ticket = sequelize.define("ticket", {
     id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
     },
     isResolved: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
     },

     subject: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     log: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     resolvedAt: {
          type: DataTypes.DATE,
          allowNull: true,
     },
});

module.exports = Ticket;
