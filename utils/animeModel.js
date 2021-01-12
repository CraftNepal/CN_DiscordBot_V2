const mongoose = require('mongoose');

var animeSchema = new mongoose.Schema({
    animeId: {
        type: String,
        required: "Required"
    },
    users: [mongoose.Schema.Types.Mixed],
    ep: {
        type: String
    }
});

mongoose.model("Anime", animeSchema);