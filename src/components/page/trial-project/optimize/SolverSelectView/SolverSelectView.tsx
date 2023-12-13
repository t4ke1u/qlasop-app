import { Button, HStack, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React from 'react'

import type { SolverType } from '@/models/optimization/type'

type Props = {
  onClickBack: () => void
  onProcessed: () => void
  setSolverType: React.Dispatch<React.SetStateAction<SolverType>>
  solverType: SolverType
}

export const SolverSelectView: React.FC<Props> = ({
  onClickBack,
  onProcessed,
  solverType,
  setSolverType,
}) => {
  return (
    <Stack maxH='calc(100vh - 185px)' px='50px' py='20px' spacing='30px'>
      <Text>ソルバーを選択してください</Text>
      <RadioGroup
        onChange={(nextValue: SolverType) => setSolverType(nextValue)}
        pl='20px'
        size='lg'
        value={solverType}
      >
        <Stack spacing='20px'>
          <Radio value='AMPLIFY_AE'>Amplify AE</Radio>
          <Radio value='QUBO_SA'>Simulated Annealing Sampler (QUBO SA)</Radio>
          <Radio value='NO_QUBO_SA'>科目交換法</Radio>
        </Stack>
      </RadioGroup>
      <HStack py='20px' spacing='20px'>
        <Button colorScheme='blackAlpha' onClick={onClickBack} size='md' variant='outline'>
          戻る
        </Button>
        <Button
          _hover={{ backgroundColor: 'red.200' }}
          bg='red.100'
          color='red.400'
          minW='100px'
          onClick={onProcessed}
          size='md'
        >
          最適化実行
        </Button>
      </HStack>
    </Stack>
  )
}
