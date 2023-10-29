'use client'

import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'

import { TimetableCellFormView } from './TimetableCellFormView'
import { TimetableCellInfoView } from './TimetableCellInfoView'

import type { Cell } from '@/models/trialProject/type'

export type TimeTableViewType = 'info' | 'edit' | 'add'

type Props = {
  cell?: Cell
  isOpen: boolean
  onClose: () => void
  time: {
    day: number
    endPeriod: number
    startPeriod: number
  }
}

export const TimetableCellInfoModal: React.FC<Props> = ({ isOpen, onClose, time, cell }) => {
  const [view, setView] = useState<TimeTableViewType>('info')

  return (
    <Modal
      allowPinchZoom={true}
      autoFocus={false}
      closeOnOverlayClick={view === 'info'}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
    >
      <ModalOverlay />
      <ModalContent maxH='90vh' maxW='90vw' p={2} w='450px'>
        {view === 'info' && <TimetableCellInfoView cell={cell} setView={setView} time={time} />}
        {view === 'edit' && (
          <TimetableCellFormView
            backView={() => setView('info')}
            cell={cell!}
            onModalClose={onClose}
            time={time}
          />
        )}
        {view === 'add' && (
          <TimetableCellFormView
            backView={() => setView('info')}
            onModalClose={onClose}
            time={time}
          />
        )}
      </ModalContent>
    </Modal>
  )
}
