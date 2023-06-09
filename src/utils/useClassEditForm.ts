import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { DEFAULT_COLOR } from "@/constants/color"
import { TimeTableCellModel } from "@/models/timetable/TimeTableCellModel"
import { TimeTableDialogCellModel } from "@/models/timetable/TimeTableDialogCellModel"

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

export const useClassEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationClassModel>({
    resolver: zodResolver(classEditFormSchema),
  })

  const convertFromData = (
    formData: ValidationClassModel,
    cellData?: TimeTableDialogCellModel,
  ): TimeTableCellModel | undefined => {
    if (validationFormData(formData, cellData)) {
      const subjectName = !!formData.subjectName
        ? formData.subjectName
        : cellData?.class?.subjectName!
      const day = !!formData.day ? Number(formData.day) : cellData?.class?.day!
      const startPeriod = !!formData.startPeriod
        ? Number(formData.startPeriod)
        : cellData?.class?.startPeriod!
      const endPeriod = !!formData.endPeriod
        ? Number(formData.endPeriod)
        : cellData?.class?.endPeriod!
      const faculty = !!formData.faculty ? Number(formData.faculty) : cellData?.class?.faculty!
      const teachers = !!formData.teachers ? formData.teachers : cellData?.class?.teachers
      const unit = !!formData.unit ? Number(formData.unit) : cellData?.class?.unit!
      const category = !!formData.category ? Number(formData.category) : cellData?.class?.category!
      return {
        class: { subjectName, day, startPeriod, endPeriod, faculty, teachers, unit, category },
        color: DEFAULT_COLOR,
      }
    } else {
      return undefined
    }
  }

  const validationFormData = (
    formData: ValidationClassModel,
    cellData?: TimeTableDialogCellModel,
  ) => {
    if (
      (!formData.subjectName && cellData?.class?.subjectName === undefined) ||
      (!formData.day && cellData?.class?.day === undefined) ||
      (!formData.startPeriod && cellData?.class?.startPeriod === undefined) ||
      (!formData.endPeriod && cellData?.class?.endPeriod === undefined) ||
      (!formData.faculty && cellData?.class?.faculty === undefined) ||
      (!formData.unit && cellData?.class?.unit === undefined) ||
      (!formData.category && cellData?.class?.category === undefined)
    ) {
      return false
    }
    const startPeriod = !!formData.startPeriod
      ? Number(formData.startPeriod)
      : cellData?.class?.startPeriod!
    const endPeriod = !!formData.endPeriod
      ? Number(formData.endPeriod)
      : cellData?.class?.endPeriod!

    if (startPeriod > endPeriod) {
      return false
    }
    return true
  }

  return { register, handleSubmit, errors, convertFromData }
}
