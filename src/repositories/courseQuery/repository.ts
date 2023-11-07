import { useMemo } from 'react'

import type { QueryGetResponse } from '@/models/courseQuery/type'

export const createCourseQueryRepository = () => ({
  async get(): Promise<QueryGetResponse> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/query`).then((r) =>
      r.json(),
    )
    return data
  },
})

export const useCourseQueryRepository = () => {
  return useMemo(() => createCourseQueryRepository(), [])
}

export type CourseRepository = ReturnType<typeof createCourseQueryRepository>
