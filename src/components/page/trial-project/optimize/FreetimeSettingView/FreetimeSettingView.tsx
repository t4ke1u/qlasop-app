import { Box, Button, Grid, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TIMETABLE_DAYS } from '@/constants/project'
import { useTrialProject } from '@/usecases/trialProject/reader'

import { FreetimeCell } from './FreetimeCell'
import { TimetableCell } from './TimetableCell'
import { TimetableDayLabel } from './TimetableDayLabel'
import { TimetablePeriodLabel } from './TimetablePeriodLabel'

import type { FreetimePeriods } from '@/models/solver/type'

type Props = {
  freetimePeriods: FreetimePeriods
  onClickBack: () => void
  onProcessed: () => void
  setFreetimePeriods: React.Dispatch<React.SetStateAction<FreetimePeriods>>
}

export const FreetimeSettingView: React.FC<Props> = ({
  onClickBack,
  onProcessed,
  freetimePeriods,
  setFreetimePeriods,
}) => {
  const { trialProject } = useTrialProject()

  const [cells, setCells] = useState<Array<React.ReactNode>>([])
  useEffect(() => {
    const filledPeriods: Array<string> = []
    const cells: Array<React.ReactNode> = []
    trialProject.cells.map((cell) => {
      cells.push(
        <TimetableCell
          key={uuidv4()}
          time={{
            day: cell.day,
            endPeriod: cell.endPeriod,
            startPeriod: cell.startPeriod,
          }}
          title={cell.title}
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
            <FreetimeCell
              isSelected={!!freetimePeriods.find((fp) => fp.day === i && fp.period === j)}
              key={uuidv4()}
              onClick={
                !!freetimePeriods.find((fp) => fp.day === i && fp.period === j)
                  ? () =>
                      setFreetimePeriods((prev) =>
                        prev.filter((fp) => fp.day !== i || fp.period !== j),
                      )
                  : () => setFreetimePeriods((prev) => [...prev, { day: i, period: j }])
              }
              time={{ day: i, period: j }}
            />,
          )
        }
      }
    }
    setCells(cells)
  }, [trialProject.cells, freetimePeriods, setFreetimePeriods])

  return (
    <Stack maxH='calc(100vh - 185px)' px='50px' py='20px'>
      <Stack spacing='sm'>
        <Text>科目を入れない時限を選択してください</Text>
        <HStack py='20px' spacing='20px'>
          <Button colorScheme='blackAlpha' onClick={onClickBack} size='md' variant='outline'>
            戻る
          </Button>
          <Button
            _hover={{ backgroundColor: 'blue.200' }}
            bg='blue.100'
            color='blue.400'
            minW='100px'
            onClick={onProcessed}
            size='md'
          >
            次へ
          </Button>
        </HStack>
      </Stack>
      <Grid
        gap={1}
        gridTemplateColumns='0.5fr repeat(6, 1fr)'
        gridTemplateRows='auto repeat(7, minmax(50px,auto))'
        minH='full'
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
    </Stack>
  )
}
