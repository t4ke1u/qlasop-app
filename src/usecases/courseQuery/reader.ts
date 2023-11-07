import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useCourseQueryRepository } from '@/repositories/courseQuery/repository'
import { useCourseQueryStore } from '@/store/courseQuery/courseQuery.store'

import { courseQueryCacheKeyGenerator } from './cache'

import type { CourseQuery, CourseQueryGetResponse } from '@/models/courseQuery/type'

export const useCourseQuery = () => {
  const repository = useCourseQueryRepository()

  return useSWR<CourseQueryGetResponse>(courseQueryCacheKeyGenerator.generateKey(), () =>
    repository.get(),
  )
}

export const useCourseQueryCache = () => {
  const store = useCourseQueryStore()

  const [courseQuery, setCourseQuery] = useState<CourseQuery | undefined>(store.courseQuery)
  useEffect(() => setCourseQuery(store.courseQuery), [store])

  return { courseQuery }
}
