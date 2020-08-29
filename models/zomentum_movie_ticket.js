const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticket_schema = new Schema({
  userid: Schema.Types.ObjectId,
  time: String,
});

module.exports = mongoose.model("zomentum_movie_tickets", ticket_schema);
