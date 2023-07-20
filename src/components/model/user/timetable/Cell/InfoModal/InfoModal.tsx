'use client'

import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'

import { FormView } from './FormView'
import { InfoView } from './InfoView'
import { UserCell } from '@/models/user/type'

export type TimeTableViewType = 'info' | 'edit' | 'add'

type Props = {
  isOpen: boolean
  onClose: () => void
  time: {
    day: number
    startPeriod: number
    endPeriod: number
  }
  cell?: UserCell
}

export const InfoModal: React.FC<Props> = ({ isOpen, onClose, time, cell }) => {
  const [view, setView] = useState<TimeTableViewType>('info')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={view === 'info'}
      scrollBehavior='inside'
      autoFocus={false}
      allowPinchZoom={true}
    >
      <ModalOverlay />
      <ModalContent p={2} maxH='90vh' w='450px' maxW='90vw'>
        {view === 'info' && <InfoView time={time} cell={cell} setView={setView} />}
        {view === 'edit' && (
          <FormView
            time={time}
            cell={cell!}
            backView={() => setView('info')}
            onModalClose={onClose}
          />
        )}
        {view === 'add' && (
          <FormView time={time} backView={() => setView('info')} onModalClose={onClose} />
        )}
      </ModalContent>
    </Modal>
  )
}
