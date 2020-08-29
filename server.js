const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
require("./models/zomentum_movie_ticket");
require("./models/zomentum_users");

app.use(express.json());
require("./routes/ticket")(app);
require("./routes/user")(app);

mongoose.connect("mongodb://localhost:27017/ZOMENTUM_MOVIE_TICKET", {
  useNewUrlParser: true,
})
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("err in connect:", err));

app.listen(5000, () => console.log("App is running"));
