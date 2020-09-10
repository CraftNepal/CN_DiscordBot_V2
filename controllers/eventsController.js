//imports
const Discord = require("discord.js");
const discord = require("../client");
const client = discord.client();
const commands = discord.commands();
const adminCommands = discord.adminCommands();
const modCommands = discord.modCommands();
const config = require("../config.json");
const utils = require("../utils/utils");
const log = utils.log;
const scanMessage = utils.scanMessage;
const { membersRole } = require("../config.json");
const Snekfetch = require("snekfetch");
const fetch = require("node-fetch");
const path = require("path");
const webhookClient = new Discord.WebhookClient(config.webhooks.id, config.webhooks.token);

const Minecraft = require("minecraft-lib");
const { checkAiringAnime } = require("../models/checkAnime.js");
//exports
exports.onReady = () => {
     const statsChannel = client.channels.get(config.currentGuild.statsChannelId);
     if (statsChannel) {
          statsChannel.setName(
               "Members : " + client.guilds.get(config.currentGuild.id).memberCount
          );
     }

     //Setting the bot status to Number of online players in game , and also indicating the uptime of the bot itself.
     client.setInterval(() => {
          let unit = "mins";
          let unitD = "mins";
          const uptime = (Date.now() - client.readyAt) / 60000;
          const downtime = (Date.now() - 1598680823000) / 60000;
          let finalUptime = uptime.toFixed(2);
          let finalDowntime = downtime.toFixed(2);
          if (uptime > 60 && uptime < 120) {
               unit = "hour";
               finalUptime = (uptime / 60).toFixed(2);
          }
          if (uptime >= 120) {
               unit = "hrs";
               finalUptime = (uptime / 60).toFixed(2);
          }
          if (downtime > 60 && downtime < 120) {
               unitD = "hour";
               finalDowntime = (downtime / 60).toFixed(2);
          }
          if (downtime >= 120) {
               unitD = "hrs";
               finalDowntime = (downtime / 60).toFixed(2);
          }

          Minecraft.servers
               .get("play.craftnepal.host", 25577)
               .then((result) => {
                    console.log(result.players.online);

                    const online = result.players.online;

                    client.user.setActivity(`${online} players | ${finalUptime}${unit}`, {
                         type: "watching",
                    });
               })
               .catch((err) => {
                    console.log(err);
                    console.log("Cannot connect to server");
                    client.user.setActivity(`Server down😞 for ${finalDowntime}${unitD}`, {
                         type: "watching",
                    });
               });
     }, 15000);

     //Caching messages in some channels.
     client.channels.get(config.currentGuild.discordLogChannelId).send(`\`\`\`yaml
          CraftNepal Bot 2.1 has started at ${client.readyAt}\`\`\``);

     client.channels
          .get(config.currentGuild.rulesChannelId)
          .fetchMessages({ limit: 1 })
          .then((message) => {
               console.log("Last 1 message was cached in Rules Channel");
          })
          .catch((err) => {
               console.log(err);
          });

     client.channels
          .get(config.currentGuild.welcomeChannelId)
          .fetchMessages({ limit: 50 })
          .then((messages) => {
               console.log("Last 50 messages cached in Welcome Channel");
          })
          .catch((err) => {
               console.log(err);
          });
     //anime airing check
     setInterval(() => {
          checkAiringAnime();
     }, 600000);
};

exports.onMessage = (message) => {
     //check and run command
     if (message.content.startsWith(config.prefix)) {
          const args = message.content.slice(1).split(/ +/);
          const command = args.shift().toLowerCase();
          if (!command) {
               return;
          }

          if (!commands.has(command)) {
               if (
                    !adminCommands.has(command) ||
                    !message.member.roles.has(config.currentGuild.roles.adminRoleId)
               ) {
                    // message.channel.send("You aren't Moderator.");
                    // return;
                    if (
                         !modCommands.has(command) ||
                         !message.member.roles.has(config.currentGuild.roles.helpersRoleId)
                    ) {
                         console.log("incorrect command");
                    } else {
                         try {
                              modCommands.get(command).execute(message, args);
                         } catch (error) {
                              console.error(error);
                              message.reply("there was an error trying to execute that command!");
                         }
                    }
               } else {
                    try {
                         adminCommands.get(command).execute(message, args);
                    } catch (error) {
                         console.error(error);
                         message.reply("there was an error trying to execute that command!");
                    }
               }
          } else {
               try {
                    commands.get(command).execute(message, args);
               } catch (error) {
                    console.error(error);
                    message.reply("there was an error trying to execute that command!");
                    client.channels
                         .get(config.currentGuild.discordLogChannelId)
                         .send(
                              "An error occured while trying to run a command. Details below:\n" +
                                   error
                         );
               }
          }
     }

     //run scan

     scanMessage(message, client);
     //log(message.channels);

     if (!(message.channel.id.toString() === config.currentGuild.discordLogChannelId.toString())) {
          if (message.author.bot) {
               message.member = { user: { tag: message.author.tag } };
          }
          log("**" + message.member.user.tag + " : " + "** [ " + message.content + " ] ", client);

          // let messageembed = new Discord.RichEmbed()
          //      .setColor("RANDOM")
          //      .setDescription("**" + message.member.user.tag + "**" + `➤ ` + message.content);

          // client.channels.get(config.discordLogChannel).send(message.content); //I changed back to normal message because it was causing console spam. messageUpdage will consider  EMBEDS as an update too, even though  its a new message.
     } else {
          console.log("Not logging the text in Discord logs");
     }

     //Logging all ticket conversations into a separatefile.
     if (message.channel.name) {
          if (message.channel.name.split("-")[0] === "ticket") {
               utils.ticketLog(message);
          }
     }
};

