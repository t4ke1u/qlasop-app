'use client'

import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { RxTrash } from 'react-icons/rx'

import { SimpleAlertDialog } from '@/components/ui/SimpleAlertDialog'
import { TIMETABLE_DAYS } from '@/constants/project'
import { useTrialProject } from '@/usecases/trialProject/reader'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import type { TimeTableViewType } from '../TimetableCellInfoModal'
import type { Cell, CellColor } from '@/models/trialProject/type'

type Props = {
  cell?: Cell
  setView: React.Dispatch<React.SetStateAction<TimeTableViewType>>
  time: { day: number; endPeriod: number; startPeriod: number }
}

export const TimetableCellInfoView: React.FC<Props> = ({ time, cell, setView }) => {
  // Delete Cell Logic
  const { trialProject } = useTrialProject()
  const { updateTrialProject, deleteCell } = useTrialProjectUsecase()

  // Alert
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ModalCloseButton m={2} />
      <ModalHeader color='gray.800' fontSize='md' fontWeight='medium'>
        科目情報
      </ModalHeader>
      {/* 科目情報がある場合 */}
      {cell !== undefined && (
        <>
          <ModalBody>
            <Stack direction='column' gap={2}>
              {/* 科目名 */}
              <ListItem content={cell.title} label='科目名' />
              {/* 曜日 */}
              <ListItem content={TIMETABLE_DAYS.jp[cell.day]} label='曜日' />
              {/* 時限 */}
              <ListItem
                content={
                  cell.startPeriod === cell.endPeriod
                    ? `${cell.startPeriod + 1} 限`
                    : `${cell.startPeriod + 1} - ${cell.endPeriod + 1} 限`
                }
                label='時限'
              />
              {/* 教員 */}
              <ListItem content={cell.instructor} label='教員' />
              {/* 単位区分 */}
              <ListItem content={cell.creditCategory} label='単位区分' />
              {/* 単位数 */}
              <ListItem content={cell.credits} label='単位数' />
              {/* カラー */}
              <ColorItem color={cell.color} />
              {/* メモ */}
              {cell.clientMemo && <MemoItem clientMemo={cell.clientMemo} />}
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent='space-between'>
            <Button
              _hover={{ bg: 'red.200' }}
              bg='red.100'
              color='red.800'
              display='inline-flex'
              fontSize='sm'
              fontWeight='medium'
              h={9}
              onClick={onOpen}
              px={3}
              py={1}
            >
              <Icon as={RxTrash} />
            </Button>
            <Button
              _hover={{ bg: 'purple.200' }}
              bg='purple.100'
              color='purple.800'
              display='inline-flex'
              fontSize='sm'
              fontWeight='medium'
              h={9}
              onClick={() => setView('edit')}
              px={5}
              py={1}
            >
              編集
            </Button>
          </ModalFooter>
        </>
      )}
      {/* 科目情報が無い場合 */}
      {cell === undefined && (
        <ModalBody>
          <Box color='gray.600' fontSize='sm' fontWeight='medium'>
            {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限には科目がありません`}
          </Box>
          <Center my={10}>
            <Button
              _hover={{ bg: 'purple.200' }}
              bg='purple.100'
              color='purple.800'
              fontSize='sm'
              fontWeight='medium'
              h={9}
              onClick={() => setView('add')}
              px={5}
              py={1}
              rounded='base'
            >
              {`${TIMETABLE_DAYS.jp[time.day]} ${time.startPeriod + 1} 限に科目を追加する`}
            </Button>
          </Center>
        </ModalBody>
      )}

      <SimpleAlertDialog
        action={() => deleteCell(cell!)}
        description='削除すると，元に戻せませんが，それでも実行しますか？'
        isOpen={isOpen}
        onClose={onClose}
        title='削除しますか？'
      />
    </>
  )
}

const ListItem = ({ label, content }: { content: React.ReactNode; label: React.ReactNode }) => {
  return (
    <Flex align='center' gap={5}>
      <Text color='gray.600' fontSize='sm' textAlign='right' w={14}>
        {label}
      </Text>
      <Text
        align='left'
        color='gray.800'
        display='inline-block'
        flex={1}
        fontSize='sm'
        fontWeight='medium'
        h={9}
        p={2}
        w='full'
      >
        {content}
      </Text>
    </Flex>
  )
}

const ColorItem = ({ color }: { color: CellColor }) => {
  return (
    <Flex align='center' gap={5}>
      <Text color='gray.600' fontSize='sm' textAlign='right' w={14}>
        カラー
      </Text>
      <Box display='inline-block' flex={1} h={9} p={2} w='full'>
        <Circle bg={`${color}.400`} size={5} />
      </Box>
    </Flex>
  )
}

const MemoItem = ({ clientMemo }: { clientMemo?: string }) => {
  return (
    <Flex align='start' gap={5}>
      <Flex align='center' h={9} justify='end' w={14}>
        <Text color='gray.600' fontSize='sm' textAlign='right' w={14}>
          メモ
        </Text>
      </Flex>
      <Box
        color='gray.800'
        display='inline-block'
        flex={1}
        fontSize='sm'
        fontWeight='medium'
        minH={9}
        overflowWrap='normal'
        p={2}
        w='full'
      >
        {clientMemo}
      </Box>
    </Flex>
  )
}
