'use client'

import { Box, Flex, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TIMETABLE_DAYS } from '@/constants/project'
import { useTrialProject } from '@/usecases/trialProject/reader'

import { TimetableCell } from './TimetableCell'
import { TimetableDayLabel } from './TimetableDayLabel'
import { TimetablePeriodLabel } from './TimetablePeriodLabel'

export const Timetable = () => {
  const { trialProject } = useTrialProject()

  const [cells, setCells] = useState<Array<React.ReactNode>>([])
  useEffect(() => {
    const filledPeriods: Array<string> = []
    const cells: Array<React.ReactNode> = []
    trialProject.cells.map((cell) => {
      cells.push(
        <TimetableCell
          cell={cell}
          key={uuidv4()}
          time={{
            day: cell.day,
            endPeriod: cell.endPeriod,
            startPeriod: cell.startPeriod,
          }}
        />,
      )
      for (let i = cell.startPeriod; i <= cell.endPeriod; i++) {
        filledPeriods.push(`${cell.day}-${i}`)
      }
    })
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (!filledPeriods.includes(`${i}-${j}`)) {
          cells.push(
            <TimetableCell key={uuidv4()} time={{ day: i, endPeriod: j, startPeriod: j }} />,
          )
        }
      }
    }
    setCells(cells)
  }, [trialProject.cells])

  return (
    <Flex maxH='calc(100vh - 120px)' minH='full' minW='full' overflow='auto'>
      <Grid
        gap={1}
        gridTemplateColumns='0.5fr repeat(6, 1fr)'
        gridTemplateRows='auto repeat(7, minmax(80px,auto))'
        h='full'
        minH='max(600px, calc(100vh - 120px))'
        minW='full'
      >
        <Box gridColumnStart={1} gridRowStart={1} />
        {/* 時間割ラベル */}
        {trialProject.periodLabels
          .sort((p1, p2) => p1.index - p2.index)
          .map((periodLabel, index) => {
            return <TimetablePeriodLabel key={index} periodLabel={periodLabel} />
          })}
        {/* 曜日ラベル */}
        {Object.keys(TIMETABLE_DAYS.jp).map((_, index) => {
          return <TimetableDayLabel index={index} key={index} />
        })}
        {/* 科目セル */}
        {cells}
      </Grid>
    </Flex>
  )
}