exports.onMessageUpdate = (oldMessage, newMessage) => {
     if (oldMessage.author.bot) {
          return;
     }
     if (oldMessage.content) {
          //Author:Code => I added this to avoid that spamming console message saying embed value shouldn't be empty
          let embed = new Discord.RichEmbed()
               .setColor("#0099ff")
               .setTitle("Edited message")
               .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
               .setThumbnail(oldMessage.author.avatarURL)
               .addField("Before Editing:", oldMessage.content)
               .addField("After Editing:", newMessage.content);

          client.channels.get(config.currentGuild.discordLogChannelId).send(embed);
          log(
               oldMessage.author.tag +
                    " Edited: [ " +
                    oldMessage.content +
                    " ===> " +
                    newMessage.content +
                    " ] ",
               client
          );
     } else {
          console.log("This message was not an edit");
     }
};

exports.onMessageDelete = (message) => {
     if (message.author.bot || message.channel.id === config.currentGuild.discordLogChannelId) {
          return;
     }
     if (!message.content) {
          console.log("The deleted message was an embed");
          return;
     }
     if (message.member.roles.some((role) => role.name === "Muted")) {
          return;
     } else {
          let deleteembed = new Discord.RichEmbed()
               .setColor("#0099ff")
               .setTitle("Message Deleted")
               .setAuthor(message.author.tag, message.author.avatarURL)
               .setThumbnail(message.author.avatarURL)
               .addField("Message:", message.content);
          client.channels.get(config.currentGuild.discordLogChannelId).send(deleteembed);
          log(message.author.tag + " Deleted: [ " + message.content + " ] ", client);
     }
};

exports.onGuildMemberAdd = (member) => {
     client.channels
          .get(config.currentGuild.statsChannelId)
          .setName("Members : " + client.guilds.get(config.currentGuild.id).memberCount);
     let joinembed = new Discord.RichEmbed()
          .setAuthor("Welcome to CraftNepal Discord server!")
          .setColor("RANDOM")
          .setTitle(member.user.tag)
          .setThumbnail(member.user.avatarURL)
          .setDescription(
               `Hello!! ${member} ! Welcome to our Discord server & Enjoy your Stay!But before that Make sure to read and Accept our ${client.channels.get(
                    config.currentGuild.rulesChannelId
               )} to unlock the rest of the server"`
          );
     member.guild.channels.get(config.currentGuild.welcomeChannelId).send(joinembed);

     //Add new voice channel with no join perms if none exits

     //update voice channel name with total number of members
};

exports.onGuildMemberRemove = (member) => {
     client.channels
          .get(config.currentGuild.statsChannelId)
          .setName("Members : " + client.guilds.get(config.currentGuild.id).memberCount);
};

exports.onMessageReactionAdd = (reaction) => {
     console.log(
          "_______~~~~~~~~~~~~~~~____________~~~~~~~~~~~~_______________~~~~~~~~~~~~~~~~~~~~~~_________"
     );

     if (
          reaction.message.channel.id === config.currentGuild.rulesChannelId &&
          reaction.emoji.name === "✅"
     ) {
          if (!reaction.users.last().bot) {
               const userId = reaction.users.last().id;
               reaction.message.guild.members.get(userId).addRole(membersRole);
          }
     }
};

exports.onMessageReactionRemove = (reaction) => {
     console.log(
          "_______~~~~~~~~~~~~~~~____________~~~~~~~~~~~~_______________~~~~~~~~~~~~~~~~~~~~~~_________"
     );

     if (
          reaction.message.channel.id === config.currentGuild.rulesChannelId &&
          reaction.emoji.name === "✅"
     ) {
          const userId = reaction.users.id;
          reaction.message.member.removeRole(membersRole);
     }
};
