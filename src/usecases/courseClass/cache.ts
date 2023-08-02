import { useMemo } from 'react'
import { useSWRConfig } from 'swr'

import { CourseClassResponse } from '@/generated/api/@types'
import { CourseClass } from '@/models/courseClass/type'

// Cache Key Generator
export const courseClassCacheKeyGenerator = {
  generateItemKey: (id: CourseClass['id']) => {
    return ['COURSECLASS', 'ITEM', id] as const
  },
}

// Cache Key Mutater
export const useCourseClassCacheKeyMutater = () => {
  const { mutate } = useSWRConfig()

  return useMemo(
    () => ({
      mutateItem: (id: CourseClass['id'], newData?: CourseClassResponse, revalidate?: boolean) =>
        mutate(courseClassCacheKeyGenerator.generateItemKey(id), newData, revalidate),
    }),
    [mutate],
  )
}
