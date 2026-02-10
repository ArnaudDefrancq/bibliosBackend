import * as z from "zod";

// Création du schema de validation
export const BooksSchema = z.object({
    id_book: z.number().optional(),
    title: z.string().max(200),
    content: z.string(),
    publish: z.number().int(),
    create_at: z.number().int(),
    id_author: z.number().int()
})

// Création de l'interface
export type Books = z.infer<typeof BooksSchema>