const Discord = require("discord.js");
const config = require("../../config.json");
const webhookClient = new Discord.WebhookClient(config.webhooks.id, config.webhooks.token);
const emojis = require("../../emoji.json");

module.exports = {
     name: "express",
     description: "Express your feelings using some animated emojis available in our server",

     async execute(message, args) {
          if (message.deletable) message.delete();

          let emoji = emojis.verified;
          switch (args[0]) {
               case "happy":
                    emoji = emojis.piglindance;
                    break;
               case "helpless":
                    emoji = emojis.supportIcon;
               default:
                    break;
          }

          if (webhookClient.channelID !== message.channel.id) {
               webhookClient
                    .edit({
                         channel: message.channel.id,
                    })
                    .then(() => {
                         message.reply(
                              "Changin the webhook channel " +
                                   webhookClient.channelID +
                                   " and " +
                                   message.channel.id
                         );
                         webhookClient.send(emoji, {
                              username: message.author.nickname || message.author.username,
                              avatarURL: message.author.avatarURL,
                         });
                    })
                    .catch((err) => {
                         console.log(err);
                    });
          }

          webhookClient.send(emoji, {
               username: message.author.nickname || message.author.username,
               avatarURL: message.author.avatarURL,
          });
     },
};
