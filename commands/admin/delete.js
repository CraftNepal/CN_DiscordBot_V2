const Discord = require("discord.js");

module.exports = {
     name: "delete",
     description: "delete messages",
     execute(message, args) {
          let sentMessage;
          const qty = +args;
          if (!qty) {
               message.reply(`But you didn't enter a number. . . `);
          } else {
               message
                    .reply(
                         `Alright. . . deleting ${args} messages <a:partyblob:735751363778183221>`
                    )
                    .then((sent) => {
                         sentMessage = sent;
                         console.log("DELETING MESSAGES");
                         // Bulk delete messages
                         return message.channel.bulkDelete(qty + 2);
                    })

                    .then((messages) => console.log(`Bulk deleted ${messages.size} messages`))
                    .catch((error) => {
                         sentMessage
                              .edit(error.message + " Please use .slowDelete instead")
                              .then()
                              .catch((err) => {
                                   console.log(err);
                              });
                    });
          }
     },
};
