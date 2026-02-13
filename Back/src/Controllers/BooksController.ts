import type { Request, Response } from "express";
import 'dotenv/config';
import { BooksSchema, type Books } from "../Schemas/BooksSchema.js";
import { BooksSearchSchema, type BooksSearch } from "../Schemas/BooksSearchSchema.js";
import { BooksService } from "../Services/BooksService.js";


export class BooksController {

    public static async createBook(req: Request, res: Response): Promise<void> {
        const result = BooksSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
        }

        const bookData: Books = result.data;

        try {
            const service: BooksService = new BooksService();
            const newId = await service.createBook(bookData);
            res.status(201).json({
                message: 'book create !',
                number: newId
            });     
            return;       
        } catch (err) {
            res.status(500).json({
                message: "Create book failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findBooks(req: Request, res: Response): Promise<void> {
        const result = BooksSearchSchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({ 
                message: "Params not valid", 
                errors: result.error.flatten
            });
            return;
        }

        const criteria: BooksSearch = result.data;

        try {
            const service: BooksService = new BooksService();
            
            const filters : string[] = [];
            const params: any[] = [];

            // Permet de definir options.where + options.params
            if (criteria.title) {
                filters.push("title = ?");
                params.push(`${criteria.title}`);
            }

            const options = {
                where: (filters.length > 0) ? filters.join('AND') : undefined,
                params
            }

            const books: Books[] = await service.findBook(options);
            res.status(200).json({books});
            return;
        } catch (err) {
            res.status(500).json({
                message: "find books failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findBookById(req: Request, res: Response): Promise<void> {
        try {
            const idBook: number = Number(req.params.id);

             if (isNaN(idBook)) {
                res.status(400).json({ error: 'ID book is not valid' });
                return;  
            }

            const service: BooksService = new BooksService();

            const book: Books | null = await service.findBookById(idBook);

            if (!book) {
                res.status(400).json({error: "book not found !"});
                return;
            }

            res.status(200).json(book);
            return
        } catch (err) {
            res.status(500).json({
                message: "find book failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const idBook: number = Number(req.params.id);

             if (isNaN(idBook)) {
                res.status(400).json({ error: 'ID book is not valid' });
                return;  
            }

            const result = BooksSchema.safeParse(req.body);
            if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
            }

            const ubookData: Partial<Books> = result.data;

            const service: BooksService = new BooksService();

            const updateBook: number = await service.updateBook(idBook, ubookData)
            res.status(201).json({
                message: 'book udate !',
                number: updateBook
            }); 
            return
        } catch (err) {
            res.status(500).json({
                message: "update book failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const idBook: number = Number(req.params.id);

             if (isNaN(idBook)) {
                res.status(400).json({ error: 'ID book is not valid' });
                return;  
            }

            // Ajouter une vérif : tous les livres sont rendus
            const service: BooksService = new BooksService();
            const deleteBook: number = await service.deleteBook(idBook);

            res.status(200).json({
                message : "Book delete !",
                idUser: deleteBook
            })

        } catch (err) {
            res.status(500).json({
                message: "delete book failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }

    }
}