const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Set up default mongoose connection
var mongoDB = process.env.MONGO_URI;

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connected to MongoDB database");
        })
        .catch((error) => {
            console.log("Database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    // Get the default connection
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
        // we're connected!
        console.info("MongoDB connection successfull");
    });
    //const collection = client.db("tesis").collection("data_users");
};