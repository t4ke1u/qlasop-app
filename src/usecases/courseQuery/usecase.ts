import { useMemo } from 'react'

import { useCourseQueryStore, type CourseQueryState } from '@/store/courseQuery/courseQuery.store'

export const createCourseQueryCacheUsecase = ({ store }: { store: CourseQueryState }) => ({
  updateCourseQueryCache: store.update,
})

export const useCourseQueryCacheUsecase = () => {
  const store = useCourseQueryStore()

  return useMemo(() => createCourseQueryCacheUsecase({ store }), [store])
}
