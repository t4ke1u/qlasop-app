'use client'

import { Box, HStack } from '@chakra-ui/react'

import { LoadingView } from '@/components/ui/LoadingView'
import { useCourseList } from '@/usecases/course/reader'
import { useCourseQuery, useCourseQueryCache } from '@/usecases/courseQuery/reader'
import { useCourseQueryCacheUsecase } from '@/usecases/courseQuery/usecase'

import { CourseList } from './CourseList'
import { CourseQueryFormView } from './CourseQueryFormView'

export const SearchPage = () => {
  const { courseQuery } = useCourseQueryCache()
  const { updateCourseQueryCache } = useCourseQueryCacheUsecase()
  const { data: queryData } = useCourseQuery()
  const { data: coursesData, isLoading } = useCourseList(courseQuery)

  if (!queryData) {
    return <LoadingView />
  }

  return (
    <HStack align='start' maxH='full' p='20px' spacing='md'>
      <CourseQueryFormView data={queryData} isLoading={isLoading} />
      <Box h='full' w='full'>
        {isLoading ? <LoadingView /> : <CourseList data={coursesData} />}
      </Box>
    </HStack>
  )
}
