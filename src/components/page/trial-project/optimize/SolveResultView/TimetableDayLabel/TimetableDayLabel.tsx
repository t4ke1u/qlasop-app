import { Center } from '@chakra-ui/react'

import { TIMETABLE_DAYS } from '@/constants/project'

type Props = {
  index: number
}

export const TimetableDayLabel: React.FC<Props> = ({ index }) => {
  return (
    <Center color='gray.600' fontSize='sm' gridColumnStart={index + 2} gridRowStart={1} p={1.5}>
      {TIMETABLE_DAYS.en[index]}
    </Center>
  )
}
