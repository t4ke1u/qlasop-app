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
  const { addCells } = useTrialProjectUsecase()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const addCellsProcess = () => {
    const result = addCells(
      selectedIndexes
        .map((i) => courses[i])
        .filter((course) => course.day !== -1)
        .map((course) => {
          return { ...course, color: 'gray' }
        }),
    )
    if (result) {
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
        _hover={{ background: isDisabled ? 'gray.200' : 'purple.200' }}
        bg={isDisabled ? 'gray.200' : 'purple.100'}
        border={isDisabled ? 'gray.200' : 'purple.100'}
        color={isDisabled ? 'gray.50' : 'purple.500'}
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
        action={addCellsProcess}
        isOpen={isOpen}
        onClose={onClose}
        title={`${
          selectedIndexes.map((i) => courses[i]).filter((course) => course.day !== -1).length
        }個の科目を時間割に追加しますか？`}
      />
    </>
  )
}
