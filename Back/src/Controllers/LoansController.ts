import type { Request, Response } from "express";
import 'dotenv/config';
import { LoansSchema, type Loans } from "../Schemas/LoansSchema.js";
import { LoansService } from "../Services/LoansService.js";
import { LoansSearchSchema, type LoansSearch } from "../Schemas/LoansSearchSchema.js";


export class LoansController {

    public static async createLoans(req: Request, res: Response): Promise<void> {
        const result = LoansSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
        }

        const loanData: Loans = result.data;

        try {
            const service: LoansService = new LoansService();
            const newId = await service.createLoan(loanData);
            res.status(201).json({
                message: 'loan create !',
                number: newId
            });     
            return;       
        } catch (err) {
            res.status(500).json({
                message: "Create loan failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findLoans(req: Request, res: Response): Promise<void> {
        const result = LoansSearchSchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json({ 
                message: "Params not valid", 
                errors: result.error.flatten
            });
            return;
        }

        const criteria: LoansSearch = result.data;

        try {
            const service: LoansService = new LoansService();
            
            const filters : string[] = [];
            const params: any[] = [];

            // Permet de definir options.where + options.params
            if (criteria.id_user) {
                filters.push("id_user = ?");
                params.push(`${criteria.id_user}`);
            }
            if (criteria.id_book) {
                filters.push("id_book = ?");
                params.push(`${criteria.id_book}`);                
            }

            const options = {
                where: (filters.length > 0) ? filters.join('AND') : undefined,
                params
            }

            const loans: Loans[] = await service.findLoan(options);
            res.status(200).json({loans});
            return;
        } catch (err) {
            res.status(500).json({
                message: "find loans failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async findLoanById(req: Request, res: Response): Promise<void> {
        try {
            const idLoan: number = Number(req.params.id);

             if (isNaN(idLoan)) {
                res.status(400).json({ error: 'ID idLoan is not valid' });
                return;  
            }

            const service: LoansService = new LoansService();

            const loan: Loans | null = await service.findLoanById(idLoan);

            if (!loan) {
                res.status(400).json({error: "loan not found !"});
                return;
            }

            res.status(200).json(loan);
            return
        } catch (err) {
            res.status(500).json({
                message: "find loan failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async updateLoan(req: Request, res: Response): Promise<void> {
        try {
            const idLoan: number = Number(req.params.id);

             if (isNaN(idLoan)) {
                res.status(400).json({ error: 'ID idLoan is not valid' });
                return;  
            }

            const result = LoansSchema.safeParse(req.body);
            if (!result.success) {
            res.status(400).json({
                message: 'Validation failed !',
                errors: result.error.flatten
            })
            return;
            }

            const loanData: Partial<Loans> = result.data;

            if (loanData.date_rendered == 0) {
                res.status(400).json({
                    message: 'Validation failed date_rendered = 0!',
                })
                return;
            }

            const service: LoansService = new LoansService();

            const updateLoan: number = await service.updateLoan(idLoan, loanData)
            res.status(201).json({
                message: 'user udate !',
                number: updateLoan
            }); 
            return
        } catch (err) {
            res.status(500).json({
                message: "update loan failed !",
                error: err instanceof Error ? err.message : err
            });
            return;
        }
    }

    public static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const idLoan: number = Number(req.params.id);

             if (isNaN(idLoan)) {
                res.status(400).json({ error: 'ID idLoan is not valid' });
                return;  
            }

            // Ajouter une vérif : tous les livres sont rendus
            const servive: LoansService = new LoansService();
            const deleteLoan: number = await servive.deleteLoan(idLoan);

            res.status(200).json({
                message : "User delete !",
                idLoan: deleteLoan
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