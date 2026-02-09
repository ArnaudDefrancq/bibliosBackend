import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT_SERVER;
const app = express();

// Route init
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello from the express server",
    });
});

// Ecoute du serveur
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 