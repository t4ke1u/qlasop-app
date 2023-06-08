import { z } from "zod"

export const schema = z.object({
  subjectName: z.string().min(1),
  day: z.string().min(1),
  startPeriod: z.string().transform((val) => Number(val)),
  streak: z.string().transform((val) => Number(val)),
  teachers: z.string(),
  faculty: z.string().transform((val) => Number(val)),
  unit: z.string().transform((val) => Number(val)),
  category: z.string().transform((val) => Number(val)),
})

export type ValidationClassModel = z.infer<typeof schema>
