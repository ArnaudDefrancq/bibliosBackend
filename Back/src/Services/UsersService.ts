import { DAO } from "../DAO/DAO.js";
import type { Users } from "../Schemas/UsersSchema.js";

export class UsersService {
    private usersDAO: DAO<Users>;

    constructor() {
        this.usersDAO = new DAO('users', 'id_user');
    }

    public async createUser(user: Users): Promise<number> {
        return await this.usersDAO.create(user);
    }
    
    public async findUser(options: {where?: string, params?: any[], join?: string}): Promise<Users[]> {
        return await this.usersDAO.find(options);
    }

    public async findUserById(id: number): Promise<Users | null> {
        return await this.usersDAO.findById(id);
    }

    public async updateUser(id: number, user: Partial<Users>): Promise<number> {
        return await this.usersDAO.update(id, user);
    }

    public async deleteUser(id: number): Promise<number> {
        return await this.usersDAO.delete(id);
    }
}