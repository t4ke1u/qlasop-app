'use client'

import { Button, useDisclosure } from '@chakra-ui/react'

import TimeTableClassModal from './modal/TimeTableClassModal'
import { TimeTableCellModel } from '@/models/timetable/TimeTableCellModel'

type Props = {
  time: {
    day: number
    startPeriod: number
    endPeriod: number
  }
  cellData?: TimeTableCellModel
}

const TimeTableCell = ({ time, cellData }: Props) => {
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
        {cellData?.class.subjectName}
      </Button>

      <TimeTableClassModal isOpen={isOpen} onClose={onClose} time={time} cellData={cellData} />
    </>
  )
}

export default TimeTableCell
