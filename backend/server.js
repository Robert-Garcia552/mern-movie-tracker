const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');

require ('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: false });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("🚀 MongoDB database connection established successfully 🚀");
});

// Routes
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
