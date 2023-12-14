'use client'

import {
  Box,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react'
import React from 'react'

import { SolveResultView } from './SolveResultView'

export const ResultPage = () => {
  const steps = [
    { description: '科目候補 & 必要単位数', title: 'Step 1' },
    { description: '空きコマ', title: 'Step 2' },
    { description: 'ソルバー', title: 'Step 3' },
    { description: '最適化結果', title: 'Step 4' },
  ]

  return (
    <Stack gap={0} maxH='calc(100vh - 80px)' overflow='auto' p='20px'>
      <Stack px='100px' py='10px'>
        <Stepper index={3} size='md'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  active={<StepNumber />}
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Stack>
      <SolveResultView />
    </Stack>
  )
}
