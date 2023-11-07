import { Flex } from '@chakra-ui/react'

import { Timetable } from '@/components/model/trialProject/Timetable'

export const TimetablePage = () => {
  return (
    <Flex align='center' h='full' justify='center' p='20px' w='full'>
      <Timetable />
    </Flex>
  )
}
