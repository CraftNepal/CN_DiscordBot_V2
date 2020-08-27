const Discord = require("discord.js");
const log = require("../../utils/utils").log;
const emoji = require("../../emoji.json");
module.exports = {
     name: "react",
     description: "react",
     execute(message, args) {
          let Channel = message.channel;
          message
               .delete()
               .then((next) => {
                    return Channel.fetchMessages({ limit: 2 });
               })
               .then((messages) => {
                    let lastMessage = messages.first();
                    console.log(lastMessage);
                    lastMessage.react("735888739469099018");
               })

               .catch((err) => {
                    message.reply("Something wonky occured while reacting. Please check console.");
                    log(err);
               });
     },
};
