import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { UserPeriodLabel } from '@/models/user/type'

const schema = z.object({
  startTime: z.string().nonempty(),
  endTime: z.string().nonempty(),
})

export type PeriodLabelSchemaType = z.infer<typeof schema>

export const usePeriodLabelForm = (defaultValues: UserPeriodLabel) => {
  const form = useForm<PeriodLabelSchemaType>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  return form
}
