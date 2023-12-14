'use client'

import { Button, HStack, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { pagesPath } from '@/generated/$path'
import { useSolveUsecase } from '@/usecases/solve/usecase'
import { useSolveRequest } from '@/usecases/solveRequest/reader'
import { useSolveRequestUsecase } from '@/usecases/solveRequest/usecase'
import { useSolveResultUsecase } from '@/usecases/solveResult/usecase'

import type { SolverType } from '@/models/solve/type'

type Props = {
  changePrev: () => void
}

export const SolverSelectView: React.FC<Props> = ({ changePrev }) => {
  const router = useRouter()
  const { solveRequest } = useSolveRequest()
  const { updateSolverType } = useSolveRequestUsecase()
  const { solveProblem } = useSolveUsecase()
  const { updateSolveResult } = useSolveResultUsecase()
  const toast = useToast()

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const solve = async () => {
    setIsFetching(true)
    const data = await solveProblem(solveRequest)
    setIsFetching(false)
    if (data.status === 'error') {
      toast({
        isClosable: true,
        position: 'bottom-right',
        status: 'error',
        title: 'エラーが発生したため，最適な組合せを見つけられませんでした',
        variant: 'subtle',
      })
    } else if (data.status === 'success' && !data.solveResult?.isSatisfaction) {
      toast({
        isClosable: true,
        position: 'bottom-right',
        status: 'error',
        title: '条件に合う最適な組合せを見つけられませんでした',
        variant: 'subtle',
      })
    } else if (
      data.status === 'success' &&
      !!data.solveResult?.isSatisfaction &&
      !!data.solveResult
    ) {
      updateSolveResult(data.solveResult)
      console.log(data.solveResult)
      router.push(pagesPath.trial_project.optimize.result.$url().pathname)
    }
  }

  return (
    <Stack maxH='calc(100vh - 185px)' px='50px' py='20px' spacing='30px'>
      <Text>ソルバーを選択してください</Text>
      <RadioGroup
        isDisabled={isFetching}
        onChange={(nextValue: SolverType) => updateSolverType(nextValue)}
        pl='20px'
        size='lg'
        value={solveRequest.solverType}
      >
        <Stack spacing='20px'>
          <Radio value='AMPLIFY_AE'>Amplify AE</Radio>
          <Radio value='QUBO_SA'>Simulated Annealing Sampler (QUBO SA)</Radio>
          <Radio isDisabled value='NO_QUBO_SA'>
            科目交換法
          </Radio>
        </Stack>
      </RadioGroup>
      <HStack py='20px' spacing='20px'>
        <Button
          colorScheme='blackAlpha'
          isDisabled={isFetching}
          onClick={changePrev}
          size='md'
          variant='outline'
        >
          戻る
        </Button>
        <Button
          _hover={{ backgroundColor: 'red.200' }}
          bg='red.100'
          color='red.400'
          isLoading={isFetching}
          minW='100px'
          onClick={() => solve()}
          size='md'
        >
          最適化実行
        </Button>
      </HStack>
    </Stack>
  )
}
