'use client'

import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Flex, Stack } from '@chakra-ui/layout'
import { ModalBody, ModalHeader, ModalFooter } from '@chakra-ui/modal'
import {
  Button,
  Box,
  Input,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
  Select,
  SelectProps,
  Text,
  Wrap,
  useDisclosure,
  ButtonProps,
} from '@chakra-ui/react'

import { useState } from 'react'
import { SimpleAlertDialog } from '@/components/ui/alert/SimpleAlertDialog'
import { COLORS, DEFAULT_CRESITS_CAGEGORIES, PERIODS, TIMETABLE_DAYS } from '@/constants'
import { CellColor, UserCell } from '@/models/user/type'
import { useCellsForm } from '@/usecases/user/cellsForm'

type Props = {
  time?: { day: number; startPeriod: number; endPeriod: number }
  cell?: UserCell
  backView: () => void
  onModalClose: () => void
}

const InputItemProps: InputProps & NumberInputFieldProps = {
  display: 'inline-block',
  h: 9,
  w: 'full',
  flex: 1,
  alignContent: 'center',
  rounded: 'base',
  p: 4,
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'gray.800',
}

const SelectItemProps: SelectProps = {
  display: 'inline-block',
  h: 9,
  w: 'full',
  flex: 1,
  alignContent: 'center',
  rounded: 'base',
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'gray.800',
}

