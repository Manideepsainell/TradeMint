import { z } from "zod";

export const createOrderSchema = z.object({
  name: z
    .string()
    .min(1, "Stock symbol is required")
    .transform(val => val.toUpperCase().trim()),

  qty: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than zero"),

  mode: z.enum(["BUY", "SELL"], {
    errorMap: () => ({ message: "Mode must be BUY or SELL" }),
  }),
});

export const ordersQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});
