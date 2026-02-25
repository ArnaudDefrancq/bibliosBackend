import * as z from "zod";

export const BooksSearchSchema = z.object({
    title: z.string().max(200).optional(),
    id_author: z.number().positive().int().optional(),
    limit: z.coerce.number().int().positive().optional()
})

export type BooksSearch = z.infer<typeof BooksSearchSchema>