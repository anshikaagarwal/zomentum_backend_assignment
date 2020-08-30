# zomentum_backend
## REST interface for a movie theatre ticket booking system in Nodejs and Mongodb
**Here is the link to screenshots: https://drive.google.com/file/d/1_XCWPYlacqtE_DzR9uz8zKJWTttAIz8v/view?usp=sharing**

### Endpoints in the api
* **/api/add_user/**: An endpoint to add a user
  * username: Name of a user
  * phone: Contact number of a user
* **/api/book-ticket/**: An endpoint to book a ticket using a user’s name, phone number, and timings
  * userid: A valid mongodb user id
  * time: Date and time in a (date/month/year  hr:min) format. For example: 29/8/2020 22:30
* **/api/update-ticket/**: An endpoint to update a ticket timing
  * ticket_id: A valid mongodb id of a ticket to be updated
  * to_time: To update timings of a ticket to new time
* **/api/view-tickets/**: An endpoint to view all the tickets for a particular time
  * time: Time at which tickets are booked
* **/api/delete-ticket/**: An endpoint to delete a particular ticket
  * ticket_id: A valid mongodb id of a ticket to be deleted
* **/api/user-info/**: An endpoint to view the user’s details based on the ticket id
  * ticket_id: A valid mongodb id of a ticket 
* **setInterval(Delete_Expired_Tickets, 1000 * 30 * 60)**: Delete all the tickets which are expired automatically
  * Delete_Expired_Ticket() function finds and delete all expired tickets every 30 mintutes
