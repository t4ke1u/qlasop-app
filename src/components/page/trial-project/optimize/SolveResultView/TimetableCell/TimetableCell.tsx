import { Center } from '@chakra-ui/react'
import React from 'react'

type Props = {
  isAssigned: boolean
  time: {
    day: number
    endPeriod: number
    startPeriod: number
  }
  title: string
}

export const TimetableCell: React.FC<Props> = ({ title, time, isAssigned }) => {
  const { day, startPeriod, endPeriod } = time

  return (
    <Center
      bg={isAssigned ? 'purple.100' : 'gray.500'}
      color={isAssigned ? 'purple.500' : 'white'}
      fontSize={{ base: 'xs', md: 'sm' }}
      fontWeight='medium'
      gridColumnStart={day + 2}
      gridRow={`${startPeriod + 2} / ${endPeriod + 3}`}
      h='full'
      p={0}
      rounded='lg'
      textAlign='center'
      w='full'
      whiteSpace='normal'
    >
      {title}
    </Center>
  )
}
