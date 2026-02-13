import * as z from "zod";

export const BooksSearchSchema = z.object({
    title: z.string().max(200).optional(),
    limit: z.coerce.number().int().positive().optional()
})

export type BooksSearch = z.infer<typeof BooksSearchSchema>