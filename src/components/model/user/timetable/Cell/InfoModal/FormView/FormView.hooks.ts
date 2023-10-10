import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PERIODS_LENGTH } from '@/constants'

import type { CellColor, UserCell } from '@/models/user/type'

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
    link: z.tuple([z.string(), z.string()]).optional(),
    startPeriod: z
      .number()
      .min(0)
      .max(PERIODS_LENGTH - 1),
    title: z.string().nonempty(),
  })
  .refine(({ startPeriod, endPeriod }) => startPeriod <= endPeriod, {
    path: ['startPeriod', 'endPeriod'],
  })

export type CellSchemaType = z.infer<typeof schema>

export const useCellForm = (
  time?: { day: number; endPeriod: number, startPeriod: number; },
  cell?: UserCell,
) => {
  // 初期値の設定
  const defaultValues: CellSchemaType = useMemo(() => {
    return {
      clientMemo: cell?.clientMemo ?? '',
      color: cell?.color ?? 'gray',
      creditCategory: cell?.creditCategory ?? '',
      credits: cell?.credits ?? 0,
      day: time?.day ?? cell?.day ?? 0,
      endPeriod: time?.endPeriod ?? cell?.endPeriod ?? 0,
      instructor: cell?.instructor ?? '',
      link: cell?.link ?? undefined,
      startPeriod: time?.startPeriod ?? cell?.startPeriod ?? 0,
      title: cell?.title ?? '',
    }
  }, [cell, time])

  const form = useForm<CellSchemaType>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  return form
}
