import { useMemo } from 'react'

import type { CoursesGetResponse, DetailCourseGetResponse } from '@/models/course/type'
import type { CourseQuery } from '@/models/courseQuery/type'

export const createCourseRepository = () => ({
  async get(id: string): Promise<DetailCourseGetResponse> {
    const { detailCourse } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`,
    ).then((r) => r.json())
    console.log(detailCourse)
    return { detailCourse }
  },

  async list(query: CourseQuery): Promise<CoursesGetResponse> {
    const { courses } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((r) => r.json())
    return { courses }
  },
})

export const useCourseRepository = () => {
  return useMemo(() => createCourseRepository(), [])
}

export type CourseRepository = ReturnType<typeof createCourseRepository>
