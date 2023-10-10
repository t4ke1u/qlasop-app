import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { UserPeriodLabel } from '@/models/user/type'

const schema = z.object({
  endTime: z.string().nonempty(),
  startTime: z.string().nonempty(),
})

export type PeriodLabelSchemaType = z.infer<typeof schema>

export const usePeriodLabelForm = (defaultValues: UserPeriodLabel) => {
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
