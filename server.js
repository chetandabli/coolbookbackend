const express = require("express");
const { connection } = require("./config/db");
const app = express();
const {ragistrationRaoute} = require("./routes/ragistration.routes")
const {loginRaoute} = require("./routes/Login.route")
const {Bookroute} = require("./routes/Book.route")
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use("/register", ragistrationRaoute);
app.use("/login", loginRaoute)
app.use("/books", Bookroute)

let port = process.env.port
app.listen(port, async ()=>{
    try {
        await connection;
        console.log("server is running at port", port);
    } catch (error) {
        console.log("error eccures: ", error);
    }
    
})