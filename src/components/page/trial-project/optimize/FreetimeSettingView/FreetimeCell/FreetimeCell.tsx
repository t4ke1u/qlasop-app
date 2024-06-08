import { Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { RxCross1 } from 'react-icons/rx'

type Props = {
  isSelected: boolean
  onClick: () => void
  time: {
    day: number
    period: number
  }
}

export const FreetimeCell: React.FC<Props> = ({ isSelected, onClick, time }) => {
  const { day, period } = time

  return (
    <Button
      _hover={{ bg: isSelected ? 'cyan.200' : 'gray.200' }}
      bg={isSelected ? 'cyan.100' : 'gray.100'}
      color={isSelected ? 'cyan.500' : 'gray.500'}
      fontSize={{ base: 'xs', md: 'sm' }}
      fontWeight='medium'
      gridColumnStart={day + 2}
      gridRow={`${period + 2} / ${period + 3}`}
      h='full'
      onClick={onClick}
      outline='solid 0.5px'
      outlineColor={isSelected ? 'cyan.200' : 'gray.200'}
      p={0}
      w='full'
      whiteSpace='normal'
    >
      {isSelected && <Icon as={RxCross1} />}
    </Button>
  )
}
