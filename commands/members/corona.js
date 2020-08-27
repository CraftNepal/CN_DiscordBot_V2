const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports = {
     name: "corona",
     description: "go corona go",
     execute(message, args) {
          if (args.length == 0) {
               message.reply("You should type the target country too! e.g. ``.corona Nepal``");
               return;
          }

          let des = args[0];
          const api = `https://coronavirus-19-api.herokuapp.com/countries/${des}`;

          snekfetch.get(api).then((r) => {
               if (!r.body.country) {
                    message.reply("The country you entered wasnt found in the database");
                    return;
               }
               let body = r.body;
               let newsEmbed = new Discord.RichEmbed()
                    .setColor("#0099ff")
                    .setTitle(`Corona News in ${body.country}`)
                    .setThumbnail(
                         "https://www.cfjustice.org/wp-content/uploads/2020/03/covid-social.jpg"
                    )
                    .addField("Cases", body.cases, true)
                    .addField("Today Cases", body.todayCases, true)
                    .addField("Active", body.active, true)
                    .addField("Deaths", body.deaths, true)
                    .addField("Recovered", body.recovered, true)
                    .addField("Total Tests", body.totalTests, true);
               message.channel.send(newsEmbed);
          });
     },
};
