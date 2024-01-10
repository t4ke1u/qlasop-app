import { AccordionPanel, Stack } from '@chakra-ui/react'
import React from 'react'

import { CellsResetTile } from './CellsResetTile'
import { PeriodLabelsResetTile } from './PeriodLabelsResetTile'
import { TrialProjectResetTile } from './TrialProjectResetTile'

export const ImportantPanel = () => {
  return (
    <AccordionPanel px='40px' py='20px'>
      <Stack spacing='20px'>
        <PeriodLabelsResetTile />
        <CellsResetTile />
        <TrialProjectResetTile />
      </Stack>
    </AccordionPanel>
  )
}
