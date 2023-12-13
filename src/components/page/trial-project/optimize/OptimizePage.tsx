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
import { SolverSelectView } from './SolverSelectView'
import { StageCourseList } from './StageCourseList'

import type { RequiredCreditsRequestSchemaType } from './RequiredCreditFormView/RequiredCreditFormView.hooks'
import type { FreetimePeriods, RequiredCredits, SolverType } from '@/models/solver/type'

export const OptimizePage = () => {
  const steps = [
    { description: '科目候補 & 必要単位数', title: 'Step 1' },
    { description: '空きコマ', title: 'Step 2' },
    { description: 'ソルバー', title: 'Step 3' },
    { description: '最適化結果', title: 'Step 4' },
  ]

  const { activeStep, setActiveStep } = useSteps({ count: steps.length, index: 0 })
  const [requiredCredits, setRequiredCredits] = useState<RequiredCredits>([])
  const [freetimePeriods, setFreetimePeriods] = useState<FreetimePeriods>([])
  const [solverType, setSolverType] = useState<SolverType>('AMPLIFY_AE')

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
            onProcessed={(data: RequiredCreditsRequestSchemaType) => {
              setRequiredCredits(data.data)
              setActiveStep(1)
            }}
          />
          <Box h='full' w='full'>
            <StageCourseList />
          </Box>
        </HStack>
      ) : activeStep === 1 ? (
        <FreetimeSettingView
          freetimePeriods={freetimePeriods}
          onClickBack={() => setActiveStep(0)}
          onProcessed={() => setActiveStep(2)}
          setFreetimePeriods={setFreetimePeriods}
        />
      ) : activeStep === 2 ? (
        <SolverSelectView
          onClickBack={() => setActiveStep(1)}
          onProcessed={() => setActiveStep(3)}
          setSolverType={setSolverType}
          solverType={solverType}
        />
      ) : (
        <></>
      )}
    </Stack>
  )
}
