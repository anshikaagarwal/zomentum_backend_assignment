const mongoose = require("mongoose");
const user_model = mongoose.model("zomentum_users");

module.exports = app => {
  app.post('/api/add_user', async (req, res) => {
    const { username, phone } = req.body;
    try {
      const response = await new user_model({ username, phone });
      await response.save();
      console.log(username, phone, response);
      res.status(200).json({
        status: "success",
        data: response
      })
    } catch (err) {
      console.log("err in adding user:", err);
      res.status(500).json({
        status: "fail",
        message: "Internal Server Error"
      })
    }
  })
}