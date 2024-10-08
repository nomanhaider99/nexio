import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email()
})