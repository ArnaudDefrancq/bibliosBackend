import * as z from "zod";

export const UsersSearchSchema = z.object({
    name: z.string().max(50).optional(),
    firstname: z.string().optional(),
    search: z.string().max(50).optional(),
    limit: z.coerce.number().int().positive().optional()
})

export type UsersSearch = z.infer<typeof UsersSearchSchema>