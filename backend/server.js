require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
// const questionRoutes = require("./routes/questionRoutes");

app.use(
    cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
// app.use("/api/questions",questionRoutes);

// app.use("/api/ai/generate-questions",ProcessingInstruction,generateInterviewQuestions);
// app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});