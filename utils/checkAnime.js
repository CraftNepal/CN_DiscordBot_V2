const Discord = require("discord.js");
const fetch = require('node-fetch');
const fs = require('fs');
const discord = require("../client");
const client = discord.client();
const config = require("../config.json");
const emojis = require("../emoji.json");
// let animeListJson = fs.readFileSync("notifyingAnime.json");
// let animeList = JSON.parse(animeListJson);
const dancePiglin = emojis.piglindance;
const mongoose = require('mongoose');
const animeModel = mongoose.model('Anime');

function checkAiringAnime() {
    animeModel.find(async (err, docs) => {
        if (!err) {
            await docs.forEach(anime => {
                let animeId = anime.animeId;
                const graphlQuery = {
                    query: `
                    {
                         Media(type:ANIME,id:${animeId}){
                         id,
                         title {
                           romaji
                           english
                           native
                           userPreferred
                         },
                        startDate {
                          year
                          month
                          day
                        },
                        endDate {
                          year
                          month
                          day
                        }
                        ,
                        status,
                        coverImage {
                            large
                            medium
                        },
                        episodes,
                        nextAiringEpisode {
                          
                             airingAt,
                             episode
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
                            message.channel.send('cant find anime.');
                            return;
                        }
                        const data = resData.data.Media;
                        const currentEp = data.nextAiringEpisode.episode - 1;
                        console.log(currentEp);
                        // const currentEp = '941';
                        if (currentEp > anime.ep) {
                            const getUsers = anime.users;
                            const mentionUsers = getUsers.map((user) => `<@${user}>`).join(" ");
                            animeModel.findOne({ animeId: anime.animeId }, (err, result) => {
                                if (err) {
                                    console.log(err);

                                } else {
                                    result.ep = currentEp;
                                    result.save();
                                }
                            })
                            let animeNotification = new Discord.RichEmbed()
                                .setColor('RANDOM')
                                .setTitle(`New Episode! (${data.title.english})`)
                                .setDescription(`New episode of ${data.title.english} has arrived.`)
                                .addField('New Episode', `${currentEp}`)
                                .addField('Next Episode', `${data.nextAiringEpisode.episode}`)
                                .setImage(`${data.coverImage.large}`);
                            client.channels.get(config.currentGuild.weebChannelId).send(animeNotification);
                            client.channels.get(config.currentGuild.weebChannelId).send(dancePiglin + ` 💝${mentionUsers}💝 ` + dancePiglin);
                        } else {
                            console.log(`No new eps of ${data.title.english}`);
                            return;
                        }
                    });
            });
        } else {
            return;
        }
    })
}
// await animeList.forEach(anime => {
// let animeId = anime.animeId;
// const graphlQuery = {
//     query: `
//     {
//          Media(type:ANIME,id:${animeId}){
//          id,
//          title {
//            romaji
//            english
//            native
//            userPreferred
//          },
//         startDate {
//           year
//           month
//           day
//         },
//         endDate {
//           year
//           month
//           day
//         }
//         ,
//         status,
//         coverImage {
//             large
//             medium
//         },
//         episodes,
//         nextAiringEpisode {

//              airingAt,
//              episode
//         }
//       }
//     }
//     `,
// };
// fetch("https://graphql.anilist.co", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(graphlQuery),
// })
//     .then((res) => {
//         return res.json();
//     })
//     .then((resData) => {
//         if (resData.data.Media == null) {
//             message.channel.send('cant find anime.');
//             return;
//         }
//         const data = resData.data.Media;
//         const currentEp = data.nextAiringEpisode.episode - 1;
//         console.log(currentEp);
//         // const currentEp = '941';
//         if (currentEp > anime.ep) {
//             const getUsers = anime.users;
//             const mentionUsers = getUsers.map((user) => `<@${user}>`).join(" ");
//             anime.ep = currentEp;
//             let animeNotification = new Discord.RichEmbed()
//                 .setColor('RANDOM')
//                 .setTitle(`New Episode! (${data.title.english})`)
//                 .setDescription(`New episode of ${data.title.english} has arrived.`)
//                 .addField('New Episode', `${currentEp}`)
//                 .addField('Next Episode', `${data.nextAiringEpisode.episode}`)
//                 .setImage(`${data.coverImage.large}`);
//             client.channels.get(config.currentGuild.weebChannelId).send(animeNotification);
//             client.channels.get(config.currentGuild.weebChannelId).send(dancePiglin + ` 💝${mentionUsers}💝 ` + dancePiglin);
//         } else {
//             console.log(`No new eps of ${data.title.english}`);
//             return;
//         }
//     });



//     });

//     let stringifiedJson = JSON.stringify(animeList);
//     fs.writeFile("notifyingAnime.json", stringifiedJson, (next) => {
//         console.log('animeNotify checked!');
//     });
// }
module.exports = {
    checkAiringAnime
}