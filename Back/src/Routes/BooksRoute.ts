import express, { Router } from "express";
import { BooksController } from "../Controllers/BooksController.js";

class BooksRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/book', BooksController.createBook);
        this.router.get('/', BooksController.findBooks);
        this.router.get('/with-author', BooksController.findBooks)
        this.router.get('/:id', BooksController.findBookById);
        this.router.get('/with-author/:id', BooksController.findBookById)
        this.router.put('/:id', BooksController.updateBook);
        this.router.delete('/:id', BooksController.deleteBook)
    }
}

export default new BooksRoute().router;