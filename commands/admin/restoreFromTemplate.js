//imports

const discord = require("../../client");
const fs = require("fs");
const path = require("path");
//setting up function to scan all channels

const client = discord.client();

//setting up function to read all channel data to file
const filePath = path.join(__dirname, "..", "..", "serverConfig.json");
const readAllDataFromFile = (serverData) => {
     fs.readFile(filePath, (err, data) => {
          if (err) {
               return console.log(err);
          }
          serverData(data);
     });
};
module.exports = {
     name: "Restore Server From Template",
     description: "RESTORE SERVER LAYOUT INCASE OF FIRE",
     async execute(message, args) {
          message.reply("RESTORING YOUR SERVER PLEASE WAIT");

          readAllDataFromFile((serverData) => {
               const serverConfig = JSON.parse(serverData);
          });
     },
};
