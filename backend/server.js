require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});