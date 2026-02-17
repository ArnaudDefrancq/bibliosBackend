import express, { Router } from "express";
import { LoansController } from "../Controllers/LoansController.js";

class LoansRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/author', LoansController.createLoans);
        this.router.get('/', LoansController.findLoans);
        this.router.get('/:id', LoansController.findLoanById);
        this.router.put('/:id', LoansController.updateLoan);
        this.router.delete('/:id', LoansController.deleteLoan)
    }
}

export default new LoansRoute().router;