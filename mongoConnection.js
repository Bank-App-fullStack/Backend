const mongoose = require("mongoose");

function mongoConnect() {
    mongoose
        .connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB_NAME}.rev9olq.mongodb.net/?retryWrites=true&w=majority&appName=dbtest`
        )
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("Connection failed", err);
        });
}

module.exports = mongoConnect();