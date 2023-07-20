import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PERIODS_LENGTH } from '@/constants'
import { CellColor, UserCell } from '@/models/user/type'

const schema = z
  .object({
    title: z.string().nonempty(),
    day: z.number().min(0).max(5),
    startPeriod: z
      .number()
      .min(0)
      .max(PERIODS_LENGTH - 1),
    endPeriod: z
      .number()
      .min(0)
      .max(PERIODS_LENGTH - 1),
    instructor: z.string().optional(),
    link: z.tuple([z.string(), z.string()]).optional(),
    creditCategory: z.string(),
    credits: z.number().min(0),
    color: z.custom<CellColor>(),
    clientMemo: z.string().optional(),
  })
  .refine(({ startPeriod, endPeriod }) => startPeriod <= endPeriod)

export type CellSchemaType = z.infer<typeof schema>

export const useCellForm = (
  time?: { day: number; startPeriod: number; endPeriod: number },
  cell?: UserCell,
) => {
  // 初期値の設定
  const defaultValues: CellSchemaType = useMemo(() => {
    return {
      title: cell?.title ?? '',
      day: time?.day ?? cell?.day ?? 0,
      startPeriod: time?.startPeriod ?? cell?.startPeriod ?? 0,
      endPeriod: time?.endPeriod ?? cell?.endPeriod ?? 0,
      instructor: cell?.instructor ?? '',
      creditCategory: cell?.creditCategory ?? '',
      credits: cell?.credits ?? 0,
      link: cell?.link ?? undefined,
      color: cell?.color ?? 'gray',
      clientMemo: cell?.clientMemo ?? '',
    }
  }, [cell, time])

  const form = useForm<CellSchemaType>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  return form
}
