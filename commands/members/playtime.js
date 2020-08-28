const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
     name: "playtime",
     description: "shows playtime",
     execute(message, args) {
          const mysql = require("mysql");
          //intializing variables with SQL connection information.
          var con = mysql.createConnection({
               host: "localhost",
               user: config.sqlUsername,
               password: config.sqlPassword,
               database: "Statz",
          });
          // Maybe this new variable can be used for a second DB connection. --- YES IT CAN
          var con_cndb = mysql.createConnection({
               host: "localhost",
               user: config.sqlUsername,
               password: config.sqlPassword,
               database: "CraftNepalDB",
          });
          let target = args[0];
          let target_ign = "";
          let uuid = "";
          let classicplaytime = 0;
          let nepalplaytime = 0;
          let nepalendplaytime = 0;
          let nepalnetherplaytime = 0;
          let bedwarsplaytime = 0;
          let pvpplaytime = 0;
          let classicendplaytime = 0;
          let classicnetherplaytime = 0;
          let creativeplaytime = 0;
          let lobbyplaytime = 0;
          let IridiumSkyblock = 0;
          let IridiumSkyblockNether = 0;
          let rank = "Player";
          con_cndb.query(
               `SELECT name,value FROM permissions WHERE value = "${target}";`,
               (err, rows) => {
                    if (err) throw err;
                    if (rows.length < 1 || rows == undefined) {
                         message.channel.send(
                              `***There is no "${target}" in CraftNepal Server !*** `
                         );
                    } else {
                         uuid = rows[0].name;
                         target_ign = rows[0].value;
                         con_cndb.query(
                              `SELECT child,parent FROM permissions_inheritance WHERE child = "${uuid}";`,
                              (err, rows) => {
                                   if (err) throw err;
                                   if (!(rows.length < 1 || rows == undefined)) {
                                        rank = rows[0].parent;
                                   }
                              }
                         );
                         //nepal
                         con.query(
                              `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "nepal";`,
                              (err, rows) => {
                                   //con.query(`select * from statz_time_played where uuid="15bd5de6-c1c4-300e-93ab-1b501013e851" and world="nepal";`, (err, rows) => {//i changed UUID this to constant for now just for testing
                                   if (err) throw err;
                                   if (rows.length < 1 || rows == undefined) {
                                   } else {
                                        nepalplaytime = rows[0].value;
                                        let worldnepal = rows[0].world;
                                        //let playtime2 = rows[1].value;
                                   }
                                   //classic
                                   con.query(
                                        `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "classic";`,
                                        (err, rows) => {
                                             if (err) throw err;
                                             if (rows.length < 1 || rows == undefined) {
                                             } else {
                                                  classicplaytime = rows[0].value;
                                                  worldclassic = rows[0].world;
                                             }
                                             //bedwars
                                             con.query(
                                                  `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "bedwars";`,
                                                  (err, rows) => {
                                                       if (err) throw err;
                                                       if (rows.length < 1 || rows == undefined) {
                                                       } else {
                                                            bedwarsplaytime = rows[0].value;
                                                            let worldbedwars = rows[0].world;
                                                       }
                                                       //pvp
                                                       con.query(
                                                            `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "pvp";`,
                                                            (err, rows) => {
                                                                 if (err) throw err;
                                                                 if (
                                                                      rows.length < 1 ||
                                                                      rows == undefined
                                                                 ) {
                                                                      //nothing
                                                                 } else {
                                                                      pvpplaytime = rows[0].value;
                                                                      let worldpvp = rows[0].world;
                                                                 }

                                                                 //creative
                                                                 con.query(
                                                                      `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "creative_world";`,
                                                                      (err, rows) => {
                                                                           if (err) throw err;
                                                                           if (
                                                                                rows.length < 1 ||
                                                                                rows == undefined
                                                                           ) {
                                                                           } else {
                                                                                creativeplaytime =
                                                                                     rows[0].value;
                                                                                let worldcreative =
                                                                                     rows[0].world;
                                                                           }

                                                                           //lobby
                                                                           con.query(
                                                                                `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "world";`,
                                                                                (err, rows) => {
                                                                                     if (err)
                                                                                          throw err;
                                                                                     if (
                                                                                          rows.length <
                                                                                               1 ||
                                                                                          rows ==
                                                                                               undefined
                                                                                     ) {
                                                                                          //nothing
                                                                                     } else {
                                                                                          lobbyplaytime =
                                                                                               rows[0]
                                                                                                    .value;
                                                                                          let worldlobby =
                                                                                               rows[0]
                                                                                                    .world;
                                                                                     }

                                                                                     //nepal_end
                                                                                     con.query(
                                                                                          `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "nepal_end";`,
                                                                                          (
                                                                                               err,
                                                                                               rows
                                                                                          ) => {
                                                                                               if (
                                                                                                    err
                                                                                               )
                                                                                                    throw err;
                                                                                               if (
                                                                                                    rows.length <
                                                                                                         1 ||
                                                                                                    rows ==
                                                                                                         undefined
                                                                                               ) {
                                                                                                    //nothing here
                                                                                               } else {
                                                                                                    nepalendplaytime =
                                                                                                         rows[0]
                                                                                                              .value;
                                                                                                    let worldnepalend =
                                                                                                         rows[0]
                                                                                                              .world;
                                                                                               }

                                                                                               //classicend
                                                                                               con.query(
                                                                                                    `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "classic_the_end";`,
                                                                                                    (
                                                                                                         err,
                                                                                                         rows
                                                                                                    ) => {
                                                                                                         if (
                                                                                                              err
                                                                                                         )
                                                                                                              throw err;
                                                                                                         if (
                                                                                                              rows.length <
                                                                                                                   1 ||
                                                                                                              rows ==
                                                                                                                   undefined
                                                                                                         ) {
                                                                                                         } else {
                                                                                                              classicendplaytime =
                                                                                                                   rows[0]
                                                                                                                        .value;
                                                                                                              let worldclassicend =
                                                                                                                   rows[0]
                                                                                                                        .world;
                                                                                                         }
                                                                                                         //classic nether
                                                                                                         con.query(
                                                                                                              `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "classic_nether";`,
                                                                                                              (
                                                                                                                   err,
                                                                                                                   rows
                                                                                                              ) => {
                                                                                                                   if (
                                                                                                                        err
                                                                                                                   )
                                                                                                                        throw err;
                                                                                                                   if (
                                                                                                                        rows.length <
                                                                                                                             1 ||
                                                                                                                        rows ==
                                                                                                                             undefined
                                                                                                                   ) {
                                                                                                                   } else {
                                                                                                                        classicnetherplaytime =
                                                                                                                             rows[0]
                                                                                                                                  .value;
                                                                                                                        let worldclassicnether =
                                                                                                                             rows[0]
                                                                                                                                  .world;
                                                                                                                   }

                                                                                                                   //nepal nether
                                                                                                                   con.query(
                                                                                                                        `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "nether_nether";`,
                                                                                                                        (
                                                                                                                             err,
                                                                                                                             rows
                                                                                                                        ) => {
                                                                                                                             if (
                                                                                                                                  err
                                                                                                                             )
                                                                                                                                  throw err;
                                                                                                                             if (
                                                                                                                                  rows.length <
                                                                                                                                       1 ||
                                                                                                                                  rows ==
                                                                                                                                       undefined
                                                                                                                             ) {
                                                                                                                                  //NOTHING HERE
                                                                                                                             } else {
                                                                                                                                  nepalnetherplaytime =
                                                                                                                                       rows[0]
                                                                                                                                            .value;
                                                                                                                                  let worldnepalnether =
                                                                                                                                       rows[0]
                                                                                                                                            .world;
                                                                                                                             }

                                                                                                                             //skyblock
                                                                                                                             con.query(
                                                                                                                                  `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "IridiumSkyblock";`,
                                                                                                                                  (
                                                                                                                                       err,
                                                                                                                                       rows
                                                                                                                                  ) => {
                                                                                                                                       if (
                                                                                                                                            err
                                                                                                                                       )
                                                                                                                                            throw err;
                                                                                                                                       if (
                                                                                                                                            rows.length <
                                                                                                                                                 1 ||
                                                                                                                                            rows ==
                                                                                                                                                 undefined
                                                                                                                                       ) {
                                                                                                                                            //NOTHING HERE
                                                                                                                                       } else {
                                                                                                                                            IridiumSkyblock =
                                                                                                                                                 rows[0]
                                                                                                                                                      .value;
                                                                                                                                            let worldIridiumSkyblock =
                                                                                                                                                 rows[0]
                                                                                                                                                      .world;
                                                                                                                                       }

                                                                                                                                       //skyblock_nether
                                                                                                                                       con.query(
                                                                                                                                            `SELECT * FROM statz_time_played WHERE uuid = "${uuid}" and world = "IridiumSkyblock_nether";`,
                                                                                                                                            (
                                                                                                                                                 err,
                                                                                                                                                 rows
                                                                                                                                            ) => {
                                                                                                                                                 if (
                                                                                                                                                      err
                                                                                                                                                 )
                                                                                                                                                      throw err;
                                                                                                                                                 if (
                                                                                                                                                      rows.length <
                                                                                                                                                           1 ||
                                                                                                                                                      rows ==
                                                                                                                                                           undefined
                                                                                                                                                 ) {
                                                                                                                                                      //NOTHING HERE
                                                                                                                                                 } else {
                                                                                                                                                      IridiumSkyblockNether =
                                                                                                                                                           rows[0]
                                                                                                                                                                .value;
                                                                                                                                                      let worldIridiumSkyblockNether =
                                                                                                                                                           rows[0]
                                                                                                                                                                .world;
                                                                                                                                                 }

                                                                                                                                                 let totalskyblock =
                                                                                                                                                      IridiumSkyblock +
                                                                                                                                                      IridiumSkyblockNether;

                                                                                                                                                 let totalplaytime =
                                                                                                                                                      totalskyblock +
                                                                                                                                                      nepalnetherplaytime +
                                                                                                                                                      classicnetherplaytime +
                                                                                                                                                      classicendplaytime +
                                                                                                                                                      nepalplaytime +
                                                                                                                                                      classicplaytime +
                                                                                                                                                      bedwarsplaytime +
                                                                                                                                                      pvpplaytime +
                                                                                                                                                      creativeplaytime +
                                                                                                                                                      lobbyplaytime +
                                                                                                                                                      nepalendplaytime;

                                                                                                                                                 let nepaltotal =
                                                                                                                                                      nepalendplaytime +
                                                                                                                                                      nepalnetherplaytime +
                                                                                                                                                      nepalplaytime;

                                                                                                                                                 let classictotal =
                                                                                                                                                      classicplaytime +
                                                                                                                                                      classicendplaytime +
                                                                                                                                                      classicnetherplaytime;
                                                                                                                                                 if (
                                                                                                                                                      totalplaytime >
                                                                                                                                                      60
                                                                                                                                                 ) {
                                                                                                                                                      totalplaytime =
                                                                                                                                                           (
                                                                                                                                                                totalplaytime /
                                                                                                                                                                60
                                                                                                                                                           )
                                                                                                                                                                .toFixed(
                                                                                                                                                                     0
                                                                                                                                                                )
                                                                                                                                                                .toString() +
                                                                                                                                                           " Hours and " +
                                                                                                                                                           (
                                                                                                                                                                totalplaytime %
                                                                                                                                                                60
                                                                                                                                                           ).toString() +
                                                                                                                                                           " Minutes";
                                                                                                                                                 } else {
                                                                                                                                                      totalplaytime =
                                                                                                                                                           totalplaytime.toString() +
                                                                                                                                                           " Minutes";
                                                                                                                                                 }
                                                                                                                                                 let color =
                                                                                                                                                      "#" +
                                                                                                                                                      (
                                                                                                                                                           Math.random() *
                                                                                                                                                           100000
                                                                                                                                                      )
                                                                                                                                                           .toFixed(
                                                                                                                                                                0
                                                                                                                                                           )
                                                                                                                                                           .toString();
                                                                                                                                                 let playtimeEmbed = new Discord.RichEmbed()
                                                                                                                                                      .setThumbnail(
                                                                                                                                                           `http://craftnepal.host:1338/api/skin/${target}?time=${Date.now().toString()}`
                                                                                                                                                      )
                                                                                                                                                      .setImage(
                                                                                                                                                           `http://craftnepal.host:1338/api/skin/${target}?type=fullBody&time=${Date.now().toString()}`
                                                                                                                                                      )
                                                                                                                                                      .setColor(
                                                                                                                                                           "#0099ff"
                                                                                                                                                      )
                                                                                                                                                      .setTitle(
                                                                                                                                                           "**Playtime**"
                                                                                                                                                      )
                                                                                                                                                      .setColor(
                                                                                                                                                           `${color}`
                                                                                                                                                      )
                                                                                                                                                      .setDescription(
                                                                                                                                                           "Playtime in each world:"
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "Nepal",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     nepaltotal /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     nepaltotal %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "Classic",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     classictotal /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     classictotal %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "Skyblock",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     totalskyblock /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     totalskyblock %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "PvP",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     pvpplaytime /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     pvpplaytime %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "Bedwars",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     bedwarsplaytime /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     bedwarsplaytime %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "Lobby",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     lobbyplaytime /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     lobbyplaytime %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .addField(
                                                                                                                                                           "Creative",
                                                                                                                                                           `${
                                                                                                                                                                (
                                                                                                                                                                     creativeplaytime /
                                                                                                                                                                     60
                                                                                                                                                                )
                                                                                                                                                                     .toFixed(
                                                                                                                                                                          0
                                                                                                                                                                     )
                                                                                                                                                                     .toString() +
                                                                                                                                                                "h:" +
                                                                                                                                                                (
                                                                                                                                                                     creativeplaytime %
                                                                                                                                                                     60
                                                                                                                                                                ).toString() +
                                                                                                                                                                "m"
                                                                                                                                                           }`,
                                                                                                                                                           true
                                                                                                                                                      )
                                                                                                                                                      .setTitle(
                                                                                                                                                           `Total Playtime for __${
                                                                                                                                                                "[" +
                                                                                                                                                                rank +
                                                                                                                                                                "]"
                                                                                                                                                           }${target_ign}__: ${totalplaytime}`
                                                                                                                                                      )
                                                                                                                                                      .setTimestamp();
                                                                                                                                                 message.channel
                                                                                                                                                      .send(
                                                                                                                                                           playtimeEmbed
                                                                                                                                                      )
                                                                                                                                                      .then(
                                                                                                                                                           (
                                                                                                                                                                sent
                                                                                                                                                           ) => {
                                                                                                                                                                sent.client.setTimeout(
                                                                                                                                                                     () => {
                                                                                                                                                                          message.delete();
                                                                                                                                                                          sent.delete();
                                                                                                                                                                     },
                                                                                                                                                                     15000
                                                                                                                                                                );
                                                                                                                                                           }
                                                                                                                                                      );
                                                                                                                                            }
                                                                                                                                       );
                                                                                                                                  }
                                                                                                                             );
                                                                                                                        }
                                                                                                                   );
                                                                                                              }
                                                                                                         );
                                                                                                    }
                                                                                               );
                                                                                          }
                                                                                     );
                                                                                }
                                                                           );
                                                                      }
                                                                 );
                                                            }
                                                       );
                                                  }
                                             );
                                        }
                                   );
                              }
                         );
                    }
               }
          );
     },
};
