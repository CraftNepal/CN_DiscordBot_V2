const { client } = require("../../client.js");
const { log } = require("../../utils/utils");
const fs = require("fs");
module.exports = {
     name: "undo",
     description: "Undos the last edited message by CraftNepal",
     async execute(message, args) {
          if (args[0] !== "edit") {
               return;
          }
          const channel = message.channel;
          message.delete();

          const messages = await channel.fetchMessages({ limit: 10 });
          const botMessages = messages.filter((msg) => {
               return msg.author.id === client().user.id;
          });
          //this will edit the fi   rst message in the collection we filtered out.
          const cache = botMessages.first();
          fs.writeFile("redo-cache.txt", cache, (err) => {
               if (err) {
                    console.log(`Coudn't write File`);
               }
          });
          fs.readFile("cache.txt", (err, data) => {
               if (err) {
                    console.log("Coudnt read from file.");
               }
               console.log(data.toString());
               botMessages.first().edit(data.toString());
          });
     },
};
