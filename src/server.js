const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

let mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(process.env.MONGODB, mongooseOption, _ => console.log("DB Connect"));

mongoose.connection.on('error', (err) => { console.log(err); process.exit(1) });

const app = express();


app.use(express.static("build"));
app.use(express.json());
app.use('/todo', require('./route'));

const server = http.createServer(app);
const port = process.env.PORT || 80;

server.listen(port, () => {
    console.log("on here " + port);
})