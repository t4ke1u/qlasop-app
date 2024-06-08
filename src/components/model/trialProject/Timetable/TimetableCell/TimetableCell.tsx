'use client'

import { Button, useDisclosure } from '@chakra-ui/react'

import { TimetableCellInfoModal } from './TimetableCellInfoModal'

import type { Cell, CellColor } from '@/models/trialProject/type'

type Props = {
  cell?: Cell
  time: {
    day: number
    endPeriod: number
    startPeriod: number
  }
}

export const TimetableCell: React.FC<Props> = ({ time, cell }) => {
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
        overflow='hidden'
        p={0}
        textOverflow='ellipsis'
        w='full'
        whiteSpace='normal'
      >
        {cell?.title}
      </Button>

      <TimetableCellInfoModal cell={cell} isOpen={isOpen} onClose={onClose} time={time} />
    </>
  )
}
