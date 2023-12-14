import { Center, Icon } from '@chakra-ui/react'
import React from 'react'
import { RxCross1 } from 'react-icons/rx'

type Props = {
  isFree: boolean
  time: {
    day: number
    period: number
  }
}

export const FreetimeCell: React.FC<Props> = ({ time, isFree }) => {
  const { day, period } = time

  return (
    <Center
      bg={isFree ? 'cyan.100' : 'gray.100'}
      color={isFree ? 'cyan.500' : 'gray.500'}
      fontWeight='medium'
      gridColumnStart={day + 2}
      gridRow={`${period + 2} / ${period + 3}`}
      h='full'
      outline='solid 0.5px'
      outlineColor={isFree ? 'cyan.200' : 'gray.200'}
      p={0}
      rounded='lg'
      textAlign='center'
      w='full'
      whiteSpace='normal'
    >
      {isFree && <Icon as={RxCross1} />}
    </Center>
  )
}
