'use client'

import { Button, Circle, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { usePeriodLabel } from '@/usecases/user/reader'

import { EditModal } from './EditModal'

type Props = {
  index: number
}

export const PeriodLabel: React.FC<Props> = ({ index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { label } = usePeriodLabel(index)

  return (
    <>
      <Button
        bg='gray.100'
        gridColumnStart={1}
        gridRowStart={index + 2}
        h='full'
        onClick={onOpen}
        outline='solid 0.5px'
        outlineColor='gray.200'
        p={1.5}
        rounded='lg'
        w='full'
      >
        <Flex align='center' direction='column' gap={2} justify='center' w='full'>
          <Text color='gray.600' fontSize={3} fontWeight='medium'>
            {label?.startTime}
          </Text>
          <Circle bg='gray.300' fontSize='xs' fontWeight='bold' size={6}>
            {index + 1}
          </Circle>
          <Text color='gray.600' fontSize={3} fontWeight='medium'>
            {label?.endTime}
          </Text>
        </Flex>
      </Button>

      <EditModal index={index} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
