'use client'

import { Button, Circle, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { TimetablePeriodLabelEditModal } from './TimetablePeriodLabelEditModal'

import type { PeriodLabel } from '@/models/trialProject/type'

type Props = {
  periodLabel: PeriodLabel
}

export const TimetablePeriodLabel: React.FC<Props> = ({ periodLabel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        bg='gray.100'
        gridColumnStart={1}
        gridRowStart={periodLabel.index + 2}
        h='full'
        onClick={onOpen}
        outline='solid 0.5px'
        outlineColor='gray.200'
        p={1.5}
        rounded='lg'
        w='full'
      >
        <Flex align='center' direction='column' gap={2} justify='center' w='full'>
          <Text color='gray.600' fontSize='xs' fontWeight='medium'>
            {periodLabel?.startTime}
          </Text>
          <Circle bg='gray.300' fontSize='xs' fontWeight='bold' size={6}>
            {periodLabel.index + 1}
          </Circle>
          <Text color='gray.600' fontSize='xs' fontWeight='medium'>
            {periodLabel?.endTime}
          </Text>
        </Flex>
      </Button>

      <TimetablePeriodLabelEditModal isOpen={isOpen} onClose={onClose} periodLabel={periodLabel} />
    </>
  )
}
