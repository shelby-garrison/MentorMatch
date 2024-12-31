const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const requestsRouter = require("./routes/requestsRouter");
const connectionsRouter = require("./routes/connectionsRouter");
const profileRouter = require("./routes/profileRouter");
const matchRouter = require("./routes/matchRouter");


const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('hgjvvujvujvh'));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
// app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);
app.use("/connections", connectionsRouter);
app.use("/profile", profileRouter);
app.use("/match", matchRouter);



app.get("*",  async function (req, res) {
  res.render("404");
 }  
 );
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
