import { Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const RequiredCreditFormView = () => {
  return (
    <Stack
      borderRight='1px'
      borderRightColor='gray.300'
      maxH='calc(100vh - 120px)'
      minH='calc(100vh - 120px)'
      minW='300px'
      overflowY='auto'
      px='20px'
      spacing='8px'
    >
      <Text color='gray.400' fontSize='sm' fontWeight='bold' py='16px' w='100px'>
        必要単位数
      </Text>
    </Stack>
  )
}
