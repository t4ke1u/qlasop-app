import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'

import { SimpleAlertDialog } from '@/components/ui/SimpleAlertDialog'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import type { Course } from '@/models/course/type'

type Props = {
  courses: Course[]
  isDisabled: boolean
  onProcessed: () => void
  selectedIndexes: number[]
}

export const AddStageCourseButton: React.FC<Props> = ({
  isDisabled,
  selectedIndexes,
  courses,
  onProcessed,
}) => {
  const { addStageCourses } = useTrialProjectUsecase()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const addStageCoursesProcess = () => {
    addStageCourses(selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1))
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: `${
        selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
      }個の科目を科目候補に追加しました`,
      variant: 'subtle',
    })
    onProcessed()
  }

  return (
    <>
      <Button
        _hover={{ background: isDisabled ? 'gray.200' : 'blue.200' }}
        bg={isDisabled ? 'gray.200' : 'blue.100'}
        border={isDisabled ? 'gray.200' : 'blue.100'}
        color={isDisabled ? 'gray.50' : 'blue.500'}
        h='32px'
        isDisabled={isDisabled}
        onClick={onOpen}
        px='24px'
        size='sm'
        variant='outline'
      >
        科目候補に追加
      </Button>
      <SimpleAlertDialog
        action={addStageCoursesProcess}
        isOpen={isOpen}
        onClose={onClose}
        title={`${
          selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
        }個の科目を科目候補に追加しますか？`}
      />
    </>
  )
}
