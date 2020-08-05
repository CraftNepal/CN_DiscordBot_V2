const Discord = require("discord.js");
const discord = require("../../client");
const client = require("../../client").client;

module.exports = {
     name: "stop",
     description: "stop",
     async execute(message, args) {
          message.reply("Disconnecting bot <a:partyblob:735751363778183221> ");

          const messageId = message.id;
          const channelId = message.channel.id;
          await client().setTimeout(() => {
               client().destroy();
               return process.exit();
          }, 3000);
     },
};
