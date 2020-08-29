const mongoose = require("mongoose");

const user_model = mongoose.model("zomentum_users");
const ticket_model = mongoose.model("zomentum_movie_tickets");

const CheckTicketCount = async (time) => {
  const res = await ticket_model.find({ time });
  console.log(res, time, res.length);
  if (res.length >= 20) return false;
  else return true;
}

module.exports = app => {
  app.post("/api/book-ticket", async (req, res) => {
    const { userid, time } = req.body;
    console.log(req.body);
    try {
      const user = await user_model.findById(userid);
      if (!user) {
        res.status(404).json({
          status: "fail",
          message: "User not found"
        })
      }
      CheckTicketCount(time).then(async (check) => {
        if (check == true) {
          const response = await new ticket_model({ userid: user._id, time });
          await response.save();
          res.status(200).json({
            status: "success",
            message: "Ticket booked successfully"
          })
        } else {
          res.status(403).json({
            status: "fail",
            message: "Not more than 20 Tickets allowed at same time"
          })
        }
      });
    } catch (err) {
      console.log("err in book ticket", err);
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      })
    }
  });

  app.post("/api/update-ticket/", async (req, res) => {
    const { ticket_id, to_time } = req.body;
    try {
      const ticket = await ticket_model.findById(ticket_id);
      if (!ticket) {
        res.status(404).json({
          status: "fail",
          message: "Ticket not found"
        })
      }
      CheckTicketCount(to_time).then(async (check) => {
        if (check == true) {
          const response = await ticket_model.findByIdAndUpdate(ticket_id, { time: to_time })
          res.status(200).json({
            status: "success",
            message: "Ticket time updated successfully"
          });
        } else {
          res.status(403).json({
            status: "fail",
            message: "Not more than 20 Tickets allowed at same time"
          })
        }
      })
    } catch (err) {
      console.log("err in update ticket", err);
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      })
    }
  })

  app.get("/api/view-tickets", async (req, res) => {
    const { time } = req.body;
    try {
      const tickets = await ticket_model.find({ time });
      res.status(200).json({
        status: "success",
        data: tickets
      })
    } catch (err) {
      console.log("err in view ticket", err);
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      })
    }
  })

  app.delete("/api/delete-ticket", async (req, res) => {
    const { ticket_id } = req.body;
    try {
      const ticket = await ticket_model.findById(ticket_id);
      if (!ticket) {
        res.status(404).json({
          status: "fail",
          message: "Ticket not found"
        })
      }
      const response = await ticket_model.findByIdAndDelete(ticket_id);
      res.status(204).json({
        status: "success",
        data: response
      })
    } catch (err) {
      console.log("err in delete ticket", err);
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      })
    }
  })

  app.get("/api/user-info", async (req, res) => {
    const { ticket_id } = req.body;
    try {
      const ticket = await ticket_model.findById(ticket_id);
      if (!ticket) {
        res.status(404).json({
          status: "fail",
          message: "Ticket not found"
        })
      }
      const user = await user_model.findById(ticket.userid);
      res.status(200).json({
        status: "success",
        data: { username: user.username, phone: user.phone }
      })
    } catch (err) {
      console.log("err in user info", err);
      res.status(500).json({
        status: "fail",
        message: "Internal server error"
      })
    }
  })
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


const Delete_Expired_Tickets = async () => {
  const tickets = await ticket_model.find({});
  await asyncForEach(tickets, async ticket => {
    let ticketDate = new Date();
    const [date, month, year] = ticket.time.split(" ")[0].split('/');
    const [hr, min] = ticket.time.split(" ")[1].split(':');
    console.log(date, month, year, hr, min);
    ticketDate.setDate(date)
    ticketDate.setMonth(month)
    ticketDate.setYear(year)
    ticketDate.setHours(hr)
    ticketDate.setMinutes(min)

    let currentDate = new Date();
    let hours = ((currentDate.getTime() - ticketDate.getTime()) / 1000 / 3600) % 24;
    console.log("hrs:", hours);

    if (hours >= 8) {
      await ticket_model.findByIdAndDelete(ticket._id);
    }
  })
}
setInterval(Delete_Expired_Tickets, 1000 * 30 * 60);




