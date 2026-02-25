import type { Request, Response } from "express";
import 'dotenv/config';
import { AuthorsSchema, type Author } from "../Schemas/AuthorsSchema.js";
import { AuthorsService } from "../Services/AuthorsService.js";
import { AuthorsSearchSchema, type AuthorsSearch } from "../Schemas/AuthorsSearchSchema.js";
import { BooksService } from "../Services/BooksService.js";
import type { Books } from "../Schemas/BooksSchema.js";


export class AuthorsController {

    public static async createAuthor(req: Request, res: Response): Promise<void> {
        const result = AuthorsSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
        }

        const authorData: Author = result.data;

        try {
            const service: AuthorsService = new AuthorsService();
            const newId = await service.createAuthor(authorData);
            res.status(201).json({
                message: 'author create !',
                number: newId
            });     
            return;       
        } catch (err) {
            res.status(500).json({
                message: "Create author failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findAuthors(req: Request, res: Response): Promise<void> {
        const result = AuthorsSearchSchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({ 
                message: "Params not valid", 
                errors: result.error.flatten
            });
            return;
        }

        const criteria: AuthorsSearch = result.data;

        try {
            const service: AuthorsService = new AuthorsService();
            
            const filters : string[] = [];
            const params: any[] = [];

            // Permet de definir options.where + options.params
            if (criteria.name) {
                filters.push("name = ?");
                params.push(`${criteria.name}`);
            }

            const options = {
                where: (filters.length > 0) ? filters.join('AND') : undefined,
                params,
                join: ""
            }
            var select: string = "*"

            if (req.path == '/with-book') {
                options.join = `JOIN ${process.env.DB_TABLE}__books b ON b.id_author = ${process.env.DB_TABLE}__authors.id_author`;
                select = `name, title`
            }

            const author: Author[] = await service.findAuthor(options, select);

            console.log()
            res.status(200).json({author});
            return;
        } catch (err) {
            res.status(500).json({
                message: "find author failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findAuthorById(req: Request, res: Response): Promise<void> {
        try {
            const idAuthor: number = Number(req.params.id);
            
            if (isNaN(idAuthor)) {
                res.status(400).json({ error: 'ID author is not valid' });
                return;  
            }

            const service: AuthorsService = new AuthorsService();

            const author: Author | null = await service.findAuthorById(idAuthor);

            if (!author) {
                res.status(400).json({error: "author not found !"});
                return;
            }

            res.status(200).json(author);
            return
        } catch (err) {
            res.status(500).json({
                message: "find author failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const idAuthor: number = Number(req.params.id);

             if (isNaN(idAuthor)) {
                res.status(400).json({ error: 'ID author is not valid' });
                return;  
            }

            const result = AuthorsSchema.safeParse(req.body);
            if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
            }

            const authorData: Partial<Author> = result.data;

            const service: AuthorsService = new AuthorsService();

            const updateAuthor: number = await service.updateAuthor(idAuthor, authorData)
            res.status(201).json({
                message: 'author udate !',
                number: updateAuthor
            }); 
            return
        } catch (err) {
            res.status(500).json({
                message: "update author failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const idAuthor: number = Number(req.params.id);

             if (isNaN(idAuthor)) {
                res.status(400).json({ error: 'ID author is not valid' });
                return;  
            }

            
            const service: AuthorsService = new AuthorsService();
            const bookService: BooksService = new BooksService();
            const options = {
                where: `id_author = ?`,
                params: [`${idAuthor}`]
            }
            const findBook: Books[]= await bookService.findBook(options);

            if (findBook.length > 0) {
                res.status(500).json({
                message: "you cant delete this author because we find a book !",
            });
            return;
            }

            const deleteAuthor: number = await service.deleteAuthor(idAuthor);

            res.status(200).json({
                message : "author delete !",
                idUser: deleteAuthor
            })

        } catch (err) {
            res.status(500).json({
                message: "author book failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }

    }
}