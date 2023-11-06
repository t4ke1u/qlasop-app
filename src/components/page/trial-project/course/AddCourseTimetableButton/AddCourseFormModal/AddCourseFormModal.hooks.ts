import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DEFAULT_PERIODS } from '@/constants/project'

import type { Course } from '@/models/course/type'
import type { CellColor } from '@/models/trialProject/type'

const PERIODS_LENGTH = DEFAULT_PERIODS.length

const schema = z
  .object({
    clientMemo: z.string().optional(),
    color: z.custom<CellColor>(),
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

export type CellSchemaType = z.infer<typeof schema>

export const useCellForm = (course?: Course) => {
  // 初期値の設定
  const defaultValues: CellSchemaType = useMemo(() => {
    return {
      clientMemo: '',
      color: 'gray',
      creditCategory: course?.creditCategory ?? '',
      credits: course?.credits ?? 0,
      day: course?.day ?? 0,
      endPeriod: course?.endPeriod ?? 0,
      instructor: course?.instructor ?? '',
      startPeriod: course?.startPeriod ?? 0,
      title: course?.title ?? '',
    }
  }, [course])

  const form = useForm<CellSchemaType>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  return form
}
