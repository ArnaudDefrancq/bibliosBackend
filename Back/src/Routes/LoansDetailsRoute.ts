import express, { Router } from "express";
import { LoansDetailsController } from "../Controllers/LoansDetailsController.js";

export class AuthorsRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', LoansDetailsController.findLoansDetails);
        this.router.get('/:id', LoansDetailsController.findloanDetailsById);
    }
}