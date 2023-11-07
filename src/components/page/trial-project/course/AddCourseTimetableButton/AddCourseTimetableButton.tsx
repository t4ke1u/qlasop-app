import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import { AddCourseFormModal } from './AddCourseFormModal'

import type { Course } from '@/models/course/type'

type Props = {
  course: Course
}

export const AddCourseTimetableButton: React.FC<Props> = ({ course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        _hover={{ backgroundColor: 'purple.200' }}
        bg='purple.100'
        color='purple.500'
        onClick={onOpen}
        size='md'
      >
        時間割に追加
      </Button>

      <AddCourseFormModal course={course} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
