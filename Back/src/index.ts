import express from "express";
import 'dotenv/config';
import UserRoute from "./Routes/UsersRoute.js";
import BooksRoute from "./Routes/BooksRoute.js";
import AuthorsRoute from "./Routes/AuthorsRoute.js";
import LoansRoute from "./Routes/LoansRoute.js";
import LoansDetailsRoute from "./Routes/LoansDetailsRoute.js";

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
app.use('/books', BooksRoute);
app.use('/authors', AuthorsRoute);
app.use('/loans', LoansRoute);
app.use('/loans-details', LoansDetailsRoute)


// Ecoute du serveur
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 