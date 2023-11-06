'use client'

import { Box, HStack } from '@chakra-ui/react'
import { useState } from 'react'

import { LoadingView } from '@/components/ui/LoadingView'
import { useCourseList } from '@/usecases/course/reader'
import { useCourseQuery } from '@/usecases/courseQuery/reader'

import { CourseList } from './CourseList'
import { CourseQueryFormView } from './CourseQueryFormView'

import type { CourseQuery } from '@/models/courseQuery/type'

export const SearchPage = () => {
  const [query, setQuery] = useState<CourseQuery | undefined>()

  const { data: queryData } = useCourseQuery()
  const { data: coursesData, isLoading } = useCourseList(query)

  if (!queryData) {
    return <LoadingView />
  }

  return (
    <HStack align='start' maxH='full' p='20px' spacing='md'>
      <CourseQueryFormView data={queryData} isLoading={isLoading} setQuery={setQuery} />
      <Box h='full' w='full'>
        {isLoading ? <LoadingView /> : <CourseList data={coursesData} />}
      </Box>
    </HStack>
  )
}
