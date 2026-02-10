import * as z from "zod";

// Création du schema de validation
export const UserSchema = z.object({
    id_user: z.number().optional(),
    name: z.string().max(50),
    firstname: z.string().max(50),
    address: z.string().max(255),
    phone: z.string().max(50),
    birth: z.number().int(),
    create_at: z.number().int()
})

// Création de l'interface Users
export type Users = z.infer<typeof UserSchema>