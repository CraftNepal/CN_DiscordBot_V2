const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "manga",
    description: "Get info of any Manga",
    execute(message, args) {
        if (args.length == 0) {
            message.reply("-senpai, Please put the name of an anime that you want to search.");
            return;
        }
        const mangaArgs = [...args];
        const mangaName = mangaArgs.splice(',').join(' ');
        const graphlQuery = {
            query: `
            {
                Media(type:MANGA, search:"${mangaName}"){
                  title{
                    english,
                    romaji
                  },
                  genres,
                  chapters,
                  volumes,
                  coverImage{
                    large
                  },
                  description(asHtml:false),
                  status,
                  trending,
                  favourites,
                  recommendations(page:1, perPage:4,sort:RATING){
                    
                      nodes{
                        mediaRecommendation{
                          title{
                            english,
                            romaji
                          }
                        }
                      }
                      
                    
                  }
                  
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
                if (resData.data.Media == null) {
                    message.channel.send('Cant find anime.');
                    return;
                }

                const data = resData.data.Media;
                if (data.title.english == null) {
                    data.title.english = '';
                };

                let description = data.description.split('<br>');
                let genres = data.genres.map((genre) => `${genre}`).join("\n ");
                let recommendationManga = data.recommendations.nodes.map((manga) => `${manga.mediaRecommendation.title.romaji}`).join(", ");
                let animeEmbed = new Discord.RichEmbed()
                    .setTitle(`${data.title.english}(${data.title.romaji})`)
                    .setDescription(`${description}`)
                    .addField('Genres', `${genres}`, true)
                    .addField('Chapters', `${data.chapters}`, true)
                    .addField('Volumes', `${data.volumes}`, true)
                    .addField('Status', `${data.status}`, true)
                    .addField('Trending', `${data.trending}`, true)
                    .setImage(`${data.coverImage.large}`)
                    .setFooter(`Recommendations: ${recommendationManga}`)
                    .setColor('RANDOM');

                message.channel.send(animeEmbed);
            });





    }
};
