'use client'

import { Button, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'

import { SimpleAlertDialog } from '@/components/ui/SimpleAlertDialog'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

export const CellsResetTile = () => {
  const { resetCells } = useTrialProjectUsecase()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const reset = () => {
    resetCells()
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: '時間割のすべての科目を削除しました',
      variant: 'subtle',
    })
  }

  return (
    <>
      <Stack bg='red.50' p='20px' rounded='md' spacing='12px' w='fit-content'>
        <Text color='red.500' fontSize='md' fontWeight='semibold'>
          科目の削除
        </Text>
        <Text color='red.400' fontSize='sm' fontWeight='medium'>
          時間割のすべての科目を削除します．一度削除すると元に戻すことはできません．
        </Text>
        <Button
          _hover={{ background: 'red.200' }}
          bg='red.100'
          border='red.100'
          color='red.500'
          h='32px'
          onClick={onOpen}
          size='sm'
          variant='solid'
          w='104px'
        >
          リセット
        </Button>
      </Stack>

      <SimpleAlertDialog
        action={reset}
        isOpen={isOpen}
        onClose={onClose}
        title='本当に時間割のすべての科目を削除しますか？'
      />
    </>
  )
}
