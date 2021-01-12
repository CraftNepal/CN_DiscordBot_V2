const fs = require("fs");
const config = require("./config.json");
const path = require("path");
const Discord = require("discord.js");
const discord = require("./client");
discord.connect();
const client = discord.client();
const connection = require('./utils/connections.js');

const eventsController = require("./controllers/eventsController");

const errorController = require("./controllers/errorController");
const sequelize = require("./utils/database");

const User = require("./models/user");

const Ticket = require("./models/ticket");

//routers
const apiRoutes = require("./routes/api");

//for static files
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

app.use("/", (req, res, next) => {
     res.json({
          message: "INVALID ENDPOINT",
          statusCode: 404,
     });
});
app.use((err, req, res, next) => {
     if (!err.statusCode) {
          err.statusCode = 500;
     }

     res.status(err.statusCode);
     res.json({
          message: err.message,
          statusCode: err.statusCode,
     });
});

app.listen(process.env.PORT || 1338);

//Database relations
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

client.on("guildMemberRemove", eventsController.onGuildMemberRemove);

//This checks if new user accepts the rules and then assigns them to members group.
client.on("messageReactionAdd", eventsController.onMessageReactionAdd);

client.on("messageReactionRemove", eventsController.onMessageReactionRemove);

client.on("error", errorController.errorHandler);
