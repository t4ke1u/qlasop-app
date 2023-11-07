import { Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'

import { CourseCell } from './CourseCell'

import type { CoursesGetResponse } from '@/models/course/type'

type Props = {
  data?: CoursesGetResponse
}

export const CourseList: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <></>
  }

  return (
    <Stack maxH='calc(100vh - 120px)' px='20px'>
      <Text color='gray.400' fontSize='sm' fontWeight='bold' h='50px' py='16px' w='180px'>
        検索結果 - {data.courses.length}件 {data.courses.length === 5000 ? '（上限）' : ''}
      </Text>
      <Wrap maxH='calc(100vh - 170px)' overflow='auto' py='10px'>
        {data.courses.map((course, index) => {
          return (
            <WrapItem key={index}>
              <CourseCell course={course} />
            </WrapItem>
          )
        })}
      </Wrap>
    </Stack>
  )
}
