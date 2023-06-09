import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

export const classEditFormSchema = z.object({
  subjectName: z.string().min(1),
  day: z.string(),
  startPeriod: z.string(),
  endPeriod: z.string(),
  teachers: z.string(),
  faculty: z.string(),
  unit: z.string(),
  category: z.string(),
})

export type ValidationClassModel = z.infer<typeof classEditFormSchema>

export const useClassEditForm = (
  onValid: SubmitHandler<ValidationClassModel>,
  onInValid?: SubmitErrorHandler<ValidationClassModel>,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationClassModel>({
    resolver: zodResolver(classEditFormSchema),
  })

  return { register, onSubmit: handleSubmit(onValid, onInValid), errors }
}
