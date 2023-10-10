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
import { useRef } from 'react'

import type { FocusableElement } from '@chakra-ui/utils'

type Props = {
  action: () => void,
  description?: string,
  isOpen: boolean,
  onClose: () => void,
  title: string
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
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxH='90vh' maxW='90vw' p={2} w='450px'>
          <AlertDialogHeader color='gray.800' fontSize='md' fontWeight='medium'>
            {title}
          </AlertDialogHeader>
          <AlertDialogBody color='gray.500' fontSize='sm' fontWeight='medium'>
            {description}
          </AlertDialogBody>
          <AlertDialogFooter gap={2} justifyContent='end'>
            <Button
              _hover={{ bg: 'gray.200' }}
              bg='gray.100'
              color='gray.800'
              display='inline-flex'
              fontSize='sm'
              fontWeight='medium'
              h={9}
              onClick={onClose}
              px={5}
              py={1}
            >
              キャンセル
            </Button>
            <Button
              _hover={{ bg: 'red.200' }}
              bg='red.100'
              color='red.800'
              display='inline-flex'
              fontSize='sm'
              fontWeight='medium'
              h={9}
              onClick={() => {
                onClose()
                action()
              }}
              px={5}
              py={1}
            >
              実行
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
