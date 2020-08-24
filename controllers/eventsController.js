//imports
const Discord = require("discord.js");
const discord = require("../client");
const client = discord.client();
const commands = discord.commands();
const adminCommands = discord.adminCommands();
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
//exports
exports.onReady = () => {
     //Setting the bot status to Number of online players in game , and also indicating the uptime of the bot itself.
     client.setInterval(() => {
          let unit = "mins";
          const uptime = (Date.now() - client.readyAt) / 60000;
          let finalUptime = uptime.toFixed(2);
          if (uptime > 60 && uptime < 120) {
               unit = "hour";
               finalUptime = (uptime / 60).toFixed(2);
          }
          if (uptime >= 120) {
               unit = "hrs";
               finalUptime = (uptime / 60).toFixed(2);
          }

          Minecraft.servers.get("play.craftnepal.host", 25577).then((result) => {
               console.log(result.players.online);

               const online = result.players.online;
               client.user.setActivity(`${online} players | ${finalUptime}${unit}`, {
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
};

exports.onMessage = (message) => {
     //check and run command
     if (message.content.startsWith(config.prefix)) {
          const args = message.content.slice(1).split(/ +/);
          const command = args.shift().toLowerCase();

          if (!commands.has(command)) {
               if (
                    !adminCommands.has(command) ||
                    !message.member.roles.has(config.currentGuild.roles.adminRoleId)
               ) {
                    message.channel.send("=_=");
                    return;
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
     if (message.author.bot) {
          return;
     }
     if (!message.content) {
          console.log("The deleted message was an embed");
     }
     let deleteembed = new Discord.RichEmbed()
          .setColor("#0099ff")
          .setTitle("Message Deleted")
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setThumbnail(message.author.avatarURL)
          .addField("Message:", message.content);
     client.channels.get(config.currentGuild.discordLogChannelId).send(deleteembed);
     log(message.author.tag + " Deleted: [ " + message.content + " ] ", client);
};

exports.onGuildMemberAdd = (member) => {
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
