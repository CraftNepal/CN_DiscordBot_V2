const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
     name: "unmute",
     description: "UnMute a member",
     // execute  (message,  args){message.channel.send(args); }
     execute(message, args) {
            if(!message.mentions.users.first()){
                message.channel.send('Please tag a User after `.mute` command.');
            }else{

                const member = message.mentions.members.first();
                if(member.roles.some(role => role.name === 'Muted')){
                        const unMuteUser = member.removeRole(config.currentGuild.muteRole);
                        if(unMuteUser){
                            message.channel.send(`${member} was Unmuted!`);
                        }else{
                            message.channel.send('Unable to Unmute user!');
                        }

                }else{
                    message.channel.send(`${member} was never muted!`);
                }
                // console.log(config.currentGuild.muteRole);
            }
      },
};
