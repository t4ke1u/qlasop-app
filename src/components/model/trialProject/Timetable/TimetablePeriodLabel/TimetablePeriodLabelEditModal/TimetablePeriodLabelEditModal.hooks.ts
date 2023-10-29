import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { PeriodLabel } from '@/models/trialProject/type'

const schema = z.object({
  endTime: z.string().min(1),
  index: z.number(),
  startTime: z.string().min(1),
})

export type PeriodLabelSchemaType = z.infer<typeof schema>

export const usePeriodLabelForm = (defaultValues: PeriodLabel) => {
  const form = useForm<PeriodLabelSchemaType>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  return form
}
