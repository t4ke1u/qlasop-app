'use client'

import { Stack, HStack, Button, Grid, Box, Text, useToast, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { SimpleAlertDialog } from '@/components/ui/SimpleAlertDialog'
import { TIMETABLE_DAYS } from '@/constants/project'
import { pagesPath } from '@/generated/$path'
import { useSolveResult } from '@/usecases/solveResult/reader'
import { useTrialProject } from '@/usecases/trialProject/reader'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import { FreetimeCell } from './FreetimeCell'
import { TimetableCell } from './TimetableCell'
import { TimetableDayLabel } from './TimetableDayLabel'
import { TimetablePeriodLabel } from './TimetablePeriodLabel'

export const SolveResultView = () => {
  const router = useRouter()
  const { solveResult } = useSolveResult()
  const { trialProject } = useTrialProject()
  const { addCells } = useTrialProjectUsecase()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const toast = useToast()

  const addCellsProcess = () => {
    if (!solveResult) {
      return
    }
    addCells(solveResult.assignedCourses.map((course) => ({ ...course, color: 'gray' })))
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: `${solveResult.assignedCourses.length}個の科目を時間割に追加しました`,
      variant: 'subtle',
    })
  }

  const [cells, setCells] = useState<Array<React.ReactNode>>([])
  useEffect(() => {
    const filledPeriods: Array<string> = []
    const cells: Array<React.ReactNode> = []
    solveResult?.currentCourses.map((cell) => {
      cells.push(
        <TimetableCell
          isAssigned={false}
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
    solveResult?.assignedCourses.map((cell) => {
      cells.push(
        <TimetableCell
          isAssigned={true}
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
              isFree={!!solveResult?.freetimePeriods.find((fp) => fp.day === i && fp.period === j)}
              time={{ day: i, period: j }}
            />,
          )
        }
      }
    }
    setCells(cells)
  }, [solveResult])

  return (
    <>
      <Stack maxH='calc(100vh - 185px)' px='50px' py='20px' spacing='sm'>
        <Stack spacing='sm'>
          <Text>時間割に適用しますか？</Text>
          <HStack py='20px' spacing='20px'>
            <Button
              colorScheme='blackAlpha'
              onClick={() => router.push(pagesPath.trial_project.optimize.$url().pathname)}
              size='md'
              variant='outline'
            >
              最初から
            </Button>
            <Button
              _hover={{ backgroundColor: 'purple.200' }}
              bg='purple.100'
              color='purple.400'
              minW='100px'
              onClick={onOpen}
              size='md'
            >
              適用
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

      <SimpleAlertDialog
        action={addCellsProcess}
        isOpen={isOpen}
        onClose={onClose}
        title={`${
          solveResult ? solveResult!.assignedCourses.length : 0
        }個の科目を時間割に追加しますか？`}
      />
    </>
  )
}
