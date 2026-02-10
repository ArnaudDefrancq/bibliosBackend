import * as z from "zod";

// Création du schema de validation
export const LoansSchema = z.object({
    id_lian: z.number().optional(),
    id_book: z.number().int(),
    id_user: z.number().int(),
    date_borrowed: z.number().int(),
    date_rendered: z.number().int()
})

// Création de l'interface
export type Loans = z.infer<typeof LoansSchema>