import * as z from "zod";

// Création du schema de validation
export const LoansSchema = z.object({
    id_lian: z.number().positive().optional(),
    id_book: z.number().positive().int(),
    id_user: z.number().positive().int(),
    date_borrowed: z.number().positive().int(),
    date_rendered: z.number().positive().int().default(0)
})

// Création de l'interface
export type Loans = z.infer<typeof LoansSchema>