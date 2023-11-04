import useSWR from 'swr'

import { useCourseRepository } from '@/repositories/course/repository'

import { courseCacheKeyGenerator } from './cache'

import type { DetailCourse } from '@/models/course/type'

export type CourseGetResponse = { detailCourse?: DetailCourse }

export const useCourse = (id?: string) => {
  const repository = useCourseRepository()

  return useSWR<CourseGetResponse>(
    id ? courseCacheKeyGenerator.generateItemKey(id) : null,
    id ? () => repository.get(id) : null,
  )
}
