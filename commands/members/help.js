const Discord = require("discord.js");
const discord = require("../../client");
const emojis = require("../../emoji.json");
const sadFace = emojis.sadFace;
const config = require("../../config.json");

module.exports = {
     name: "help",
     description: "Use this command to list all the useful CraftNepal Bot commands",
     execute(message, args) {
          const commands = discord.getMemberCommands();

          let text = `Game server : **play.craftnepal.host**
        Map link : http://maps.craftnepal.host/
        Vote Link : http://vote.craftnepal.host/
        Discord share link : http://discord.craftnepal.host/
        
        **Available Commands for CraftNepal Bot**
        `;
          commands.array().forEach((command) => {
               //content
               text = text + config.prefix + command.name + " : ``" + command.description + "`` \n";
          });
          //help Embed
          let helpEmbed = new Discord.RichEmbed()
               .setColor("#0099ff")
               .setTitle(`Did you ask for help? Here you go :)`)
               .setThumbnail("http://craftnepal.host:1338/images/supportIcon.gif")
               .setDescription(text);

          //send respond
          message.channel.send(helpEmbed);
          message.author.createDM().then((channel) => {
               channel.send(helpEmbed);
          });
          // message.reply("Under construction. Not ready yet " + emojis.sadFace);
     },
};
