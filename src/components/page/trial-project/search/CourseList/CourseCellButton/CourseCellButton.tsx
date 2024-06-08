import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import type { AbstractCourse } from '@/models/course/type'

type Props = {
  course: AbstractCourse
  isSelected: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CourseCellButton: React.FC<Props> = ({ course, isSelected, onChange }) => {
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
          <Text color='gray.600' fontSize='xs'>
            {course.faculty}
          </Text>
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
            {course.credits}
          </Text>
        </HStack>
        <HStack spacing='9px'>
          <Text color='gray.600' fontSize='xs'>
            {course.term}
          </Text>
          <Text color='gray.600' fontSize='xs'>
            {course.day}
          </Text>
          <Text color='gray.600' fontSize='xs'>
            {course.period}
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
