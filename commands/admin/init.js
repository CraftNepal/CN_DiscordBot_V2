//imports

const discord = require("../../client");
const fs = require("fs");
const path = require("path");
//setting up function to scan all channels

const client = discord.client();
let channels;
let roles;
const scanChannels = (message) => {
     channels = client.channels.array().map((channel) => {
          let _tempObject = {};
          _tempObject[channel.name] = {
               id: channel.id,
               topic: channel.topic,
               permissionOverwrites: channel.permissionOverwrites,
          };
          return _tempObject;
     });
     roles = message.guild.roles.array().map((role) => {
          let _tempObject = {};
          _tempObject[role.name] = { id: role.id, permissions: role.permissions };

          return _tempObject;
     });
     const serverData = { channels: channels, roles: roles };
     storeAllDataToFile(serverData);
};
//setting up function to store all channel data to file
const filePath = path.join(__dirname, "..", "..", "serverConfig.json");
const storeAllDataToFile = (serverData) => {
     fs.writeFile(filePath, JSON.stringify(serverData), (err) => {
          if (err) {
               console.log(err);
          }
     });
};

module.exports = {
     name: "init",
     description: "Initialize all necessary things. Scan all channels, etc.",
     async execute(message, args) {
          scanChannels(message);
          message.reply("Storing all server data to file.(well almost XD)");
          message.channel.send({ files: ["serverConfig.json"] });
     },
};
