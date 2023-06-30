'use client'

import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'

import TimeTableClassAddView from './view/TimeTableClassAddView'
import TimeTableClassEditView from './view/TimeTableClassEditView'
import TimeTableClassInfoView from './view/TimeTableClassInfoView'
import { TimeTableCellModel } from '@/models/timetable/TimeTableCellModel'

export type TimeTableViewType = 'info' | 'edit' | 'add'

type Props = {
  isOpen: boolean
  onClose: () => void
  time: {
    day: number
    startPeriod: number
    endPeriod: number
  }
  cellData?: TimeTableCellModel
}

const TimeTableClassModal = ({ isOpen, onClose, time, cellData }: Props) => {
  const [view, setView] = useState<TimeTableViewType>('info')

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {view === 'info' && (
        <TimeTableClassInfoView time={time} cellData={cellData} setView={setView} />
      )}
      {view === 'edit' && <TimeTableClassEditView cellData={cellData!} setView={setView} />}
      {view === 'add' && (
        <TimeTableClassAddView cellData={{ class: { ...time } }} setView={setView} />
      )}
    </Modal>
  )
}

export default TimeTableClassModal
