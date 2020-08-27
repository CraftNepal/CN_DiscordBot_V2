const Discord = require("discord.js");

module.exports = {
     name: "test",
     description: "test",
     // execute  (message,  args){message.channel.send(args); }
     execute(message, args) {
          message.channel.send("test works");
     },
};
