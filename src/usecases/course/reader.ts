import useSWR from 'swr'

import { useCourseRepository } from '@/repositories/course/repository'

import { courseCacheKeyGenerator } from './cache'

import type { CoursesGetResponse, DetailCourseGetResponse } from '@/models/course/type'
import type { CourseQuery } from '@/models/courseQuery/type'

export const useCourse = (id?: string) => {
  const repository = useCourseRepository()

  return useSWR<DetailCourseGetResponse>(
    id ? courseCacheKeyGenerator.generateItemKey(id) : null,
    id ? () => repository.get(id) : null,
  )
}

export const useCourseList = (query?: CourseQuery) => {
  const repository = useCourseRepository()

  return useSWR<CoursesGetResponse>(
    query ? courseCacheKeyGenerator.generateListKey(query) : null,
    query ? () => repository.list(query) : null,
  )
}
