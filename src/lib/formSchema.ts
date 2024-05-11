import * as z from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
  bookingDate: z.string().date(),
  bookingTime: z.string().min(3, { message: "Time is required" }),
  serviceType: z
    .number({
      message: "Service is required",
    })
    .positive(),
  addons: z.array(z.number()).optional(),
});
