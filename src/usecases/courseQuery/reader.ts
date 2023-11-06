import useSWR from 'swr'

import { useCourseQueryRepository } from '@/repositories/courseQuery/repository'

import { courseQueryCacheKeyGenerator } from './cache'

import type { CourseQueryGetResponse } from '@/models/courseQuery/type'

export const useCourseQuery = () => {
  const repository = useCourseQueryRepository()

  return useSWR<CourseQueryGetResponse>(courseQueryCacheKeyGenerator.generateKey(), () =>
    repository.get(),
  )
}
