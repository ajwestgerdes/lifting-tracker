//Server file that runs our express server

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const lifts = require('./routes/api/lifts');

const app = express();

//bodyparse middleware
app.use(bodyParser.json());

//mongoDB config (where the uri is held)
const mongodb = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
    .connect(mongodb, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected.....'))
    .catch(err => console.log(err));

//use routes
app.use('/lifts', lifts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
