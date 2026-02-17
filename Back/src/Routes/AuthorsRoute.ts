import express, { Router } from "express";
import { AuthorsController } from "../Controllers/AuthorsController.js";

class AuthorsRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/author', AuthorsController.createAuthor);
        this.router.get('/', AuthorsController.findAuthors);
        this.router.get('/:id', AuthorsController.findAuthorById);
        this.router.put('/:id', AuthorsController.updateAuthor);
        this.router.delete('/:id', AuthorsController.deleteAuthor)
    }
}

export default new AuthorsRoute().router;