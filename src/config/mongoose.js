const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config()

mongoose.Promise = global.Promise;

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
})

mongoose.connection.on("error", (err) => {
    console.log("Failed connecting to MongoDB", err);
})

exports.Connect = () => {
    mongoose.connect(process.env.MONGO_URI)
    return mongoose.connection
}


