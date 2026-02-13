import * as z from "zod";

export const AuthorsSearchSchema = z.object({
    name: z.string().max(200).optional(),
    limit: z.coerce.number().int().positive().optional()
})

export type AuthorsSearch = z.infer<typeof AuthorsSearchSchema>