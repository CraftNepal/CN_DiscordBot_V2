const Discord = require("discord.js");
const discordClient = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
//set the current active bot here.
const token = config.token;

let connected;
let connectedTimeStamp = 0;
let memberCommands;
module.exports = {
     connect: () => {
          {
               discordClient
                    .login(token)
                    .then(() => {
                         connected = true;
                         return;
                    })
                    .catch((err) => {
                         console.log("Connection timed out");

                         process.exit();
                    });
          }
     },
     client: () => {
          return discordClient;
     },
     commands: () => {
          const commands = new Discord.Collection();
          const commandFiles = fs
               .readdirSync("./commands/members")
               .filter((file) => file.endsWith(".js"));

          for (const file of commandFiles) {
               const command = require(`./commands/members/${file}`);
               commands.set(command.name, command);
          }
          memberCommands = commands;
          console.log("THIS IS COMMANDS");
          return commands;
     },
     getMemberCommands: () => {
          console.log("TESTING", memberCommands);
          return memberCommands;
     },

     adminCommands: () => {
          const adminCommands = new Discord.Collection();
          const commandFiles = fs
               .readdirSync("./commands/admin")
               .filter((file) => file.endsWith(".js"));
          for (const file of commandFiles) {
               const adminCommand = require(`./commands/admin/${file}`);
               adminCommands.set(adminCommand.name, adminCommand);
          }
          return adminCommands;
     },
};
