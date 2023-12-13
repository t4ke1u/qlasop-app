'use client'

import {
  Button,
  Center,
  FormLabel,
  HStack,
  Icon,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import React from 'react'
import { RxArrowRight } from 'react-icons/rx'

import { useTrialProjectCreditRanges } from '@/usecases/trialProject/reader'

import { useRequiredCreditRequestForm } from './RequiredCreditFormView.hooks'

import type { RequiredCreditRequestSchemaType } from './RequiredCreditFormView.hooks'

type Props = {
  onProcessed: (data: RequiredCreditRequestSchemaType) => void
}

export const RequiredCreditFormView: React.FC<Props> = ({ onProcessed }) => {
  const { creditRanges } = useTrialProjectCreditRanges()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useRequiredCreditRequestForm(creditRanges)

  return (
    <Stack
      borderRight='1px'
      borderRightColor='gray.300'
      maxH='calc(100vh - 185px)'
      minH='calc(100vh - 185px)'
      minW='400px'
      overflowY='auto'
      px='20px'
      spacing='8px'
    >
      <Text color='gray.400' fontSize='sm' fontWeight='bold' py='16px' w='100px'>
        必要単位数
      </Text>
      <Stack maxH='calc(100vh - 285px)' overflow='auto'>
        {creditRanges.map((creditRange, index) => (
          <HStack align='center' justify='space-between' key={index} spacing='md'>
            <Tooltip fontSize='xs' label={creditRange.creditCategory}>
              <FormLabel
                color='gray.700'
                fontSize='sm'
                fontWeight='medium'
                m={0}
                maxW='180px'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
              >
                {creditRange.creditCategory}
              </FormLabel>
            </Tooltip>
            <HStack align='center' spacing='5px'>
              <Center border='1px' borderColor='gray.200' borderRadius='md' h='40px' w='40px'>
                <Text color='gray.500'>{creditRange.current}</Text>
              </Center>
              <Icon as={RxArrowRight} color='gray.500' />
              <Select maxW='80px' minW='80px' {...register(`data.${index}.credits`)}>
                {[...Array(creditRange.max - creditRange.current + 1)].map((_, i) => (
                  <option key={i} value={i + creditRange.current}>
                    {i + creditRange.current}
                  </option>
                ))}
              </Select>
            </HStack>
          </HStack>
        ))}
      </Stack>
      <HStack justify='end' py='20px' spacing='20px'>
        <Button colorScheme='blackAlpha' onClick={() => reset()} size='md' variant='outline'>
          リセット
        </Button>
        <Button
          _hover={{ backgroundColor: 'blue.200' }}
          bg='blue.100'
          color='blue.400'
          isLoading={isSubmitting}
          minW='100px'
          onClick={handleSubmit(onProcessed)}
          size='md'
        >
          次へ
        </Button>
      </HStack>
    </Stack>
  )
}
