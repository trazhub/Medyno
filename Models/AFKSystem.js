const { model, Schema } = require("mongoose");

let afkSchema = new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String
});

module.exports = model("AFK", afkSchema);