'use client'

import { Button, Circle, Flex, Text } from '@chakra-ui/react'

import { useClientData } from '@/hooks/ClientDataContext'

type TimeTablePeriodLabelProps = {
  index: number
}

const TimeTablePeriodLabel = ({ index }: TimeTablePeriodLabelProps) => {
  const { clientData } = useClientData()
  const label = clientData.setting.periodLabels[index]

  return (
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
    >
      <Flex w='full' direction='column' align='center' justify='center' gap={2}>
        <Text fontSize={3} fontWeight='medium' color='gray.600'>
          {label.startTime}
        </Text>
        <Circle size={6} bg='gray.300' fontSize='xs' fontWeight='bold'>
          {label.period}
        </Circle>
        <Text fontSize={3} fontWeight='medium' color='gray.600'>
          {label.endTime}
        </Text>
      </Flex>
    </Button>
  )
}

export default TimeTablePeriodLabel
