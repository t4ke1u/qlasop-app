import { useMemo } from 'react'
import { convertCourseClassFromResponse } from './converter'
import { restClient } from '@/libs/client/restClient'

export const createCourseClassRepository = () => ({
  async get(id: string) {
    const data = await restClient.course_class._id(id).$get()

    return { courseClass: convertCourseClassFromResponse(data) }
  },
})

export const useCourseClassRepository = () => {
  return useMemo(() => createCourseClassRepository(), [])
}

export type CourseClassRepository = ReturnType<typeof createCourseClassRepository>
