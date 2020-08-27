//

const fs = require("fs");
const fetch = require("node-fetch");
//skin

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
               if (type === "fullBody") {
                    //This is to switch links based on the incoming query parameter
                    link = `https://mc-heads.net/body/${extractedName}`;
                    default_link = `https://mc-heads.net/body/${user}`;
               } else {
                    console.log("Extracted name : ", extractedName);
                    link = `http://cravatar.eu/head/${extractedName}/128.png`;
                    default_link = `https://minotar.net/helm/${user}`;
               }
               if (!err) {
                    console.log(data.toString());

                    fetch(link).then((response) => {
                         response.body.pipe(res);
                    });
               } else {
                    console.log(err);
                    fetch(default_link).then((response) => {
                         response.body.pipe(res);
                    });
               }
          }
     );
};
