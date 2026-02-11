import * as z from "zod";

export const UsersSearchSchema = z.object({
    name: z.string().optional(),
    firstname: z.string().optional(),
    limit: z.coerce.number().int().positive().optional()
})

export type UsersSearch = z.infer<typeof UsersSearchSchema>