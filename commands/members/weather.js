const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
     name: "weather",
     description: "Kunai pani sahar ko Mausam patta lagaunu hos.",
     execute(message, args) {
        if (args.length == 0) {
            message.reply("LOL, ha ha ha, idk what city to search.");
            return;
            }

        let city = args[0];
        let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f5cc19a99ddb4209b986bee4c3bbe1a3`
        fetch(api)
            .then(res=> res.json())
            .then(data=> {
                if(data.cod === '404'){
                    message.reply("Bruh, you are worst then Subu when it comes to spelling mistakes.");

                }else{
                    let image;
                    if(data.main.feels_like >= '32'){
                        image= 'https://media1.tenor.com/images/248dfd12eba0fa5d3994552d1db67b08/tenor.gif?itemid=3462611'
                    }else if(data.main.feels_like >='22'){
                        image = 'https://lh3.googleusercontent.com/proxy/wSL6aXucGi3qnPIp5b0rCUdJcbupxzSJyrWmXdY5Jz6zy8xwolJ6JTFsKwlqG8zGtQidFgclErmHF0xGR5ZXpeFo0iFDx3cPlK4lA-VLJm1yh50prHT79Nq-MWL1TRfUnQlWX3LI7OYDj67snsG2vo_mDC2kNToBHHM_m8iMxsoc'
                    }
                    else if(data.main.feels_like >= '15'){
                        image = 'https://www.pngitem.com/pimgs/m/157-1571366_girl-cute-cold-winter-anime-scarf-anime-cold.png'
                    }
                    else{
                        image = 'https://media1.tenor.com/images/bc6fcf929be80ed3d163069280766d62/tenor.gif?itemid=9101686'
                    }
                    
                    let weatherEmbed = new Discord.RichEmbed()
                    .setAuthor('Open Weather', 'https://pbs.twimg.com/profile_images/1173919481082580992/f95OeyEW.jpg')
                    .setColor('RANDOM')
                    .setTitle(`Weather in ${data.name}(${data.sys.country})`)
                    .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
                    .addField("Weather", `${data.weather[0].main}(${data.weather[0].description})`)
                    .addField("Temperature", `${data.main.temp} but feels like its ${data.main.feels_like}`)
                    .addField("Humidity", `${data.main.humidity}`)
                    .setImage(image);

                    message.channel.send(weatherEmbed);
                    // console.log(data);
                }


            });

        
       


     },
};
