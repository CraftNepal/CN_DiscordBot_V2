const config = require("../config.json");
const mongoose = require('mongoose');
const uri = `mongodb+srv://${config.mongoDbUser}:${config.mongoDbPassword}@cluster0.8kll7.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (!error) {
        console.log('connected to mongoDB successfully!');

    } else {
        console.log('Error while connecting to database.');
    }
});
const Animes = require('./animeModel');
