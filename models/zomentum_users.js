const mongoose = require("mongoose");
const { Schema } = mongoose;

const user_schema = new Schema({
  username: String,
  phone: String,
});

module.exports = mongoose.model("zomentum_users", user_schema);
