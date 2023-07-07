'use client'

import {
  Box,
  Button,
  Center,
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

import { TimeTableViewType } from '@/components/model/user/timetable/modal/CellInfoModal'
import { SimpleAlertDialog } from '@/components/ui/alert/SimpleAlertDialog'
import { PERIODS } from '@/constants'
import { TIMETABLE_DAYS } from '@/constants/days'
import { UserCell } from '@/models/user/type'
import { useCellsStore } from '@/store/user/cellsStore'

type Props = {
  time: { day: number; startPeriod: number; endPeriod: number }
  cell?: UserCell
  setView: React.Dispatch<React.SetStateAction<TimeTableViewType>>
}

export const CellInfoView: React.FC<Props> = ({ time, cell, setView }) => {
  // Cell Store
  const deleteCell = useCellsStore((state) => state.delete)
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
              <ListItem label='科目名' content={cell.title} />
              <ListItem label='曜日' content={TIMETABLE_DAYS.jp[cell.day]} />
              <ListItem
                label='時限'
                content={
                  cell.startPeriod === cell.endPeriod
                    ? `${PERIODS[cell.startPeriod]} 限`
                    : `${PERIODS[cell.startPeriod]} - ${PERIODS[cell.endPeriod]} 限`
                }
              />
              <ListItem label='教員' content={cell.instructor} />
              <ListItem label='単位区分' content={cell.creditCategory} />
              <ListItem label='単位数' content={cell.credits} />
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
        action={() => {
          deleteCell(cell!)
        }}
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
