import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const searchFilterFormSchema = z.object({
  faculty: z.string().min(1),
  grade: z.string().min(1),
  term: z.string().min(1),
})

export type ValidationSearchFilterModel = z.infer<typeof searchFilterFormSchema>

export const useSearchFilterForm = () => {
  const { register, handleSubmit } = useForm<ValidationSearchFilterModel>({
    resolver: zodResolver(searchFilterFormSchema),
  })

  const convertFormData = (formData: ValidationSearchFilterModel) => {
    return {
      faculty: Number(formData.faculty),
      grade: Number(formData.grade),
      term: Number(formData.term),
    }
  }

  return { register, handleSubmit, convertFormData }
}
