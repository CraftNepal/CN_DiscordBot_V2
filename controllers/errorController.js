const client = require("../client").client();
const discord = require("../client");
exports.errorHandler = (err) => {
     //lets handle some errors here
     console.log("Exiting Process");
     client
          .destroy()
          .then(() => {
               process.exit();
          })
          .catch((err) => {
               console.log(err);
               console.log("It seems to be very difficult to make a connection ! :(");
               process.exit();
          });
};
