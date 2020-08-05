const Discord = require("discord.js");
const Client = new Discord.Client();
module.exports = {
     name: "ping",
     description: "ping",
     execute(message, args) {
          message.reply(`🏓 Pong!\nLatency is ${Math.floor(Date.now() - message.createdAt)}ms\n`);
     },
};
