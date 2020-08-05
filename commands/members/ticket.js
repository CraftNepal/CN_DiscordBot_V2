//imports
const Discord = require("discord.js");
const config = require("../../config.json");
const discord = require("../../client");
const client = discord.client();
const log = require("../../utils/utils").log;
const User = require("../../models/user");
const emojis = require("../../emoji.json");
const supportIcon = emojis.supportIcon;
//exports
module.exports = {
     name: "ticket",
     description: "ticket",
     async execute(message, args) {
          log(message.author.tag, client);
          console.log(args.join(" "));
          const subject = args.join(" ");
          let user = await User.findByPk(message.author.id);
          if (subject === "") {
               const reply = await message.reply(
                    "You need to add a subject to the ticket. Please type ``.ticket <subject>`` to create a support ticket" +
                         supportIcon
               );
               client.setTimeout(() => {
                    reply.delete();
               }, 20000);
               return;
          }

          if (!user) {
               user = new User({
                    id: message.author.id,
               });
               await user.save();
          }
          if (!user.hasTicket) {
               const newChannel = await message.guild.createChannel(
                    `ticket-${message.author.username}-${Date.now()}`,
                    {
                         topic: subject,
                         permissionOverwrites: [
                              {
                                   id: message.author.id,
                                   deny: ["MANAGE_MESSAGES"],
                                   allow: ["SEND_MESSAGES", "READ_MESSAGES"],
                              },
                              {
                                   id: config.currentGuild.id,
                                   deny: ["MANAGE_MESSAGES", "READ_MESSAGES"],
                              },
                              {
                                   id: config.currentGuild.roles.serverBotRoleId,
                                   allow: [
                                        "MANAGE_MESSAGES",
                                        "READ_MESSAGES",
                                        "MANAGE_CHANNELS",
                                        "MENTION_EVERYONE",
                                   ],
                              },
                              {
                                   id: config.currentGuild.roles.helpersRoleId,
                                   allow: ["MANAGE_MESSAGES", "READ_MESSAGES"],
                              },
                         ],
                    },
                    "ticket"
               );

               const newTicket = await user.createTicket({
                    id: newChannel.id,
                    subject: subject,
               });
               await newTicket.save();

               user.hasTicket = true;

               await user.save();

               message.reply(
                    "Ticket has been created! Click on " +
                         newChannel +
                         " to get help ~!" +
                         supportIcon
               );
               newChannel.setTopic(subject);
               newChannel.send(
                    `Please type your issue in detail here and wait while one of the ${newChannel.guild.roles.get(
                         config.currentGuild.roles.adminRoleId
                    )} or ${newChannel.guild.roles.get(
                         config.currentGuild.roles.helpersRoleId
                    )} comes to assist you ~!`
               );
          } else {
               const reply = await message.reply(
                    "You already have an Active Ticket. Please resolve that before opening another ticket."
               );
               client.setTimeout(() => {
                    reply.channel.bulkDelete([reply, message]);
               }, 15000);
          }
     },
};
