import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import { TIMETABLE_DAYS } from '@/constants/project'

import type { Course } from '@/models/course/type'

type Props = {
  course: Course
  isSelected: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const StageCourseCellButton: React.FC<Props> = ({ course, isSelected, onChange }) => {
  return (
    <Stack h='130px' justify='start' px='16px' py='12px' shadow='md' spacing='8px' w='250px'>
      <HStack align='center' justify='space-between'>
        <Text
          fontSize='md'
          fontWeight='semibold'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {course.title}
        </Text>
        <Checkbox isChecked={isSelected} onChange={onChange} />
      </HStack>
      <Stack px='4px' spacing='8px'>
        <HStack spacing='9px'>
          <Text
            color='gray.600'
            fontSize='xs'
            maxW='100px'
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
          >
            {course.creditCategory}
          </Text>
          <Text color='gray.600' fontSize='xs'>
            {`${course.credits}単位`}
          </Text>
        </HStack>
        <HStack spacing='9px'>
          <Text color='gray.600' fontSize='xs'>
            {TIMETABLE_DAYS.jp[course.day]}
          </Text>
          <Text color='gray.600' fontSize='xs'>
            {course.startPeriod === course.endPeriod
              ? `${course.startPeriod + 1} 限`
              : `${course.startPeriod + 1} - ${course.endPeriod + 1} 限`}
          </Text>
        </HStack>
        <HStack spacing='9px'>
          <Text
            color='gray.600'
            fontSize='xs'
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
          >
            {course.instructor}
          </Text>
        </HStack>
      </Stack>
    </Stack>
  )
}
