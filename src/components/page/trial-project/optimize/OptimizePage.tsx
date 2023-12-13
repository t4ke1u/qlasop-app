'use client'

import {
  Box,
  HStack,
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
  useSteps,
} from '@chakra-ui/react'
import React, { useState } from 'react'

import { FreetimeSettingView } from './FreetimeSettingView'
import { RequiredCreditFormView } from './RequiredCreditFormView'
import { StageCourseList } from './StageCourseList'

import type { RequiredCreditRequestSchemaType } from './RequiredCreditFormView/RequiredCreditFormView.hooks'
import type { RequiredCredit } from '@/models/optimization/type'

export const OptimizePage = () => {
  const steps = [
    { description: '科目候補 & 必要単位数', title: 'Step 1' },
    { description: '空きコマ', title: 'Step 2' },
    { description: 'ソルバー', title: 'Step 3' },
  ]

  const { activeStep, setActiveStep } = useSteps({ count: steps.length, index: 0 })
  const [requiredCredit, setRequiredCredit] = useState<RequiredCredit>([])

  return (
    <Stack>
      <Stack px='100px' py='10px'>
        <Stepper index={activeStep} size='md'>
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
      {activeStep === 0 ? (
        <HStack align='start' maxH='full' p='20px' spacing='md'>
          <RequiredCreditFormView
            onProcessed={(data: RequiredCreditRequestSchemaType) => {
              setRequiredCredit(data.data)
              setActiveStep(1)
            }}
          />
          <Box h='full' w='full'>
            <StageCourseList />
          </Box>
        </HStack>
      ) : (
        <FreetimeSettingView />
      )}
    </Stack>
  )
}
