const Discord = require("discord.js");
const config = require("../../config.json");
const webhookClient = new Discord.WebhookClient(config.webhooks.id, config.webhooks.token);

module.exports = {
     name: "spawn",
     description: "spawn",

     async execute(message, args) {
          if (message.deletable) message.delete();

          webhookClient.send(args.join(" "), {
               username: message.author.username,
               avatarURL: message.author.avatarURL,
          });
     },
};
