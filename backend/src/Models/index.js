const dbConfig = require("../config/config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Goal = require("./Goal.js")(mongoose);
db.User = require("./User.js")(mongoose);

module.exports = db;
