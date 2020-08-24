const Discord = require("discord.js");
Adconst discord = require("../../client");
const emojis = require("../../emoji.json");
const sadFace = emojis.sadFace;
const config = require("../../config.json");
let text = `Game server : **play.craftnepal.host**
Map link : http://maps.craftnepal.host/
Vote Link : http://vote.craftnepal.host/
Discord share link : http://discord.craftnepal.host/

**Available Commands for CraftNepal Bot**
`;

const commands = discord.commands();

module.exports = {
     name: "help",
     description: "Use this command to list all the useful CraftNepal Bot commands",
     execute(message, args) {
          commands.array().forEach((command) => {
               text =
                    text +
                    "``" +
                    config.prefix +
                    command.name +
                    " : " +
                    command.description +
                    "``\n";
          });
          message.channel.send(text);
          message.author.createDM().then((channel) => {
               channel.send(text);
          });
          message.reply("Under construction. Not ready yet " + emojis.sadFace);
     },
};
