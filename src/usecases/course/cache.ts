import type { CourseQuery } from '@/models/courseQuery/type'

export const courseCacheKeyGenerator = {
  generateItemKey: (id: string) => {
    return ['COURSE', 'ITEM', id] as const
  },

  generateListKey: (query: CourseQuery) => {
    return ['COURSE', 'LIST', query] as const
  },
}
