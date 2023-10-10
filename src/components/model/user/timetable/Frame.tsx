'use client'

import { Box, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { PERIODS, TIMETABLE_DAYS } from '@/constants'
import { useCellsStore } from '@/store/user/cells.store'

import { Cell } from './Cell/Cell'
import { DayLabel } from './DayLabel'
import { PeriodLabel } from './PeriodLabel/PeriodLabel'


export const Frame = () => {
  const { cells: storedCells } = useCellsStore()

  const [cells, setCells] = useState<Array<React.ReactNode>>([])
  useEffect(() => {
    const filledPeriods: Array<string> = []
    const cells: Array<React.ReactNode> = []
    storedCells.map((storedCell) => {
      cells.push(
        <Cell
          cell={storedCell}
          key={uuidv4()}
          time={{
            day: storedCell.day,
            endPeriod: storedCell.endPeriod,
            startPeriod: storedCell.startPeriod,
          }}
        />,
      )
      for (let i = storedCell.startPeriod; i <= storedCell.endPeriod; i++) {
        filledPeriods.push(`${storedCell.day}-${i}`)
      }
    })
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (!filledPeriods.includes(`${i}-${j}`)) {
          cells.push(<Cell key={uuidv4()} time={{ day: i, endPeriod: j, startPeriod: j }} />)
        }
      }
    }
    setCells(cells)
  }, [storedCells])

  return (
    <Grid
      gap={1}
      gridTemplateColumns='0.5fr repeat(6, 1fr)'
      gridTemplateRows='auto repeat(7, minmax(100px,auto))'
    >
      <Box gridColumnStart={1} gridRowStart={1} />
      {/* 時間割ラベル */}
      {PERIODS.map((_, index) => {
        return <PeriodLabel index={index} key={index} />
      })}
      {/* 曜日ラベル */}
      {Object.keys(TIMETABLE_DAYS.jp).map((_, index) => {
        return <DayLabel index={index} key={index} />
      })}
      {/* 科目セル */}
      {cells}
    </Grid>
  )
}
