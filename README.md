# CN_DiscordBot_V2

CraftNepal DiscordBot source code.

## Do not Check ./commands/members/playtime.js

### This is the best advice I can give you .

Jokes aside

# Config.json file format

```js
{
     "prefix": ".",
     "token": "TOKEN_HERE",
     "sqlUsername": "USERNAME_HERE",
     "sqlPassword": "PASSWORD_HERE",

     "rulesChannel": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "membersRole": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "welcomeChannel": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "unverifiedRole": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "ownerRole": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "discordLogChannel": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

     "bots": {
          "INFO": "DO NOT EDIT THESE. JUST COPY THE CURRENT BOT AND PASTE IN token ABOVE",
          "codeBot": {
               "token": "STORE DIFFERENT ID HERE FOR FUTURE USE"
          },
          "craftNepal": {
               "token": "STORE DIFFERENT ID HERE FOR FUTURE USE"
          }
     },
     "currentGuild": {
          "name": "craftNepal",
          "id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "welcomeChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "testBotChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "discordLogChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "rulesChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "infoChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "helpChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "weebChannelId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "roles": {
               "adminRoleId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
               "serverBotRoleId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
               "helpersRoleId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          }
     },

}
```
