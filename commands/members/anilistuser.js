const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "anilistuser",
    description: "Get info of a user from AniList",
    execute(message, args) {
        if (args.length == 0) {
            message.reply("-sama, Please put the name of a user");
            return;
        }
        const user = args[0];
        const graphlQuery = {
            query: `
            {
                User(search:"${user}"){
                  name,
                  avatar {
                    large
                    medium
                  },
                  
                  statistics{
                    anime{
                      count,
                      minutesWatched
                      
                    },
                    
                    manga{
                      count,
                              minutesWatched
                    }
                    
                  },
                  siteUrl,
                  
                  
                  
                }
              }
                
            `,
        };
        fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphlQuery),
        })
            .then((res) => {
                return res.json();
            })
            .then((resData) => {
                if (resData.data.User == null) {
                    message.channel.send('User not found!');
                    return;
                }
                const data = resData.data.User;
                let animeHrs = data.statistics.anime.minutesWatched / 60;
                let mangaHrs = data.statistics.manga.minutesWatched / 60;

                let animeEmbed = new Discord.RichEmbed()
                    .setTitle(`${data.name}`)
                    .setColor('RANDOM')
                    .setImage(`${data.avatar.medium}`)
                    .addField('Anime Count', `${data.statistics.anime.count}`, true)
                    .addField('Anime WatchTime', `${animeHrs}`, true)
                    .addBlankField()
                    .addField('Manga Count', `${data.statistics.manga.count}`, true)
                    .addField('Manga WatchTime', `${mangaHrs}`, true)
                    .setDescription(`Url: <${data.siteUrl}>`);
                message.channel.send(animeEmbed);



            });




    }
};
