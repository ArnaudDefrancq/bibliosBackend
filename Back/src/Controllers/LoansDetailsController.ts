import type { Request, Response } from "express";
import 'dotenv/config';
import { LoansDetailsSearchSchema, type LoansDetailsSearch } from "../Schemas/LoansDetailsSearchSchema.js";
import { LoansDetailsService } from "../Services/LoansDetailsService.js";
import type { LoansDetails } from "../Schemas/LoansDetailsSchema.js";


export class LoansDetailsController {
    public static async findLoansDetails(req: Request, res: Response): Promise<void> {
        const result = LoansDetailsSearchSchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({ 
                message: "Params not valid", 
                errors: result.error.flatten
            });
            return;
        }

        const criteria: LoansDetailsSearch = result.data;

        try {
            const service: LoansDetailsService = new LoansDetailsService();
            
            const filters : string[] = [];
            const params: any[] = [];

            // Permet de definir options.where + options.params
            if (criteria.user_firstname) {
                filters.push("user_firstname = ?");
                params.push(`${criteria.user_firstname}`);
            }
            if (criteria.user_firstname) {
                filters.push("user_firstname = ?");
                params.push(`${criteria.user_firstname}`);                
            }
            if (criteria.book_title) {
                filters.push("book_title = ?");
                params.push(`${criteria.book_title}`);                
            }
            if (criteria.status) {
                filters.push("status = ?");
                params.push(`${criteria.status}`);                
            }

            const options = {
                where: (filters.length > 0) ? filters.join('AND') : undefined,
                params
            }

            const loansDetails: LoansDetails[] = await service.findLoansDetails(options);
            res.status(200).json({loansDetails});
            return;
        } catch (err) {
            res.status(500).json({
                message: "find loansDetails failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findloanDetailsById(req: Request, res: Response): Promise<void> {
        try {
            const idLoanDetails: number = Number(req.params.id);

             if (isNaN(idLoanDetails)) {
                res.status(400).json({ error: 'ID LoanDetails is not valid' });
                return;  
            }

            const service: LoansDetailsService = new LoansDetailsService();

            const user: LoansDetails | null = await service.findLoansDetailsById(idLoanDetails);

            if (!user) {
                res.status(400).json({error: "LoansDetails not found !"});
                return;
            }

            res.status(200).json(user);
            return
        } catch (err) {
            res.status(500).json({
                message: "find LoansDetails failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

}