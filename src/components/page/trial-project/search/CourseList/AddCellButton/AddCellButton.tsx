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

export const AddCellButton: React.FC<Props> = ({
  isDisabled,
  selectedIndexes,
  courses,
  onProcessed,
}) => {
  const { getOverlapCells, addCell } = useTrialProjectUsecase()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const addCells = () => {
    if (
      selectedIndexes
        .map((i) => courses[i])
        .filter((course) => course.day !== -1)
        .every((course) => getOverlapCells({ ...course, color: 'gray' }).length === 0)
    ) {
      selectedIndexes
        .map((i) => courses[i])
        .filter((course) => course.day !== -1)
        .forEach((course) => addCell({ ...course, color: 'gray' }))
      toast({
        isClosable: true,
        position: 'bottom-right',
        status: 'success',
        title: `${
          selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
        }個の科目を時間割に追加しました`,
        variant: 'subtle',
      })
      onProcessed()
    } else {
      toast({
        isClosable: true,
        position: 'bottom-right',
        status: 'error',
        title: `科目を上書きしてしまうため，処理を完了できませんでした`,
        variant: 'subtle',
      })
    }
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
        時間割に追加
      </Button>
      <SimpleAlertDialog
        action={addCells}
        isOpen={isOpen}
        onClose={onClose}
        title={`${
          selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
        }個の科目を時間割に追加しますか？`}
      />
    </>
  )
}
