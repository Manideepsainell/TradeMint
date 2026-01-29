import {z} from "zod";

export const createOrderSchema=z.object({
    name:z.string().min(1,"Stock name is required"),

    qty:z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),

    price:z
    .number()
    .positive("Price must be greater than zero"),
      mode: z.enum(["BUY", "SELL"]),

})