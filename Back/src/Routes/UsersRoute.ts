import express, { Router } from "express";
import { UsersController } from "../Controllers/UsersController.js";

export class UserRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/user', UsersController.createUser);
        // Ajouter les routes pour faire les jointures
        this.router.get('/', UsersController.findUsers);
        this.router.get('/:id', UsersController.findUserById);
        this.router.put('/:id', UsersController.updateUser);
        this.router.delete('/:id', UsersController.deleteUser)
    }
}