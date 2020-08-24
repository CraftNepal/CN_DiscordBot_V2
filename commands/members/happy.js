const Discord = require("discord.js");

module.exports = {
     name: "happy",
     description: "Just an experession to share your happiness with the bot. ",
     execute(message, args) {
          var happy_message = [
               "happy indeed!",
               "yayyyyyyy !",
               "bleh !",
               "Are you sure??? !",
               "Lovely ! ! !",
               "Hello, Happy !",
          ];
          message.reply(happy_message[Math.floor(Math.random() * happy_message.length)]);
     },
};
