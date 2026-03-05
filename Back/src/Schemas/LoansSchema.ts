import * as z from "zod";


// Création du schema de validation
export const LoansSchema = z.object({
    id_loan: z.number().positive().optional(),
    id_book: z.number().positive().int(),
    id_user: z.number().positive().int(),
    date_borrowed: z.number().positive().int().default(() => Math.floor(Date.now() / 1000)),
    date_rendered: z.number().positive().int().default(0)
})

export const LoanUpdateSchema = LoansSchema.partial().omit({ 
    id_book: true, 
    id_user: true ,
    date_borrowed: true
});

// Création de l'interface
export type Loans = z.infer<typeof LoansSchema>