const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
    mongoose.connect(process.env.mongoURI)
    .then( () => {
      console.log('Connected to Database');
    })
    .catch((error) => {
      console.error(error);
    });
}; 

module.exports = connectDB;