import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'

import { SimpleAlertDialog } from '@/components/ui/SimpleAlertDialog'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import type { Course } from '@/models/course/type'

type Props = {
  course: Course
}

export const AddCourseTimetableButton: React.FC<Props> = ({ course }) => {
  const { createCell } = useTrialProjectUsecase()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const addCourse = (force: boolean) => {
    const result = createCell({ color: 'gray', ...course }, force)
    if (result) {
      force && onClose()
      toast({
        isClosable: true,
        position: 'bottom-right',
        status: 'success',
        title: `${course.title} を追加しました`,
        variant: 'subtle',
      })
    } else {
      !force && onOpen()
    }
  }

  return (
    <>
      <Button
        _hover={{ backgroundColor: 'purple.200' }}
        bg='purple.100'
        color='purple.500'
        onClick={() => addCourse(false)}
        size='sm'
      >
        時間割に追加
      </Button>

      <SimpleAlertDialog
        action={() => addCourse(true)}
        isOpen={isOpen}
        onClose={onClose}
        title='保存する科目によって，既存の科目が消去させる可能性がありますが，それでも実行しますか？'
      />
    </>
  )
}
