import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { CourseQuery } from '@/models/courseQuery/type'

export type CourseQueryState = {
  courseQuery?: CourseQuery
  update: (courseQuery?: CourseQuery) => void
}

export const useCourseQueryStore = create<CourseQueryState>()(
  persist(
    (set) => ({
      courseQuery: undefined,
      update: (courseQuery) => set({ courseQuery }),
    }),
    { name: 'course-query', storage: createJSONStorage(() => sessionStorage) },
  ),
)