export const CellFormView: React.FC<Props> = ({ time, cell, backView, onModalClose }) => {
  // Alert
  const { isOpen, onOpen, onClose } = useDisclosure()
  // cellsForm
  const { register, onSubmit, onSubmitForce, reset, handleChangeColor, errors, isSubmitting } =
    useCellsForm(
      time,
      cell,
      () => {
        onModalClose()
        backView()
      },
      onOpen,
      () => {
        onModalClose()
        onClose()
        backView()
      },
    )

  return (
    <>
      <ModalHeader fontSize='md' fontWeight='medium' color='gray.800'>
        科目編集
      </ModalHeader>
      <ModalBody>
        <form>
          <Stack direction='column' gap={2}>
            {/* 科目名 */}
            <FormControl isRequired isInvalid={!!errors.title}>
              <Flex align='center' gap={2}>
                <FormLabel
                  htmlFor='title'
                  w='68px'
                  m={0}
                  textAlign='right'
                  fontSize='sm'
                  color='gray.500'
                >
                  科目名
                </FormLabel>
                <Input id='title' {...InputItemProps} {...register.title} />
              </Flex>
            </FormControl>

            {/* 曜日 */}
            <FormControl isRequired>
              <Flex align='center' gap={2}>
                <FormLabel
                  htmlFor='day'
                  w='68px'
                  m={0}
                  textAlign='right'
                  fontSize='sm'
                  color='gray.500'
                >
                  曜日
                </FormLabel>
                <Select id='day' {...SelectItemProps} {...register.day}>
                  {Object.keys(TIMETABLE_DAYS.jp).map((key, index) => (
                    <option key={index} value={index}>
                      {TIMETABLE_DAYS.jp[key]}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            {/* 時限 */}
            <FormControl isRequired isInvalid={!!errors.endPeriod}>
              <Flex align='center' gap={2}>
                <FormLabel w='68px' m={0} textAlign='right' fontSize='sm' color='gray.500'>
                  時限
                </FormLabel>
                <Select id='startPeriod' {...SelectItemProps} {...register.startPeriod}>
                  {PERIODS.map((period, index) => (
                    <option key={index} value={index}>
                      {period}
                    </option>
                  ))}
                </Select>
                <div>〜</div>
                <Select id='endPeriod' {...SelectItemProps} {...register.endPeriod}>
                  {PERIODS.map((period, index) => (
                    <option key={index} value={index}>
                      {period}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            {/* 教員 */}
            <FormControl>
              <Flex align='center' gap={5}>
                <FormLabel
                  htmlFor='instructor'
                  w={14}
                  m={0}
                  textAlign='right'
                  fontSize='sm'
                  color='gray.500'
                >
                  教員
                </FormLabel>
                <Input id='instructor' {...InputItemProps} {...register.instructor} />
              </Flex>
            </FormControl>

            {/* 単位区分 */}
            <FormControl isRequired>
              <Flex align='center' gap={2}>
                <FormLabel
                  htmlFor='creditCategory'
                  w='68px'
                  m={0}
                  textAlign='right'
                  fontSize='sm'
                  color='gray.500'
                >
                  単位区分
                </FormLabel>
                <Select id='creditCategory' {...SelectItemProps} {...register.creditsCategory}>
                  {Object.values(DEFAULT_CRESITS_CAGEGORIES.jp).map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            {/* 単位数 */}
            <FormControl isRequired>
              <Flex align='center' gap={2}>
                <FormLabel
                  htmlFor='credits'
                  w='68px'
                  m={0}
                  textAlign='right'
                  fontSize='sm'
                  color='gray.500'
                >
                  単位数
                </FormLabel>
                <NumberInput display='inline-block' flex={1} min={0}>
                  <NumberInputField id='credits' {...InputItemProps} {...register.credits} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </FormControl>

            {/* カラー */}
            <ColorRadioGroup
              defaultColor={cell?.color ?? 'gray'}
              handleChangeColor={handleChangeColor}
            />
          </Stack>
        </form>
      </ModalBody>
      <ModalFooter justifyContent='end' gap={2}>
        <Button
          display='inline-flex'
          h={9}
          bg='gray.100'
          px={5}
          py={1}
          fontSize='sm'
          fontWeight='medium'
          color='gray.800'
          _hover={{ bg: 'gray.200' }}
          onClick={() => {
            reset()
            backView()
          }}
        >
          キャンセル
        </Button>
        <Button
          display='inline-flex'
          h={9}
          bg='green.100'
          px={5}
          py={1}
          fontSize='sm'
          fontWeight='medium'
          color='green.800'
          _hover={{ bg: 'green.200' }}
          isLoading={isSubmitting}
          onClick={onSubmit}
        >
          保存
        </Button>
      </ModalFooter>

      <SimpleAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title='上書きしますか？'
        description='保存する科目によって，既存の科目が消去させる可能性がありますが，それでも実行しますか？'
        action={onSubmitForce}
      />
    </>
  )
}

type ColorRadioGroupProps = {
  defaultColor: CellColor
  handleChangeColor: (color: CellColor) => void
}

const ColorRadioGroup = ({ defaultColor, handleChangeColor }: ColorRadioGroupProps) => {
  const [cellColor, setCellColor] = useState<CellColor>(defaultColor)

  return (
    <Flex align='start' gap={5}>
      <Flex w={14} h={9} align='center' justify='end'>
        <Text w={14} textAlign='right' fontSize='sm' color='gray.600'>
          カラー
        </Text>
      </Flex>
      <Box display='inline-block' minH={9} w='full' flex={1} p={2}>
        <Wrap w='full' align='center' justify='start' gap={2}>
          {COLORS.map((color, index) => (
            <ColorRadioItem
              key={index}
              color={color}
              selected={color === cellColor}
              onClick={() => {
                setCellColor(color)
                handleChangeColor(color)
              }}
            />
          ))}
        </Wrap>
      </Box>
    </Flex>
  )
}

type ColorRadioItemProps = {
  color: CellColor
  selected: boolean
} & ButtonProps

const ColorRadioItem = ({ color, selected, ...rest }: ColorRadioItemProps) => {
  return (
    <Button
      size='xs'
      minW={5}
      h={5}
      rounded='full'
      bg={selected ? `${color}.400` : 'transparent'}
      borderColor={selected ? 'transparent' : `${color}.400`}
      borderWidth={2}
      _focus={{ bg: selected ? `${color}.400` : 'transparent' }}
      _hover={{ bg: selected ? `${color}.400` : `${color}.100` }}
      {...rest}
    />
  )
}
