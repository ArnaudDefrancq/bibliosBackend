import * as z from "zod";

// Création du schema de validation
export const BooksSchema = z.object({
    id_book: z.number().positive().optional(),
    title: z.string().max(200),
    content: z.string(),
    publish: z.number().positive().int(),
    create_at: z.number().positive().int(),
    id_author: z.number().positive().int().optional()
})

// Création de l'interface
export type Books = z.infer<typeof BooksSchema>