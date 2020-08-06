const { client } = require("../../client.js");
const { log } = require("../../utils/utils");
const fs = require("fs");
module.exports = {
     name: "edit",
     description: "Edits the last message written by CraftNepal",
     async execute(message, args) {
          const messages = await message.channel.fetchMessages({ limit: 10 });
          const botMessages = messages.filter((msg) => {
               return msg.author.id === client().user.id;
          });
          //this will edit the first message in the collection we filtered out.
          const cache = botMessages.first();
          fs.writeFile("cache.txt", cache, (err) => {
               console.log(`Coudn't write File`);
               console.log(err);
          });
          botMessages.first().edit(args.join(" "));
     },
};
