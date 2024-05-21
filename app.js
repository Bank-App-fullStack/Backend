const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const router = require('./src/routes/index.js');
require('./mongoConnection.js')

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to my API");
})

app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`server launch on port ${process.env.PORT}`);
});