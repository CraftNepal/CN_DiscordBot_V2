const Discord = require("discord.js");

module.exports = {
     name: "parse",
     description: "parse",
     // execute  (message,  args){message.channel.send(args); }
     execute(message, args) {
          if (args.length <= 0)
               return message.reply(`Nothing to parse?`).then((m) => m.delete(5000));

          message.channel.send(`<a:${args[0]}:${args[1]}>`);
          console.log(args);
     },
};
