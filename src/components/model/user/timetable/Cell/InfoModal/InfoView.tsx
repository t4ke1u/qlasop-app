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

import { TimeTableViewType } from '@/components/model/user/timetable/Cell/InfoModal'
import { SimpleAlertDialog } from '@/components/ui/alert/SimpleAlertDialog'
import { PERIODS } from '@/constants'
import { TIMETABLE_DAYS } from '@/constants/days'
import { CellColor, UserCell } from '@/models/user/type'
import { useCellsUsecase } from '@/usecases/user/usecase'

type Props = {
  time: { day: number; startPeriod: number; endPeriod: number }
  cell?: UserCell
  setView: React.Dispatch<React.SetStateAction<TimeTableViewType>>
}

export const InfoView: React.FC<Props> = ({ time, cell, setView }) => {
  // Cell Store
  const { deleteCell } = useCellsUsecase()
  // Alert
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ModalCloseButton m={2} />
      <ModalHeader fontSize='md' fontWeight='medium' color='gray.800'>
        科目情報
      </ModalHeader>
      {/* 科目情報がある場合 */}
      {cell !== undefined && (
        <>
          <ModalBody>
            <Stack direction='column' gap={2}>
              {/* 科目名 */}
              <ListItem label='科目名' content={cell.title} />
              {/* 曜日 */}
              <ListItem label='曜日' content={TIMETABLE_DAYS.jp[cell.day]} />
              {/* 時限 */}
              <ListItem
                label='時限'
                content={
                  cell.startPeriod === cell.endPeriod
                    ? `${PERIODS[cell.startPeriod]} 限`
                    : `${PERIODS[cell.startPeriod]} - ${PERIODS[cell.endPeriod]} 限`
                }
              />
              {/* 教員 */}
              <ListItem label='教員' content={cell.instructor} />
              {/* 単位区分 */}
              <ListItem label='単位区分' content={cell.creditCategory} />
              {/* 単位数 */}
              <ListItem label='単位数' content={cell.credits} />
              {/* カラー */}
              <ColorItem color={cell.color} />
              {/* メモ */}
              {cell.clientMemo && <MemoItem clientMemo={cell.clientMemo} />}
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
              onClick={onOpen}
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
      {cell === undefined && (
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

      <SimpleAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title='削除しますか？'
        description='削除すると，元に戻せませんが，それでも実行しますか？'
        action={() => deleteCell(cell!)}
      />
    </>
  )
}

const ListItem = ({ label, content }: { label: React.ReactNode; content: React.ReactNode }) => {
  return (
    <Flex align='center' gap={5}>
      <Text w={14} textAlign='right' fontSize='sm' color='gray.600'>
        {label}
      </Text>
      <Text
        display='inline-block'
        h={9}
        w='full'
        flex={1}
        align='left'
        p={2}
        fontSize='sm'
        fontWeight='medium'
        color='gray.800'
      >
        {content}
      </Text>
    </Flex>
  )
}

const ColorItem = ({ color }: { color: CellColor }) => {
  return (
    <Flex align='center' gap={5}>
      <Text w={14} textAlign='right' fontSize='sm' color='gray.600'>
        カラー
      </Text>
      <Box display='inline-block' h={9} w='full' flex={1} p={2}>
        <Circle size={5} bg={`${color}.400`} />
      </Box>
    </Flex>
  )
}

const MemoItem = ({ clientMemo }: { clientMemo?: string }) => {
  return (
    <Flex align='start' gap={5}>
      <Flex w={14} h={9} align='center' justify='end'>
        <Text w={14} textAlign='right' fontSize='sm' color='gray.600'>
          メモ
        </Text>
      </Flex>
      <Box
        display='inline-block'
        minH={9}
        w='full'
        flex={1}
        p={2}
        fontSize='sm'
        fontWeight='medium'
        color='gray.800'
        overflowWrap='normal'
      >
        {clientMemo}
      </Box>
    </Flex>
  )
}
