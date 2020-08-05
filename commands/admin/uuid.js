const Discord = require("discord.js");

module.exports = {
     name: "uuid",
     description: "Gives UUID of A player!",
     execute(message, args) {
          const mysql = require("mysql");
          const { sql_password, sql_username } = require("../config.json");
          //intializing variables with SQL connection information.
          var con_cndb = mysql.createConnection({
               host: "localhost",
               user: sql_username,
               password: sql_password,
               database: "CraftNepalDB",
          });
          let playername = args[0];
          con_cndb.query(
               `SELECT name FROM permissions WHERE value = "${playername}";`,
               (err, rows) => {
                    if (err) throw err;
                    if (rows.length < 1 || rows == undefined) {
                         message.channel.send(`No such Player was found ! `);
                    } else {
                         let uuid = rows[0].name;
                         message.channel.send(`Player's UUID is ${uuid}`);
                    }
               }
          );
     },
};
