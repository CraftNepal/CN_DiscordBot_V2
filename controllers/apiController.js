//

const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
//skin
exports.getSkinNoname = (req, res, next) => {
     res.redirect("/api/skin/steve");
};
exports.getSkin = (req, res, next) => {
     const getuser = req.params.username;
     const user = getuser;
     console.log(user.toLowerCase());
     let extractedName = "";
     console.log("The query parameter passed was : ", req.query.type);
     const type = req.query.type;
     let link, default_link;
     if (!user) {
          const err = new Error("No User was defined");
          err.statusCode = 400;
          throw err;
     }
     fs.readFile(
          `/data/cnobi/MCManager/servers/Proxy/plugins/SkinsRestorer/Players/${user.toLowerCase()}.player`,
          (err, data) => {
               if (err) {
                    data = "Steve";
               }

               extractedName = data.toString();
               if (!extractedName) {
                    extractedName = "Steve";
               }
               if (type === "fullBody") {
                    //This is to switch links based on the incoming query parameter
                    link = `https://mc-heads.net/body/${extractedName}`;
                    default_link = `https://mc-heads.net/body/${user.toLowerCase()}`;
               } else {
                    console.log("Extracted name : ", extractedName);
                    link = `http://cravatar.eu/head/${extractedName}/128.png`;
                    default_link = `https://minotar.net/helm/${user.toLowerCase()}`;
               }
               if (!err) {
                    console.log(data.toString());

                    res.redirect(link);
               } else {
                    console.log(err);
                    res.redirect(default_link);
               }
          }
     );
};
