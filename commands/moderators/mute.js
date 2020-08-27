const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
     name: "mute",
     description: "Mute a member",
     // execute  (message,  args){message.channel.send(args); }
     execute(message, args) {
          if(!message.mentions.users.first()){
               message.channel.send('Please tag a User after `.mute` command.');
          }else{
               const member = message.mentions.members.first();
               if(!member.roles.some(role => role.name === 'Owners')){
                    if(!member.roles.some(role => role.name === 'muted')) {

                         const muteUser = member.addRole(config.currentGuild.muteRole);
                         if(muteUser){
                              message.channel.send(`${member} was muted!`);
                         }else{
                              message.channel.send('Unable to mute user!');
                         }
                    }
                    else
                    {
                         message.channel.send(`${member} is already muted!`);
                    }

               }else{
                    message.channel.send('Sorry, i respect my creators! I shall mute you instead!');
                    message.member.addRole(config.currentGuild.muteRole);
               }
               // console.log(config.currentGuild.muteRole);
          }
      },
};
