import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DEFAULT_PERIODS } from '@/constants/project'

import type { Course } from '@/models/course/type'

const PERIODS_LENGTH = DEFAULT_PERIODS.length

const schema = z
  .object({
    creditCategory: z.string(),
    credits: z.number().min(0),
    day: z.number().min(0).max(5),
    endPeriod: z
      .number()
      .min(0)
      .max(PERIODS_LENGTH - 1),
    instructor: z.string().optional(),
    startPeriod: z
      .number()
      .min(0)
      .max(PERIODS_LENGTH - 1),
    title: z.string().min(1),
  })
  .refine(({ startPeriod, endPeriod }) => startPeriod <= endPeriod, {
    path: ['startPeriod', 'endPeriod'],
  })

export type CourseSchemaType = z.infer<typeof schema>

export const useCourseForm = (course: Course) => {
  // 初期値の設定
  const defaultValues: CourseSchemaType = useMemo(() => {
    return course
  }, [course])

  const form = useForm<CourseSchemaType>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  return form
}
