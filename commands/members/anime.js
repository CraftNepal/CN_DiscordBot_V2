const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "anime",
    description: "Get info of any anime",
    execute(message, args) {
        if (args.length == 0) {
            message.reply("-senpai, Please put the name of an anime that you want to search.");
            return;
        }
        const animeArgs = [...args];
        const animeName = animeArgs.splice(',').join(' ');
        const graphlQuery = {
            query: `
            {
                Media(type:ANIME, search:"${animeName}"){
                  title{
                    english,
                    romaji
                  },
                  genres,
                  episodes,
                  coverImage{
                    large
                  },
                  description(asHtml:false),
                  status,
                  trending,
                  favourites,
                  relations{
                    nodes{
                      title {
                        romaji
                      }
                    }
                  }
                  
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
                if (!data.title.episodes) {
                    data.title.episodes = 'No episodes';
                }
                let description = data.description.split('<br>');
                let genres = data.genres.map((genre) => `${genre}`).join("\n ");
                let recommendationAnime = data.recommendations.nodes.map((anime) => `${anime.mediaRecommendation.title.romaji}`).join(", ");
                let relatedAnime = data.relations.nodes.map((anime) => `${anime.title.romaji}`).join(", ");
                let animeEmbed = new Discord.RichEmbed()
                    .setTitle(`${data.title.english}(${data.title.romaji})`)
                    .setDescription(`${description}`)
                    .addField('Genres', `${genres}`, true)
                    .addField('Episodes', `${data.episodes}`, true)
                    .addField('Status', `${data.status}`, true)
                    .addField('Trending', `${data.trending}`, true)
                    .addField('Related Anime', `${relatedAnime}`)
                    .setImage(`${data.coverImage.large}`)
                    .setFooter(`Recommendations: ${recommendationAnime}`)
                    .setColor('RANDOM');

                message.channel.send(animeEmbed);
            });





    }
};
