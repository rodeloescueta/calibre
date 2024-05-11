import * as z from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  bookingDate: z.string().date(),
  bookingTime: z.string().time({ message: "Invalid time string!" }),
  serviceType: z
    .number({
      message: "Service is required",
    })
    .positive(),
});
