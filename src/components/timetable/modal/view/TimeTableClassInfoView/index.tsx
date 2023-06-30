'use client'

import {
  Box,
  Button,
  Center,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { RxTrash } from 'react-icons/rx'

import ListItem from './ListItem'
import { TimeTableViewType } from '@/components/timetable/modal/TimeTableClassModal'
import TimeTableClassDeleteAlertDialog from '@/components/timetable/modal/alert/TimeTableClassDeleteAlertDialog'
import { CATEGORIES } from '@/constants/categories'
import { TIMETABLE_DAYS } from '@/constants/days'
import { FACULTIES } from '@/constants/faculties'
import { useClientData } from '@/hooks/ClientDataContext'
import { TimeTableCellModel } from '@/models/timetable/TimeTableCellModel'

type Props = {
  time: { day: number; startPeriod: number; endPeriod: number }
  cellData?: TimeTableCellModel
  setView: Dispatch<SetStateAction<TimeTableViewType>>
}

const TimeTableClassInfoView = ({ time, cellData, setView }: Props) => {
  // Alert
  const [showAlert, setShowAlert] = useState(false)
  // Client Data
  const { deleteTimeTableCell } = useClientData()

  return (
    <ModalContent p={2} maxH='90vh' w='450px' maxW='90vw'>
      <ModalCloseButton m={2} />
      <ModalHeader fontSize='md' fontWeight='medium' color='gray.800'>
        科目情報
      </ModalHeader>
      {/* 科目情報がある場合 */}
      {cellData !== undefined && (
        <>
          <ModalBody>
            <Stack direction='column' gap={2}>
              <ListItem label='科目名' content={cellData.class.subjectName} />
              <ListItem label='曜日' content={TIMETABLE_DAYS.jp[cellData.class.day]} />
              <ListItem
                label='時限'
                content={
                  cellData.class.startPeriod === cellData.class.endPeriod
                    ? `${cellData.class.startPeriod + 1} 限`
                    : `${cellData.class.startPeriod + 1} - ${cellData.class.endPeriod + 1} 限`
                }
              />
              <ListItem label='教員' content={cellData.class.teachers} />
              <ListItem label='学部' content={FACULTIES.jp[cellData.class.faculty]} />
              <ListItem label='科目区分' content={CATEGORIES.jp[cellData.class.category]} />
              <ListItem label='単位数' content={cellData.class.unit} />
              <TimeTableClassDeleteAlertDialog
                open={showAlert}
                onOpenChange={setShowAlert}
                action={() => {
                  deleteTimeTableCell(cellData!)
                  setShowAlert(false)
                }}
                cancel={() => setShowAlert(false)}
              />
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent='space-between'>
            <Button
              display='inline-flex'
              h={9}
              bg='red.100'
              px={3}
              py={1}
              fontSize='sm'
              fontWeight='medium'
              color='red.800'
              _hover={{ bg: 'red.200' }}
              onClick={() => setShowAlert(true)}
            >
              <Icon as={RxTrash} />
            </Button>
            <Button
              display='inline-flex'
              h={9}
              bg='purple.100'
              px={5}
              py={1}
              fontSize='sm'
              fontWeight='medium'
              color='purple.800'
              _hover={{ bg: 'purple.200' }}
              onClick={() => setView('edit')}
            >
              編集
            </Button>
          </ModalFooter>
        </>
      )}
      {/* 科目情報が無い場合 */}
      {cellData === undefined && (
        <ModalBody>
          <Box fontSize='sm' fontWeight='medium' color='gray.600'>
            {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限には科目がありません`}
          </Box>
          <Center my={10}>
            <Button
              h={9}
              rounded='base'
              bg='purple.100'
              px={5}
              py={1}
              fontSize='sm'
              fontWeight='medium'
              color='purple.800'
              _hover={{ bg: 'purple.200' }}
              onClick={() => setView('add')}
            >
              {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限に科目を追加する`}
            </Button>
          </Center>
        </ModalBody>
      )}
    </ModalContent>
  )
}

export default TimeTableClassInfoView
