const Discord = require("discord.js");

module.exports = {
     name: "say",
     description: "say",
     // execute  (message,  args){message.channel.send(args); }
     execute(message, args) {
          if (message.deletable) message.delete();
          if (args.length <= 0) return message.reply(`Nothing to say?`).then((m) => m.delete(5000));
          // Role color
          const roleColor = message.guild.me.highestRole.hexColor;
          // If the first argument is embed, send an embed,
          // otherwise, send a normal message
          if (args[0].toLowerCase() === "embed") {
               let embed = new Discord.RichEmbed()
                    .setTitle("**------------ANNOUNCEMENT------------**")
                    .setDescription(args.slice(1).join(" "))
                    .setColor(0x823cd6)
                    .setTimestamp((timestamp = Date.now()));

               message.channel.send(embed).then((sentEmbed) => {
                    sentEmbed.react("👍");
                    sentEmbed.react("✅");
               });
          } else {
               message.channel.send(args.join(" "));
               console.log(args);
          }
     },
};
