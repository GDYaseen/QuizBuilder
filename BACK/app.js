var express = require('express');
var path = require('path');
let cors = require("cors")
var sessions = require('express-session');
let dotenv = require("dotenv")

var usersRouter = require('./routes/userRoutes');
var questionsRouter = require('./routes/questionRoutes');
var quizsRouter = require('./routes/quizRoutes');
var profsRouter = require('./routes/profRoutes');
var app = express();



app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(sessions({
    secret: 'secret',
    resave:false,
    name:'userSession',
    cookie: { maxAge: 24*3600*1000 }
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/question', questionsRouter);
app.use('/quiz', quizsRouter);
app.use('/prof', profsRouter);

module.exports = app


