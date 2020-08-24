//imports
const Discord = require("discord.js");
const config = require("../../config.json");
const discord = require("../../client");
const client = discord.client();
const log = require("../../utils/utils").log;
const User = require("../../models/user");
const Ticket = require("../../models/ticket");
const fs = require("fs");
const path = require("path");
const emojis = require("../../emoji.json");
const verified = emojis.verified;
//exports
module.exports = {
     name: "resolve",
     description:
          "Use this command to close the ticket after your issue has been resolved, if you have opened one.",
     async execute(message, args) {
          try {
               log(message.author.tag, client);

               const comments = args.join(" ");
               if (comments === "") {
                    const reply = await message.reply(
                         "You need to add a comment to the resolution. Please type ``.resolve <comments>`` to create resolve and close this issue"
                    );
                    client.setTimeout(() => {
                         reply.delete();
                    }, 20000);
                    return;
               }
               const ticket = await Ticket.findByPk(message.channel.id);
               if (!ticket) {
                    return message.reply(
                         "Uh-oh~ Something wonky happend while scanning for tickets in the database! "
                    );
               }
               //fetching user data from database using relational tables
               const user = await ticket.getUser();
               //finding the author of ticket using the ID
               const author = client.users.get(user.id);

               const deletedChannel = await message.channel.delete();

               ticket.isResolved = true;

               ticket.resolvedAt = Date.now();

               ticket.log = path.join(
                    __dirname,
                    "..",
                    "..",
                    "logs",
                    "ticket-logs",
                    deletedChannel.name + ".log"
               );

               user.hasTicket = false;

               ticket.save();

               user.save();

               const dm = await author.createDM();

               const embed = new Discord.RichEmbed()
                    .setColor("#0099ff")
                    .setTitle("Issue Resolved " + emojis.verified)
                    .setAuthor(deletedChannel.name)
                    .setThumbnail(author.avatarURL)
                    .addField("User:", author)
                    .addField("Subject:", ticket.subject)
                    .addField("Comments:", comments);

               client.channels.get(config.currentGuild.helpChannelId).send(embed);
               embed.attachFile(
                    path.join(
                         __dirname,
                         "..",
                         "..",
                         "logs",
                         "ticket-logs",
                         deletedChannel.name + ".log"
                    )
               );
               dm.send(embed);

               console.log("TICKET HAS BEEN RESOLVED");
          } catch (error) {
               console.log(error);
          }
     },
};
