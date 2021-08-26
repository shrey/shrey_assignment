// var util= require('util');
// var encoder = new util.TextEncoder('utf-8');
const express = require('express');
const router = require('./routes');
const mongoose = require("mongoose");
const app     = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// ROUTES
app.use( router);

//PORT
let port = 3000;
app.set('port' ,port);
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

// MONGODB SETUP
const uri = process.env.MONGO_URI || "mongodb+srv://Sezal:sezalmittal@cluster0.usfbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(uri);

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected!');
});
