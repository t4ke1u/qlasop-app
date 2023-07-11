'use client'

import { Button, Circle, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { PeriodLabelModal } from './modal/PeriodLabelModal'
import { usePeriodLabelsStore } from '@/store/user'

type Props = {
  index: number
}

export const PeriodLabel: React.FC<Props> = ({ index }) => {
  const label = usePeriodLabelsStore((state) => state.labels[index])
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        w='full'
        h='full'
        gridColumnStart={1}
        gridRowStart={index + 2}
        rounded='lg'
        p={1.5}
        bg='gray.100'
        outline='solid 0.5px'
        outlineColor='gray.200'
        onClick={onOpen}
      >
        <Flex w='full' direction='column' align='center' justify='center' gap={2}>
          <Text fontSize={3} fontWeight='medium' color='gray.600'>
            {label.startTime}
          </Text>
          <Circle size={6} bg='gray.300' fontSize='xs' fontWeight='bold'>
            {index + 1}
          </Circle>
          <Text fontSize={3} fontWeight='medium' color='gray.600'>
            {label.endTime}
          </Text>
        </Flex>
      </Button>

      <PeriodLabelModal isOpen={isOpen} onClose={onClose} index={index} />
    </>
  )
}
