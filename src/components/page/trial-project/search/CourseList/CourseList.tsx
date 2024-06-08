import { Button, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { AddCellButton } from './AddCellButton'
import { AddStageCourseButton } from './AddStageCourseButton'
import { CourseCell } from './CourseCell'
import { CourseCellButton } from './CourseCellButton'

import type { CoursesGetResponse } from '@/models/course/type'
import type { ChangeEvent } from 'react'

type Props = {
  data?: CoursesGetResponse
}

type ViewMode = 'link' | 'select'

export const CourseList: React.FC<Props> = ({ data }) => {
  const [mode, setMode] = useState<ViewMode>('link')
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const toggleMode = () => {
    if (mode == 'link') {
      setMode('select')
    } else {
      setSelectedIndexes([])
      setMode('link')
    }
  }

  return (
    <Stack maxH='calc(100vh - 120px)' px='20px'>
      <HStack align='center' justify='space-between'>
        <Text color='gray.400' fontSize='sm' fontWeight='bold' h='50px' py='16px' w='180px'>
          検索結果 - {data?.courses.length ?? 0}件 {data?.courses.length === 2500 ? '（上限）' : ''}
        </Text>
        <HStack>
          {mode === 'link' ? (
            <Button
              _hover={{ background: 'orange.200' }}
              bg='orange.100'
              border='orange.100'
              color='orange.500'
              h='32px'
              onClick={toggleMode}
              size='sm'
              variant='solid'
              w='104px'
            >
              選択
            </Button>
          ) : (
            <Button
              colorScheme='orange'
              h='32px'
              onClick={toggleMode}
              size='sm'
              variant='outline'
              w='104px'
            >
              選択解除
            </Button>
          )}
          <Button
            _hover={{ background: mode === 'select' ? 'teal.200' : 'gray.200' }}
            bg={mode === 'select' ? 'teal.100' : 'gray.200'}
            border={mode === 'select' ? 'teal.100' : 'gray.200'}
            color={mode === 'select' ? 'teal.500' : 'gray.50'}
            h='32px'
            isDisabled={mode === 'link'}
            onClick={() =>
              setSelectedIndexes([...Array(!!data ? data.courses.length : 0)].map((_, i) => i))
            }
            px='24px'
            size='sm'
            variant='outline'
          >
            全選択
          </Button>
          <AddCellButton
            courses={!!data ? data.courses.map((course) => course.course) : []}
            isDisabled={mode === 'link'}
            onProcessed={toggleMode}
            selectedIndexes={selectedIndexes}
          />
          <AddStageCourseButton
            courses={!!data ? data.courses.map((course) => course.course) : []}
            isDisabled={mode === 'link'}
            onProcessed={toggleMode}
            selectedIndexes={selectedIndexes}
          />
        </HStack>
      </HStack>

      {!!data ? (
        <HStack maxH='calc(100vh - 170px)' overflow='auto' py='10px' wrap='wrap'>
          {mode === 'link'
            ? data.courses.map((course, index) => {
                return <CourseCell course={course} key={index} />
              })
            : data.courses.map((course, index) => {
                return (
                  <CourseCellButton
                    course={course}
                    isSelected={selectedIndexes.includes(index)}
                    key={index}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        setSelectedIndexes((prev) => [...prev, index])
                      } else {
                        setSelectedIndexes((prev) => prev.filter((i) => i !== index))
                      }
                    }}
                  />
                )
              })}
        </HStack>
      ) : (
        <></>
      )}
    </Stack>
  )
}
