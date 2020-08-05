const Discord = require("discord.js");
const emojis = require("../../emoji.json");
const sadFace = emojis.sadFace;
module.exports = {
     name: "sad",
     description: "sad",
     execute(message, args) {
          var sad_message = [
               "sad indeed!  " + sadFace,
               "hahaha very sad !",
               "bleh !",
               "I am sadder than you ! I am confined to this server, Corona or no corona !",
               "I feel you :frowning: " + sadFace,
               "Hello, Sadman !",
               "Sucide is not an option ! " + sadFace,
               "Take a chill pill",
               "I care :hearts:",
               "I'm here for you :kiss:",
          ];
          message.reply(sad_message[Math.floor(Math.random() * sad_message.length)]);
     },
};
