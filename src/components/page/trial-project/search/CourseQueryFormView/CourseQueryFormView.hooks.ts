import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { CourseQueryGetResponse } from '@/models/courseQuery/type'

const schema = z.object({
  campus: z.string(),
  courseCategory: z.string(),
  creditCategory: z.string(),
  day: z.string(),
  eligibleYear: z.string(),
  faculty: z.string(),
  keyword: z.string(),
  mainLang: z.string(),
  period: z.string(),
  term: z.string(),
  year: z.string(),
})

export type CourseQuerySchemaType = z.infer<typeof schema>

export const useCourseQueryForm = (courseQueryGetResponse: CourseQueryGetResponse) => {
  // 初期値の設定
  const defaultValues: CourseQuerySchemaType = useMemo(() => {
    return {
      campus: '',
      courseCategory: '',
      creditCategory: '',
      day: '',
      eligibleYear: '',
      faculty: '',
      keyword: '',
      mainLang: '',
      period: '',
      term: '',
      year: courseQueryGetResponse.years[0].value,
    }
  }, [courseQueryGetResponse])

  const form = useForm<CourseQuerySchemaType>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  })

  return form
}
