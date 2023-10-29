import { Box, Flex } from '@chakra-ui/react'

import { Timetable } from '@/components/model/trialProject/Timetable'
import { TrialProjectSidebar } from '@/components/ui/layout/trialProject/TrialProjectSidebar'

export const TimetablePage = () => {
  return (
    <Flex w='full'>
      <TrialProjectSidebar />
      <Box p={8} w='full'>
        <Timetable />
      </Box>
    </Flex>
  )
}
