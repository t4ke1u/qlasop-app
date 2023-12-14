import { Center } from '@chakra-ui/react'
import React from 'react'

type Props = {
  time: {
    day: number
    endPeriod: number
    startPeriod: number
  }
  title: string
}

export const TimetableCell: React.FC<Props> = ({ title, time }) => {
  const { day, startPeriod, endPeriod } = time

  return (
    <Center
      bg='gray.500'
      color='white'
      fontSize={{ base: 'xs', md: 'sm' }}
      fontWeight='medium'
      gridColumnStart={day + 2}
      gridRow={`${startPeriod + 2} / ${endPeriod + 3}`}
      h='full'
      overflow='hidden'
      p={0}
      rounded='lg'
      textAlign='center'
      textOverflow='ellipsis'
      w='full'
      whiteSpace='normal'
    >
      {title}
    </Center>
  )
}
