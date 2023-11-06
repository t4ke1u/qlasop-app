import { Stack, Text } from '@chakra-ui/react'
import React from 'react'

import type { CoursesGetResponse } from '@/models/course/type'

type Props = {
  data?: CoursesGetResponse
}

export const CourseList: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <></>
  }

  return (
    <Stack maxH='calc(100vh - 120px)' overflow='auto'>
      {data.courses.map((course) => {
        return <Text key={course.id}>{course.title}</Text>
      })}
    </Stack>
  )
}
