'use client'

import { Button, useDisclosure } from '@chakra-ui/react'

import { CellInfoModal } from './modal/CellInfoModal'
import { UserCell } from '@/models/user/type'

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

  return (
    <>
      <Button
        w='full'
        h='full'
        gridColumnStart={day + 2}
        gridRow={`${startPeriod + 2} / ${endPeriod + 3}`}
        outline='solid 0.5px'
        outlineColor='gray.200'
        fontWeight='medium'
        color='gray.500'
        onClick={onOpen}
      >
        {cell?.title}
      </Button>

      <CellInfoModal isOpen={isOpen} onClose={onClose} time={time} cell={cell} />
    </>
  )
}
