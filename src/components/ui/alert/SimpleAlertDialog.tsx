'use client'

import { Button } from '@chakra-ui/button'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  action: () => void
}

export const SimpleAlertDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  description,
  action,
}) => {
  const cancelRef = useRef<FocusableElement>(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent p={2} maxH='90vh' w='450px' maxW='90vw'>
          <AlertDialogHeader fontSize='md' fontWeight='medium' color='gray.800'>
            {title}
          </AlertDialogHeader>
          <AlertDialogBody fontSize='sm' fontWeight='medium' color='gray.500'>
            {description}
          </AlertDialogBody>
          <AlertDialogFooter justifyContent='end' gap={2}>
            <Button
              display='inline-flex'
              h={9}
              bg='gray.100'
              px={5}
              py={1}
              fontSize='sm'
              fontWeight='medium'
              color='gray.800'
              _hover={{ bg: 'gray.200' }}
              onClick={onClose}
            >
              キャンセル
            </Button>
            <Button
              display='inline-flex'
              h={9}
              bg='red.100'
              px={5}
              py={1}
              fontSize='sm'
              fontWeight='medium'
              color='red.800'
              _hover={{ bg: 'red.200' }}
              onClick={() => {
                onClose()
                action()
              }}
            >
              実行
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
