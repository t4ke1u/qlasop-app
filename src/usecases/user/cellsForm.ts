'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { UserCell } from '@/models/user/type'
import { useCellsStore } from '@/store/user'

export const cellsFormSchema = z
  .object({
    title: z.string().min(1, '入力が必須です'),
    day: z.string().transform((val) => Number(val)),
    startPeriod: z.string().transform((val) => Number(val)),
    endPeriod: z.string().transform((val) => Number(val)),
    instructor: z.string().transform((val) => (val === '' ? null : val)),
    creditCategory: z.string().min(1, '入力が必須です'),
    credits: z.string().transform((val) => Number(val)),
    link: z.tuple([z.string(), z.string()]).optional(),
    color: z.string(),
    clientMemo: z.string().transform((val) => (val === '' ? undefined : val)),
  })
  .refine(
    // バリデーションを追加
    (cells) => {
      const { startPeriod, endPeriod } = cells
      return startPeriod > endPeriod
    },
    {
      message: '終了時限が開始時限よりも前になっています',
      path: ['endPeriod'],
    },
  )

export const useCellsForm = (
  time?: { day: number; startPeriod: number; endPeriod: number },
  cell?: UserCell,
  successAction?: () => void,
  failAction?: () => void,
  forceAction?: () => void,
) => {
  // cellsStore の利用
  const addCell = useCellsStore((state) => state.add)
  const editCell = useCellsStore((state) => state.edit)

  // 初期値の設定
  const mode = cell ? 'edit' : 'add'
  const defaultValues: UserCell = {
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

  const {
    register: basicRegister,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserCell>({ defaultValues })

  const register = {
    title: basicRegister('title', { required: '入力が必須です' }),
    day: basicRegister('day', { valueAsNumber: true }),
    startPeriod: basicRegister('startPeriod', { valueAsNumber: true }),
    endPeriod: basicRegister('endPeriod', {
      valueAsNumber: true,
      validate: (value) => {
        if (value < getValues('startPeriod')) {
          return '終了時限が開始時限よりも前になっています'
        }
      },
    }),
    instructor: basicRegister('instructor'),
    creditsCategory: basicRegister('creditCategory'),
    credits: basicRegister('credits', { valueAsNumber: true }),
    color: basicRegister('color'),
    clientMemo: basicRegister('clientMemo'),
  }

  const onSubmit = handleSubmit((formCell: UserCell) => {
    const result = mode === 'edit' ? editCell(cell!, formCell) : addCell(formCell)
    if (!result && failAction !== undefined) {
      failAction()
    } else if (successAction !== undefined) {
      successAction()
    }
  })

  const onSubmitForce = handleSubmit((formCell: UserCell) => {
    mode === 'edit' ? editCell(cell!, formCell, true) : addCell(formCell, true)
    if (forceAction !== undefined) {
      forceAction()
    }
  })

  return { register, onSubmit, onSubmitForce, reset, errors, isSubmitting }
}
