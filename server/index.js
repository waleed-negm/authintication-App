require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// db connection
connection();

//middleware
app.use(express.json);
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/users", authRoutes);
const port = process.env.port;
app.listen(port, () => {
    console.log(`Listining on port : ${port}`);
});
