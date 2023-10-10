'use client'


import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Flex, Stack } from '@chakra-ui/layout'
import { ModalBody, ModalHeader, ModalFooter } from '@chakra-ui/modal'
import {
  Button,
  Box,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Wrap,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'


import { SimpleAlertDialog } from '@/components/ui/alert/SimpleAlertDialog'
import { COLORS, DEFAULT_CRESITS_CAGEGORIES, PERIODS, TIMETABLE_DAYS } from '@/constants'
import { useCellsUsecase } from '@/usecases/user/usecase'

import { useCellForm } from './FormView.hooks'

import type { CellSchemaType} from './FormView.hooks';
import type { CellColor, UserCell } from '@/models/user/type'
import type {
  InputProps,
  NumberInputFieldProps,
  SelectProps,
  ButtonProps} from '@chakra-ui/react';

type Props = {
  backView: () => void,
  cell?: UserCell
  onModalClose: () => void,
  time?: { day: number; endPeriod: number, startPeriod: number; }
}

const InputItemProps: InputProps & NumberInputFieldProps = {
  alignContent: 'center',
  color: 'gray.800',
  display: 'inline-block',
  flex: 1,
  fontSize: 'sm',
  fontWeight: 'medium',
  h: 9,
  p: 4,
  rounded: 'base',
  w: 'full',
}

const SelectItemProps: SelectProps = {
  alignContent: 'center',
  color: 'gray.800',
  display: 'inline-block',
  flex: 1,
  fontSize: 'sm',
  fontWeight: 'medium',
  h: 9,
  rounded: 'base',
  w: 'full',
}

export const FormView: React.FC<Props> = ({ time, cell, backView, onModalClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createCell, updateCell } = useCellsUsecase()
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useCellForm(time, cell)

  const onChangeColor = (color: CellColor) => setValue('color', color)

  const submit = (force: boolean) => async (data: CellSchemaType) => {
    const result = cell ? updateCell(cell!, data, force) : createCell(data, force)
    if (result) {
      force && onClose()
      onModalClose()
    } else {
      !force && onOpen()
    }
  }

  return (
    <>
      <ModalHeader color='gray.800' fontSize='md' fontWeight='medium'>
        科目編集
      </ModalHeader>
      <ModalBody>
        <form>
          <Stack direction='column' gap={2}>
            {/* 科目名 */}
            <FormControl isInvalid={!!errors.title} isRequired>
              <Flex align='center' gap={2}>
                <FormLabel
                  color='gray.500'
                  fontSize='sm'
                  htmlFor='title'
                  m={0}
                  textAlign='right'
                  w='68px'
                >
                  科目名
                </FormLabel>
                <Input id='title' {...InputItemProps} {...register('title')} />
              </Flex>
            </FormControl>

            {/* 曜日 */}
            <FormControl>
              <Flex align='center' gap={5}>
                <FormLabel
                  color='gray.500'
                  fontSize='sm'
                  htmlFor='day'
                  m={0}
                  textAlign='right'
                  w={14}
                >
                  曜日
                </FormLabel>
                <Select id='day' {...SelectItemProps} {...register('day', { valueAsNumber: true })}>
                  {Object.keys(TIMETABLE_DAYS.jp).map((key, index) => (
                    <option key={index} value={index}>
                      {TIMETABLE_DAYS.jp[key]}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            {/* 時限 */}
            <FormControl isInvalid={!!errors.endPeriod}>
              <Flex align='center' gap={5}>
                <FormLabel color='gray.500' fontSize='sm' m={0} textAlign='right' w={14}>
                  時限
                </FormLabel>
                <Select
                  id='startPeriod'
                  {...SelectItemProps}
                  {...register('startPeriod', { valueAsNumber: true })}
                >
                  {PERIODS.map((period, index) => (
                    <option key={index} value={index}>
                      {period}
                    </option>
                  ))}
                </Select>
                <div>〜</div>
                <Select
                  id='endPeriod'
                  {...SelectItemProps}
                  {...register('endPeriod', { valueAsNumber: true })}
                >
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
                  color='gray.500'
                  fontSize='sm'
                  htmlFor='instructor'
                  m={0}
                  textAlign='right'
                  w={14}
                >
                  教員
                </FormLabel>
                <Input id='instructor' {...InputItemProps} {...register('instructor')} />
              </Flex>
            </FormControl>

            {/* 単位区分 */}
            <FormControl>
              <Flex align='center' gap={5}>
                <FormLabel
                  color='gray.500'
                  fontSize='sm'
                  htmlFor='creditCategory'
                  m={0}
                  textAlign='right'
                  w={14}
                >
                  単位区分
                </FormLabel>
                <Select id='creditCategory' {...SelectItemProps} {...register('creditCategory')}>
                  {Object.values(DEFAULT_CRESITS_CAGEGORIES.jp).map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>

            {/* 単位数 */}
            <FormControl>
              <Flex align='center' gap={5}>
                <FormLabel
                  color='gray.500'
                  fontSize='sm'
                  htmlFor='credits'
                  m={0}
                  textAlign='right'
                  w={14}
                >
                  単位数
                </FormLabel>
                <NumberInput display='inline-block' flex={1} min={0}>
                  <NumberInputField
                    id='credits'
                    {...InputItemProps}
                    {...register('credits', { valueAsNumber: true })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </FormControl>

            {/* カラー */}
            <ColorRadioGroup defaultColor={cell?.color ?? 'gray'} onChange={onChangeColor} />

            {/* メモ */}
            <FormControl>
              <Flex align='start' gap={5}>
                <Flex align='center' h={9} justify='end' mt={1} w={14}>
                  <FormLabel color='gray.500' fontSize='sm' textAlign='right' w={14}>
                    メモ
                  </FormLabel>
                </Flex>
                <Textarea
                  display='inline-block'
                  flex={1}
                  fontSize='sm'
                  minH={28}
                  overflowWrap='normal'
                  p={2}
                  w='full'
                  {...register('clientMemo')}
                />
              </Flex>
            </FormControl>
          </Stack>
        </form>
      </ModalBody>
      <ModalFooter gap={2} justifyContent='end'>
        <Button
          _hover={{ bg: 'gray.200' }}
          bg='gray.100'
          color='gray.800'
          display='inline-flex'
          fontSize='sm'
          fontWeight='medium'
          h={9}
          onClick={() => {
            reset()
            backView()
          }}
          px={5}
          py={1}
        >
          キャンセル
        </Button>
        <Button
          _hover={{ bg: 'green.200' }}
          bg='green.100'
          color='green.800'
          display='inline-flex'
          fontSize='sm'
          fontWeight='medium'
          h={9}
          isLoading={isSubmitting}
          onClick={handleSubmit(submit(false))}
          px={5}
          py={1}
        >
          保存
        </Button>
      </ModalFooter>

      <SimpleAlertDialog
        action={handleSubmit(submit(true))}
        description='保存する科目によって，既存の科目が消去させる可能性がありますが，それでも実行しますか？'
        isOpen={isOpen}
        onClose={onClose}
        title='上書きしますか？'
      />
    </>
  )
}

type ColorRadioGroupProps = {
  defaultColor?: CellColor
  onChange?: (color: CellColor) => void
}

const ColorRadioGroup = ({ defaultColor, onChange }: ColorRadioGroupProps) => {
  const [cellColor, setCellColor] = useState<CellColor>(defaultColor ?? 'gray')

  return (
    <Flex align='start' gap={5}>
      <Flex align='center' h={9} justify='end' w={14}>
        <Text color='gray.600' fontSize='sm' textAlign='right' w={14}>
          カラー
        </Text>
      </Flex>
      <Box display='inline-block' flex={1} minH={9} p={2} w='full'>
        <Wrap align='center' gap={2} justify='start' w='full'>
          {COLORS.map((color, index) => (
            <ColorRadioItem
              color={color}
              key={index}
              onClick={() => {
                setCellColor(color)
                onChange && onChange(color)
              }}
              selected={color === cellColor}
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
      _focus={{ bg: selected ? `${color}.400` : 'transparent' }}
      _hover={{ bg: selected ? `${color}.400` : `${color}.100` }}
      bg={selected ? `${color}.400` : 'transparent'}
      borderColor={selected ? 'transparent' : `${color}.400`}
      borderWidth={2}
      h={5}
      minW={5}
      rounded='full'
      size='xs'
      {...rest}
    />
  )
}
