import express, { Router } from "express";
import { UsersController } from "../Controllers/UsersController.js";

class UsersRoute {
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
        // update
        this.router.put('/:id', UsersController.updateUser);
        // Delete = mettre le isActive = 0
        this.router.put('/:id/delete', UsersController.deleteUser);
    }
}


export default new UsersRoute().router;