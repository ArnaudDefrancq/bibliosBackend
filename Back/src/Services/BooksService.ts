import { DAO } from "../DAO/DAO.js";
import type { Books } from "../Schemas/BooksSchema.js";

export class BooksService {
    private booksDAO: DAO<Books>;

    constructor() {
        this.booksDAO = new DAO('books', 'id_book');
    }

    public async createBook(book: Books): Promise<number> {
        return await this.booksDAO.create(book);
    }
    
    public async findBook(options: {where?: string, params?: any[], join?: string}): Promise<Books[]> {
        return await this.booksDAO.find(options);
    }

    public async findBookById(id: number): Promise<Books | null> {
        return await this.booksDAO.findById(id);
    }

    public async updateBook(id: number, book: Partial<Books>): Promise<number> {
        return await this.booksDAO.update(id, book);
    }

    public async deleteBook(id: number): Promise<number> {
        return await this.booksDAO.delete(id);
    }
}