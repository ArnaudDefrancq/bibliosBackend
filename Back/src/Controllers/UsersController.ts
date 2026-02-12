import { UserSchema, type Users } from "../Schemas/UsersSchema.js";
import { UsersSearchSchema, type UsersSearch } from "../Schemas/UsersSearchSchema.js";
import { UsersService } from "../Services/UsersService.js";
import type { Request, Response } from "express";
import 'dotenv/config';


export class UsersController {

    public static async createUser(req: Request, res: Response): Promise<void> {
        const result = UserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
        }

        const userData: Users = result.data;

        try {
            const service: UsersService = new UsersService();
            const newId = await service.createUser(userData);
            res.status(201).json({
                message: 'user create !',
                number: newId
            });     
            return;       
        } catch (err) {
            res.status(500).json({
                message: "Create user failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findUsers(req: Request, res: Response): Promise<void> {
        const result = UsersSearchSchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({ 
                message: "Params not valid", 
                errors: result.error.flatten
            });
            return;
        }

        const criteria: UsersSearch = result.data;

        try {
            const service: UsersService = new UsersService();
            
            const filters : string[] = [];
            const params: any[] = [];

            // Permet de definir options.where + options.params
            if (criteria.name) {
                filters.push("name = ?");
                params.push(`${criteria.name}`);
            }
            if (criteria.firstname) {
                filters.push("firstname = ?");
                params.push(`${criteria.firstname}`);                
            }

            const options = {
                where: (filters.length > 0) ? filters.join('AND') : undefined,
                params
            }

            const users: Users[] = await service.findUser(options);
            res.status(200).json({users});
            return;
        } catch (err) {
            res.status(500).json({
                message: "find user failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findUserById(req: Request, res: Response): Promise<void> {
        try {
            const idUser: number = Number(req.params.id);

             if (isNaN(idUser)) {
                res.status(400).json({ error: 'ID user is not valid' });
                return;  
            }

            const service: UsersService = new UsersService();

            const user: Users | null = await service.findUserById(idUser);

            if (!user) {
                res.status(400).json({error: "User not found !"});
                return;
            }

            res.status(200).json(user);
            return
        } catch (err) {
            res.status(500).json({
                message: "find user failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const idUser: number = Number(req.params.id);

             if (isNaN(idUser)) {
                res.status(400).json({ error: 'ID user is not valid' });
                return;  
            }

            const result = UserSchema.safeParse(req.body);
            if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
            }

            const userData: Partial<Users> = result.data;

            const service: UsersService = new UsersService();

            const updateUser: number = await service.updateUser(idUser, userData)
            res.status(201).json({
                message: 'user udate !',
                number: updateUser
            }); 
            return
        } catch (err) {
            res.status(500).json({
                message: "update user failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const idUser: number = Number(req.params.id);
            if (isNaN(idUser)) {
                res.status(400).json({ error: 'ID user is not valid' });
                return;  
            }

            // Ajouter une vérif : tous les livres sont rendus
            const servive: UsersService = new UsersService();
            const deleteUser: number = await servive.deleteUser(idUser);

            res.status(200).json({
                message : "User delete !",
                idUser: deleteUser
            })

        } catch (err) {
            res.status(500).json({
                message: "delete user failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }

    }
}