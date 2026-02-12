import * as z from "zod";

export const LoansSearchSchema = z.object({
   id_user: z.int().positive().optional(),
   id_book: z.int().positive().optional()
})

export type LoansSearch = z.infer<typeof LoansSearchSchema>