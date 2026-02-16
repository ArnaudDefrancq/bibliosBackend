import * as z from "zod";

// Création du schema de validation
export const LoansDetailsSearchSchema = z.object({
    user_name: z.string().max(50).optional(),
    user_firstname: z.string().max(50).optional(),
    book_title: z.string().max(255).optional(),
    status: z.string().max(15).optional()
})


export type LoansDetailsSearch = z.infer<typeof LoansDetailsSearchSchema>