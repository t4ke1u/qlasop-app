import useSWR from 'swr'

import { courseClassCacheKeyGenerator } from './cache'
import { CourseClassResponse } from '@/generated/api/@types'
import { CourseClass } from '@/models/courseClass/type'
import { useCourseClassRepository } from '@/repositories/courseClass/repository'

export type CourseClassGetResponse = { courseClass: CourseClassResponse }

export const useCourseClass = (id?: CourseClass['id']) => {
  const repository = useCourseClassRepository()

  return useSWR<CourseClassGetResponse>(
    id ? courseClassCacheKeyGenerator.generateItemKey(id) : null,
    id ? () => repository.get(id) : null,
  )
}
