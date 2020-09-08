const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports = {
     name: "anime",
     description: "handy dandy command for weebs",
     execute(message, args) {
          if (args.length == 0) {
               message.reply("which anime you want to search about?");
               return;
          }
          let name = args[0]
          const api = `https://api.jikan.moe/v3/search/anime?q=${name}`
          snekfetch.get(api).then((r) => {
            if (!r.body.country) {
                 message.reply("That anime doesn't exist.");
                 return;
            }
            let body = r.body;
            let animeembed = new Discord.RichEmbed()
                    .setColor("#0099ff")
                    .setTitle(`${name}`)
                    .setDescriptin(body.results[0].synopsis)

                    .setThumbnail(
                         body.results[0].image_url
                    )
                    .addField("Episodes: ", body.results[0].episodes, true)
                    .addField("Rating: ", body.results[0].score, true)
                    .addField("Rated: ", body.results[0].rated, true)
                    .addField("Type: ", body.results[0].type, true)
                    .addField("Airing: ", body.results[0].airing, true)
                    .setFooter(`started: ${body.results[0].start_date} endedd: ${body.results[0].end_date}`)
               message.channel.send(animeembed);
       });
          
        }
    }
