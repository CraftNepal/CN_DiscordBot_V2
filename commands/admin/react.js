const Discord = require("discord.js");
const log = require("../../utils/utils").log;

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
                    lastMessage.react(`735898305497792592`);
               })

               .catch((err) => {
                    message.reply("Something wonky occured while reacting. Please check console.");
                    log(err);
               });
     },
};
