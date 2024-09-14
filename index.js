const express = require("express");
const app = express();
const PORT = 4040;
app.use(express.json())


const Connection = require("./config/db");


const userRouter = require('./routes/user.route');
const todoRoute = require("./routes/todo.route");

app.use('/user' , userRouter)
app.use('/todo' , todoRoute)

app.listen(PORT, async () => {
  await Connection;
  console.log(`Server is listen on ${PORT} and Connected to Database`);
});
