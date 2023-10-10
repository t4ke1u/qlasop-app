'use client'

import { Button, useDisclosure } from '@chakra-ui/react'

import { InfoModal } from './InfoModal'

import type { CellColor, UserCell } from '@/models/user/type'


type Props = {
  cell?: UserCell,
  time: {
    day: number
    endPeriod: number,
    startPeriod: number
  }
}

export const Cell: React.FC<Props> = ({ time, cell }) => {
  const { day, startPeriod, endPeriod } = time
  const { isOpen, onOpen, onClose } = useDisclosure()
  const color: CellColor = cell?.color ?? 'gray'

  return (
    <>
      <Button
        _hover={{ bg: `${color}.200` }}
        bg={`${color}.100`}
        color={`${color}.500`}
        fontSize={{ base: 'xs', md: 'sm' }}
        fontWeight='medium'
        gridColumnStart={day + 2}
        gridRow={`${startPeriod + 2} / ${endPeriod + 3}`}
        h='full'
        onClick={onOpen}
        outline='solid 0.5px'
        outlineColor={`${color}.200`}
        p={0}
        w='full'
        whiteSpace='normal'
      >
        {cell?.title}
      </Button>

      <InfoModal cell={cell} isOpen={isOpen} onClose={onClose} time={time} />
    </>
  )
}
