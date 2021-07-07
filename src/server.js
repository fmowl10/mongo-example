const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((response) => { console.log("db Connected"); });

const app = express();


app.use(express.static("build"));
app.use(express.json());
app.use('/todo', require('./route'));

const server = http.createServer(app);
const port = process.env.PORT || 80;

server.listen(port, () => {
    console.log("on here " + port);
})