'use client'

import { Box, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Cell } from './Cell'
import { DayLabel } from './DayLabel'
import { PeriodLabel } from './PeriodLabel'

import { PERIODS, TIMETABLE_DAYS } from '@/constants'
import { useCellsStore } from '@/store/user/cellsStore'

export const Frame = () => {
  const storedCells = useCellsStore((state) => state.cells)

  const [cells, setCells] = useState<Array<React.ReactNode>>([])
  useEffect(() => {
    const filledPeriods: Array<string> = []
    const cells: Array<React.ReactNode> = []
    storedCells.map((storedCell) => {
      cells.push(
        <Cell
          key={`${storedCell.day}-${storedCell.startPeriod}-${storedCell.title}`}
          time={{
            day: storedCell.day,
            startPeriod: storedCell.startPeriod,
            endPeriod: storedCell.endPeriod,
          }}
          cell={storedCell}
        />,
      )
      for (let i = storedCell.startPeriod; i <= storedCell.endPeriod; i++) {
        filledPeriods.push(`${storedCell.day}-${i}`)
      }
    })
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (!filledPeriods.includes(`${i}-${j}`)) {
          cells.push(<Cell key={`${i}-${j}`} time={{ day: i, startPeriod: j, endPeriod: j }} />)
        }
      }
    }
    setCells(cells)
  }, [storedCells])

  return (
    <Grid
      gridTemplateColumns='0.5fr repeat(6, 1fr)'
      gridTemplateRows='auto repeat(7, minmax(100px,auto))'
      gap={1}
    >
      <Box gridColumnStart={1} gridRowStart={1} />
      {/* 時間割ラベル */}
      {PERIODS.map((_, index) => {
        return <PeriodLabel key={index} index={index} />
      })}
      {/* 曜日ラベル */}
      {Object.keys(TIMETABLE_DAYS.jp).map((_, index) => {
        return <DayLabel key={index} index={index} />
      })}
      {/* 科目セル */}
      {cells}
    </Grid>
  )
}
