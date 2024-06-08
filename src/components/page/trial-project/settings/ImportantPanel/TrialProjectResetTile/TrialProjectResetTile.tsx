'use client'

import { Button, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'

import { SimpleAlertDialog } from '@/components/ui/SimpleAlertDialog'
import { useCourseQueryCacheUsecase } from '@/usecases/courseQuery/usecase'
import { useSolveRequestUsecase } from '@/usecases/solveRequest/usecase'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

export const TrialProjectResetTile = () => {
  const { resetTrialProject } = useTrialProjectUsecase()
  const { resetSolveRequest } = useSolveRequestUsecase()
  const { resetCourseQueryCache } = useCourseQueryCacheUsecase()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const reset = () => {
    resetTrialProject()
    resetSolveRequest()
    resetCourseQueryCache()
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: 'プロジェクトをリセットしました',
      variant: 'subtle',
    })
  }

  return (
    <>
      <Stack bg='red.50' p='20px' rounded='md' spacing='12px' w='fit-content'>
        <Text color='red.500' fontSize='md' fontWeight='semibold'>
          プロジェクトのリセット
        </Text>
        <Text color='red.400' fontSize='sm' fontWeight='medium'>
          プロジェクトをリセットします．一度リセットすると元に戻すことはできません．
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
        title='本当にプロジェクトをリセットしますか？'
      />
    </>
  )
}
