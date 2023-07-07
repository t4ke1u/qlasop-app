'use client'

import { Button, useDisclosure } from '@chakra-ui/react'

import { CellInfoModal } from './modal/CellInfoModal'
import { CellColor, UserCell } from '@/models/user/type'

type Props = {
  time: {
    day: number
    startPeriod: number
    endPeriod: number
  }
  cell?: UserCell
}

export const Cell: React.FC<Props> = ({ time, cell }) => {
  const { day, startPeriod, endPeriod } = time
  const { isOpen, onOpen, onClose } = useDisclosure()
  const color: CellColor = cell?.color ?? 'gray'

  return (
    <>
      <Button
        w='full'
        h='full'
        gridColumnStart={day + 2}
        gridRow={`${startPeriod + 2} / ${endPeriod + 3}`}
        bg={`${color}.100`}
        p={0}
        outline='solid 0.5px'
        outlineColor={`${color}.200`}
        fontSize={{ base: 'xs', md: 'sm' }}
        fontWeight='medium'
        color={`${color}.500`}
        whiteSpace='normal'
        _hover={{ bg: `${color}.200` }}
        onClick={onOpen}
      >
        {cell?.title}
      </Button>

      <CellInfoModal isOpen={isOpen} onClose={onClose} time={time} cell={cell} />
    </>
  )
}
