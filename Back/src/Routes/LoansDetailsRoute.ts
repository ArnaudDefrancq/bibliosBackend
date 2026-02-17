import express, { Router } from "express";
import { LoansDetailsController } from "../Controllers/LoansDetailsController.js";

class LoansDetailsRoute {
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

export default new LoansDetailsRoute().router;