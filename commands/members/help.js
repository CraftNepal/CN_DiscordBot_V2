const Discord = require("discord.js");
const emojis = require("../../emoji.json");
const sadFace = emojis.sadFace;
module.exports = {
     name: "help",
     description: "help",
     execute(message, args) {
          message.reply("Under construction. Not ready yet " + emojis.sadFace);
     },
};
