import { DAO } from "../DAO/DAO.js";
import type { Author } from "../Schemas/AuthorsSchema.js";


export class AuthorsService {
    private authorDAO: DAO<Author>;

    constructor() {
        this.authorDAO = new DAO('authors', 'id_author');
    }

    public async createAuthor(author: Author): Promise<number> {
        return await this.authorDAO.create(author);
    }
    
    public async findAuthor(options: {where?: string, params?: any[], join?: string}): Promise<Author[]> {
        return await this.authorDAO.find(options);
    }

    public async findAuthorById(id: number): Promise<Author | null> {
        return await this.authorDAO.findById(id);
    }

    public async updateAuthor(id: number, author: Partial<Author>): Promise<number> {
        return await this.authorDAO.update(id, author);
    }

    public async deleteAuthor(id: number): Promise<number> {
        return await this.authorDAO.delete(id);
    }
}