import {z} from "zod";

export const fundsQuerySchema=z.object({
    currency:z.string().optional(),
})