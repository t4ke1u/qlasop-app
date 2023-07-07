import { Center } from '@chakra-ui/react'

import { TIMETABLE_DAYS } from '@/constants/days'

type Props = {
  index: number
}

export const DayLabel: React.FC<Props> = ({ index }) => {
  return (
    <Center gridRowStart={1} gridColumnStart={index + 2} p={1.5} color='gray.600' fontSize='sm'>
      {TIMETABLE_DAYS.en[index]}
    </Center>
  )
}