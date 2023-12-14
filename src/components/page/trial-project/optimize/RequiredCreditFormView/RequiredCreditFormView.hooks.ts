import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { RequiredCredits } from '@/models/solve/type'
import type { CreditRanges } from '@/models/trialProject/type'

const schema = z.object({
  data: z.array(z.object({ creditCategory: z.string(), credits: z.number() })),
})

export type RequiredCreditsRequestSchemaType = z.infer<typeof schema>

export const useRequiredCreditsRequestForm = (
  requiredCredits: RequiredCredits,
  creditRanges: CreditRanges,
) => {
  const defaultValues: RequiredCreditsRequestSchemaType = useMemo(() => {
    return {
      data: creditRanges.map((creditRange) => {
        const requiredCredit = requiredCredits.find(
          (rc) => rc.creditCategory === creditRange.creditCategory,
        )
        return {
          creditCategory: creditRange.creditCategory,
          credits: requiredCredit?.credits ?? creditRange.current,
        }
      }),
    }
  }, [creditRanges, requiredCredits])

  const form = useForm<RequiredCreditsRequestSchemaType>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'data',
  })

  useEffect(
    () =>
      form.reset({
        data: creditRanges.map((creditRange) => {
          const requiredCredit = requiredCredits.find(
            (rc) => rc.creditCategory === creditRange.creditCategory,
          )
          return {
            creditCategory: creditRange.creditCategory,
            credits: requiredCredit?.credits ?? creditRange.current,
          }
        }),
      }),
    [creditRanges, requiredCredits, form],
  )

  return { ...form, fields }
}
