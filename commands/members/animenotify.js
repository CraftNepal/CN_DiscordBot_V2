const Discord = require("discord.js");
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    name: "animenotify",
    description: "get anime airing notification",
    execute(message, args) {
        
        if(args.length == 0){
            message.reply('-chan, please the name of an anime.');
            return;
        }
        
        const animeArgs = [...args];
        const animeName = animeArgs.splice(',').join(' ');
        const graphlQuery = {
            query: `
            {
                 Media(type:ANIME,search:"${animeName}"){
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
            if(resData.data.Media == null){
                message.channel.send('cant find anime.');
                return;
            }
            const data = resData.data.Media;
                if(data.status === 'RELEASING'){
                    let confirmEmbed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${data.title.english}`)
                    .setDescription(`${data.title.romaji}`)
                    .addField('Started Date', `${data.startDate.day}/${data.startDate.month}/${data.startDate.year}`)
                    .addField('Status', 'Currently Running')
                    .addField('Upcomming Episode', `${data.nextAiringEpisode.episode}`)
                    .setThumbnail(`${data.coverImage.medium}`);
                    message.channel.send(confirmEmbed);
                    message.channel.send('if this is the anime that you were expecting then send `yes` in chat.');
                    const animeListJson = fs.readFileSync("notifyingAnime.json");
                    const currentEp = data.nextAiringEpisode.episode - 1;
                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
                    collector.on('collect', message => {
                    let animeList = JSON.parse(animeListJson);
                    let author = message.author.id;

                        if (message.content == "yes") {
                            message.channel.send("You said Yes!");
                            if(animeList.find((anime)=> anime.animeId === data.id)){
                                let anime = animeList.find((anime)=> anime.animeId = data.id);
                                if(anime.users.find((user)=> user === author)){
                                    message.reply('You are already being notified!');
                                    return;
                                }else{
                                    let newUser = author;
                                    animeList.map(anime => {
                                        if(anime.animeId === data.id){
                                            anime.users.push(newUser);
                                        }
                                    });

                                    const stringifyAnimeList = JSON.stringify(animeList);
                                    fs.writeFile("notifyingAnime.json", stringifyAnimeList, (next) =>{
                                    message.channel.send(`Done, you will be notified when ${data.nextAiringEpisode.episode} episode of ${data.title.english} comes out!`);
                                });

                                }

                            }else{

    
                                let newList = {
                                    animeId:data.id,
                                    users: [
                                    author
                                    ],
                                    ep: currentEp 
                                };
                                animeList.push(newList);
                                const stringifyAnimeList = JSON.stringify(animeList);
                                fs.writeFile("notifyingAnime.json", stringifyAnimeList, (next) =>{
                                    message.channel.send(`Done, you will be notified when ${data.nextAiringEpisode.episode} episode of ${data.title.english} comes out!`);
                                });
                            }

                        }else{
                            return;

                        }

                    });
                }else {
                    let animeEmbed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`${data.title.english}`)
                    .setDescription(`${data.title.romaji}`)
                    .addField('Started Date', `${data.startDate.day}/${data.startDate.month}/${data.startDate.year}`)
                    .addField('Status', 'Completed')
                    .addField('Episodes', `${data.episodes}`)
                    .setThumbnail(`${data.coverImage.medium}`);
                    message.channel.send(animeEmbed);
                    message.channel.send('wtf bro, its an old anime.');
                }
        });
       
        
       


    }
};
