'use client'

import { Button, Center, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RxMagnifyingGlass } from 'react-icons/rx'

import { useTrialProject } from '@/usecases/trialProject/reader'

import { AddStageCourseButton } from './AddStageCourseButton'
import { DeleteStageCourseButton } from './DeleteStageCourseButton'
import { StageCourseCell } from './StageCourseCell'
import { StageCourseCellButton } from './StageCourseCellButton'

import type { CoursesGetResponse } from '@/models/course/type'

type Props = {
  data?: CoursesGetResponse
}

type ViewMode = 'edit' | 'select'

export const StageCourseList: React.FC<Props> = () => {
  const { trialProject } = useTrialProject()

  const [mode, setMode] = useState<ViewMode>('edit')
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const toggleMode = () => {
    if (mode == 'edit') {
      setMode('select')
    } else {
      setSelectedIndexes([])
      setMode('edit')
    }
  }

  const [stageCourseList, setStageCourseList] = useState<React.ReactNode>()
  const [stageCourseLength, setStageCourseLength] = useState<number>(0)
  useEffect(() => {
    setStageCourseList(
      mode == 'edit'
        ? trialProject.stage.map((course, index) => {
            return <StageCourseCell course={course} key={index} />
          })
        : trialProject.stage.map((course, index) => {
            return (
              <StageCourseCellButton
                course={course}
                isSelected={selectedIndexes.includes(index)}
                key={index}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setSelectedIndexes((prev) => [...prev, index])
                  } else {
                    setSelectedIndexes((prev) => prev.filter((i) => i !== index))
                  }
                }}
              />
            )
          }),
    )
    setStageCourseLength(trialProject.stage.length)
  }, [mode, trialProject.stage, selectedIndexes])

  return (
    <Stack maxH='calc(100vh - 185px)' px='20px'>
      <HStack align='center' justify='space-between'>
        <Text color='gray.400' fontSize='sm' fontWeight='bold' h='50px' py='16px' w='180px'>
          科目候補 - {stageCourseLength}件
        </Text>
        <HStack>
          {mode === 'edit' ? (
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
            isDisabled={mode === 'edit'}
            onClick={() =>
              setSelectedIndexes([...Array(trialProject.stage.length)].map((_, i) => i))
            }
            px='24px'
            size='sm'
            variant='outline'
          >
            全選択
          </Button>
          <DeleteStageCourseButton
            courses={trialProject.stage}
            isDisabled={mode === 'edit'}
            onProcessed={toggleMode}
            selectedIndexes={selectedIndexes}
          />
          <AddStageCourseButton />
        </HStack>
      </HStack>
      {stageCourseLength !== 0 ? (
        <HStack maxH='calc(100vh - 235px)' overflow='auto' py='10px' wrap='wrap'>
          {stageCourseList}
        </HStack>
      ) : (
        <Center h='100px' w='full'>
          <HStack align='center' fontWeight='semibold' gap='5px' px='10px' py='14px'>
            <Icon as={RxMagnifyingGlass} color='gray.500' size='14px' />
            <Text color='gray.500' cursor='pointer' fontSize='sm'>
              Search で科目候補を追加できます
            </Text>
          </HStack>
        </Center>
      )}
    </Stack>
  )
}
