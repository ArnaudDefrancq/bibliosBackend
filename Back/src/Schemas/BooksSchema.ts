import * as z from "zod";

// Création du schema de validation
export const BooksSchema = z.object({
    id_book: z.number().positive().optional(),
    title: z.string().max(200),
    content: z.string(),
    publish: z.number().positive().int(),
    isbn: z.string(),
    created_at: z.number().positive().int().default(() => Math.floor(Date.now() / 1000)),
    id_author: z.number().positive().int().optional()
})

export const BookUpdateSchema = BooksSchema.partial().omit({ 
    isbn: true,
    created_at: true 
});

// Création de l'interface
export type Books = z.infer<typeof BooksSchema>