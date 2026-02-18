import express from "express";
import 'dotenv/config';

import UsersRoute from "./Routes/UsersRoute.js";
import BooksRoute from "./Routes/BooksRoute.js";
import AuthorsRoute from "./Routes/AuthorsRoute.js";
import LoansRoute from "./Routes/LoansRoute.js";
import LoansDetailsRoute from "./Routes/LoansDetailsRoute.js";
import { Database } from "./Database/Database.js";

const PORT = process.env.PORT_SERVER;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Route init
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello from the express server",
    });
});

// Routes
app.use('/users', UsersRoute);
app.use('/books', BooksRoute);
app.use('/authors', AuthorsRoute);
app.use('/loans', LoansRoute);
app.use('/loans-details', LoansDetailsRoute)


// Ecoute du serveur
async function startServer() {
    try {
        // On initialise le pool UNE SEULE FOIS ici
        await Database.initPool(); 
        console.log("✅ Database pool initialized");

        app.listen(3000, () => {
            console.log("🚀 Server running on http://localhost:3000");
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
} 

startServer();