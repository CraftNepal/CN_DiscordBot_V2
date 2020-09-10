//imports
const client = require("../client").client();
const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");

//exports
exports.log = (args, client) => {
     var date = new Date();
     let fullTime = `[${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}] ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} >> `;
     fs.appendFile(
          `logs/${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}.log`,
          fullTime + args + "\n",
          () => {
               console.log(fullTime + args);
          }
     );
};

exports.ticketLog = (message) => {
     fs.appendFile(
          `logs/ticket-logs/${message.channel.name}.log`,
          message.createdAt + "=>" + message + "\n",
          (err) => {
               if (err) {
                    console.log("Could not write file");
               }
          }
     );
};

exports.scanMessage = (msg, client) => {
     const askedip = new Set();
     const askedmap = new Set();
     const askeddiscord = new Set();
     const askedvote = new Set();
     const askedwebsite = new Set();
     //splits sentences into words
     let wordArray = msg.content.split(" ");
     let map = ["map", "dynmap?", "map?", "map.", "dynmap", "Map.", "Map."];
     for (var i = 0; i < map.length; i++) {
          if (wordArray.includes(map[i])) {
               if (askedmap.has(msg.author.id)) {
                    msg.channel.send("");
               } else {
                    msg.channel
                         .send("Browse this <http://maps.craftnepal.host/> or type /map in game.")
                         .then((m) => {
                              m.delete(3000);
                         });

                    // the user can type the command ... your command code goes here :)

                    // Adds the user to the set so that they can't talk for a minute
                    askedmap.add(msg.author.id);
                    setTimeout(() => {
                         // Removes the user from the set after a minute
                         askedmap.delete(msg.author.id);
                    }, 60000);
               }
          }
     }
     let ip = ["ip", "ip?", "Ip?", "IP?", "ip.", "IP", "IP."];
     for (var i = 0; i < ip.length; i++) {
          if (wordArray.includes(ip[i])) {
               if (askedip.has(msg.author.id)) {
                    msg.channel.send("");
               } else {
                    msg.channel.send("Server ip: **play.craftnepal.host** ").then((m) => {
                         m.delete(3000);
                    });
                    // the user can type the command ... your command code goes here :)

                    // Adds the user to the set so that they can't talk for a minute
                    askedip.add(msg.author.id);
                    setTimeout(() => {
                         // Removes the user from the set after a minute
                         askedip.delete(msg.author.id);
                    }, 60000);
               }
          }
     }

     let website = ["website", "ws", "website?"];
     for (var i = 0; i < website.length; i++) {
          if (wordArray.includes(website[i])) {
               if (askedwebsite.has(msg.author.id)) {
                    msg.channel.send("");
               } else {
                    msg.channel.send("** <https://www.craftnepal.host/>**");
                    // the user can type the command ... your command code goes here :)

                    // Adds the user to the set so that they can't talk for a minute
                    askedwebsite.add(msg.author.id);
                    setTimeout(() => {
                         // Removes the user from the set after a minute
                         askedwebsite.delete(msg.author.id);
                    }, 60000);
               }
          }
     }

     let vote = ["vote"];
     if (wordArray.includes("vote")) {
          if (askedvote.has(msg.author.id)) {
               msg.channel.send("");
          } else {
               msg.channel.send("<https://vote.craftnepal.host>").then((m) => {
                    m.delete(3000);
               });

               // the user can type the command ... your command code goes here :)

               // Adds the user to the set so that they can't talk for a minute
               askedvote.add(msg.author.id);
               setTimeout(() => {
                    // Removes the user from the set after a minute
                    askedvote.delete(msg.author.id);
               }, 60000);
          }
     }
     let discord = ["discord"];
     if (wordArray.includes("discord")) {
          if (askeddiscord.has(msg.author.id)) {
               msg.channel.send("");
          } else {
               msg.channel.send("「<http://discord.craftnepal.host>」");

               // the user can type the command ... your command code goes here :)

               // Adds the user to the set so that they can't talk for a minute
               askeddiscord.add(msg.author.id);
               setTimeout(() => {
                    // Removes the user from the set after a minute
                    askeddiscord.delete(msg.author.id);
               }, 60000);
          }
     }
     let rip = [`:skull:`];
     for (var i = 0; i < rip.length; i++) {
          if (wordArray.includes(rip[i])) {
               msg.channel.send("RIP");
          }
     }

     var bannedwords = /(^\s*|^.+\s+)[fF]+[uU]+[cC]+[kK]+\s*$/g;

     if (bannedwords.test(msg.content)) {
          //msg.delete()
          var random_msg = [
               "Hey, We dont do that here!",
               "Stop it kid",
               "Ha Ha Ha, That was Funny!",
               "Please Vetify your age to use bad Words!",
               "Just Stop it already!",
               "Hey Kid, Thats illegal",

               "Bhai stand up comidean ho ki kyaho",
               "Look, no one thinks cursing is funny",
               "Stop it kid",
               "Are you even old to say these?",
               "I didn't came here to see this",
               "cringe",
               "xada na bol vaneko bujdainas?",
          ];
          msg.reply(random_msg[Math.floor(Math.random() * random_msg.length)]);

          //client.channel.get("663058152391966755").send(msg.member.user.tag + "= >" + msg.content);
     }
     if (msg.content.includes("discord.gg/" || "discordapp.com/invite/" || "https://")) {
          msg.delete() //delete the message
               .then(
                    msg.channel.send(
                         msg.channel.send(
                              `${msg.author.username}, Links are not allowed in this channel`
                         )
                    )
               );
     }
};
