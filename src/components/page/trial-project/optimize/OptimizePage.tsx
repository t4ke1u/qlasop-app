import { Box, HStack } from '@chakra-ui/react'
import React from 'react'

import { RequiredCreditFormView } from './RequiredCreditFormView'
import { StageCourseList } from './StageCourseList'

export const OptimizePage = () => {
  return (
    <HStack align='start' maxH='full' p='20px' spacing='md'>
      <RequiredCreditFormView />
      <Box h='full' w='full'>
        <StageCourseList />
      </Box>
    </HStack>
  )
}
