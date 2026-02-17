import express from "express";
import 'dotenv/config';
import UserRoute from "./Routes/UsersRoute.js";

const PORT = process.env.PORT_SERVER;
const app = express();

// Route init
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello from the express server",
    });
});

// Routes
app.use('/users', UserRoute);


// Ecoute du serveur
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 