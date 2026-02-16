import * as z from "zod";

// Création du schema de validation
export const LoansDetailsSearchSchema = z.object({
    id_loan: z.number().positive(),
    user_name: z.string().max(50),
    user_firstname: z.string().max(50),
    book_title: z.string().max(255),
    author_name: z.string().max(50),
    date_borrowed: z.number().positive().int(),
    date_rendered: z.number().positive().int(),
    status: z.string().max(15)
})


export type LoansDetailsSearch = z.infer<typeof LoansDetailsSearchSchema>