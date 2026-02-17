import express, { Router } from "express";
import { BooksController } from "../Controllers/BooksController.js";

export class AuthorsRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/author', BooksController.createBook);
        this.router.get('/', BooksController.findBooks);
        this.router.get('/:id', BooksController.findBookById);
        this.router.put('/:id', BooksController.updateBook);
        this.router.delete('/:id', BooksController.deleteBook)
    }
}