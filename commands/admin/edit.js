const { client } = require("../../client.js");
const { log } = require("../../utils/utils");
module.exports = {
     name: "edit",
     description: "Edits the last message written by CraftNepal",
     async execute(message, args) {
          //check if the last message's author is a bot, and if yes, check if it is Craftnepal

          const messages = await message.channel.fetchMessages({ limit: 10 });

          const filtered = messages.filter((msg) => {
               return msg.author.id === client().user.id;
          });
          log(filtered + "was edited");
     },
};
