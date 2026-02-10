import * as z from "zod";

// Création du schema de validation
export const AuthorsSchema = z.object({
    id_author: z.number().optional(),
    name: z.string().max(50),
})

// Création de l'interface
export type Author = z.infer<typeof AuthorsSchema>