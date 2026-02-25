import type { Request, Response } from "express";
import 'dotenv/config';
import { BooksSchema, BookUpdateSchema, type Books } from "../Schemas/BooksSchema.js";
import { BooksSearchSchema, type BooksSearch } from "../Schemas/BooksSearchSchema.js";
import { BooksService } from "../Services/BooksService.js";
import { LoansDetailsService } from "../Services/LoansDetailsService.js";
import { LoansDetailsSchema, type LoansDetails } from "../Schemas/LoansDetailsSchema.js";



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
            const params: string[] = [];

            

            // Permet de definir options.where + options.params
            if (criteria.title) {
                filters.push("title LIKE ?");
                params.push(`%${criteria.title}%`);
            }

            if (criteria.id_author) {
                filters.push("id_author = ?");
                params.push(`%${criteria.id_author}%`);
            }
            
            const options = {
                where: (filters.length > 0) ? filters.join('AND') : undefined,
                params,
                join: ""
            }
            
            if (req.path == '/with-author') {
                options.join = `JOIN ${process.env.DB_TABLE}__authors a ON a.id_author = ${process.env.DB_TABLE}__books.id_author`;
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
            var join: string = "";
            const includesAuthor = req.route.path.includes('with-author')
             if (isNaN(idBook)) {
                res.status(400).json({ error: 'ID book is not valid' });
                return;  
            }

            if (includesAuthor) {
                join = `JOIN ${process.env.DB_TABLE}__authors a ON a.id_author = ${process.env.DB_TABLE}__books.id_author`;
            }


            const service: BooksService = new BooksService();

            const book: Books | null = await service.findBookById(idBook, join);

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

            const result = BookUpdateSchema.safeParse(req.body);
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
        var loan: boolean = false;
        try {
            const idBook: number = Number(req.params.id);

             if (isNaN(idBook)) {
                res.status(400).json({ error: 'ID book is not valid' });
                return;  
            }

            const serviceDetail: LoansDetailsService = new LoansDetailsService();
            const service: BooksService = new BooksService();

            const findBook: Books | null = await service.findBookById(idBook); 
            if (!findBook) {
                res.status(500).json({
                    message: "find books failed !"
                });
                return;
            }

            const options = {
                where: `book_title LIKE ?`,
                params: [`${findBook.title}`]
            }
            const checkLoanDetail: LoansDetails[] = await serviceDetail.findLoansDetails(options); 
            
            if (checkLoanDetail.length > 0) {
                res.status(500).json({
                    message: "find LoansDetails  !"
                });
                return;
            }

            checkLoanDetail.forEach(x => {
                if (x.status == "En cours") {
                    loan = true;
                }
            })
            
            if (loan) {
                res.status(500).json({
                    message: "Book loan, you cant delete this book"
                });
                return;
            }
            
            const deleteBook: number = await service.deleteBook(idBook);
            console.log('ici')

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