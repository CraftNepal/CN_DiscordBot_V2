const fs = require("fs");
const config = require("./config.json");

const Discord = require("discord.js");
const discord = require("./client");
discord.connect();
const client = discord.client();

const eventsController = require("./controllers/eventsController");

const errorController = require("./controllers/errorController");

const sequelize = require("./utils/database");

const User = require("./models/user");

const Ticket = require("./models/ticket");

User.hasMany(Ticket);
Ticket.belongsTo(User);

sequelize
     .sync({ force: false })
     .then((result) => {
          console.log("Successfully connected to database");
     })
     .catch((err) => {
          console.log(
               "Could not connect to SQL database. For furthur Info, check Sequelize in index.js and check error"
          );
     });
/************************************************************************************ */

client.on("ready", eventsController.onReady);

client.on("message", eventsController.onMessage);

client.on("messageUpdate", eventsController.onMessageUpdate);

client.on("messageDelete", eventsController.onMessageDelete);

client.on("guildMemberAdd", eventsController.onGuildMemberAdd);

//This checks if new user accepts the rules and then assigns them to members group.
client.on("messageReactionAdd", eventsController.onMessageReactionAdd);

client.on("messageReactionRemove", eventsController.onMessageReactionRemove);

client.on("error", errorController.errorHandler);
