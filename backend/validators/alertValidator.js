import {symbol, z} from "zod";

export const createAlertSchema=z.object({
    symbol: z
    .string()
    .min(1,"Stock symbol is required")
    .transform(val=>val.toUpperCase()),

    targetPrice: z
    .number()
    .positive("Target price must be greater than zero"),

    condition:z.enum(["ABOVE","BELOW"], {
        errorMap: ()=>({message:"Condition must be ABOVE or BELOW"}),
    })
})

export const alertIdParamSchema=z.object({
    id: z.string().length(24,"Invalid alert ID"),

})