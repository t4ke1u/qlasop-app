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

export const DeleteStageCourseButton: React.FC<Props> = ({
  isDisabled,
  selectedIndexes,
  courses,
  onProcessed,
}) => {
  const { deleteStageCourses } = useTrialProjectUsecase()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteStageCoursesProcess = () => {
    deleteStageCourses(selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1))
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: `${
        selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
      }個の科目候補を削除しました`,
      variant: 'subtle',
    })
    onProcessed()
  }

  return (
    <>
      <Button
        _hover={{ background: isDisabled ? 'gray.200' : 'red.200' }}
        bg={isDisabled ? 'gray.200' : 'red.100'}
        border={isDisabled ? 'gray.200' : 'red.100'}
        color={isDisabled ? 'gray.50' : 'red.500'}
        h='32px'
        isDisabled={isDisabled}
        ml='20px'
        onClick={onOpen}
        px='24px'
        size='sm'
        variant='outline'
      >
        削除
      </Button>
      <SimpleAlertDialog
        action={deleteStageCoursesProcess}
        isOpen={isOpen}
        onClose={onClose}
        title={`${
          selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
        }個の科目候補に削除しますか？`}
      />
    </>
  )
}
