import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React from 'react'

import { DEFAULT_PERIODS, TIMETABLE_DAYS } from '@/constants/project'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import { useCourseForm } from './AddStageCourseButton.hooks'

import type { CourseSchemaType } from './AddStageCourseButton.hooks'
import type { InputProps, NumberInputFieldProps, SelectProps } from '@chakra-ui/react'

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

export const AddStageCourseButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useCourseForm()

  const { addStageCourses } = useTrialProjectUsecase()

  const submit = async (data: CourseSchemaType) => {
    addStageCourses([data])
    onClose()
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: `${data.title} を科目候補に追加しました`,
      variant: 'subtle',
    })
  }

  return (
    <>
      <Button
        _hover={{ background: 'green.200' }}
        bg='green.100'
        border='green.100'
        color='green.500'
        h='32px'
        onClick={onOpen}
        px='24px'
        size='sm'
        variant='outline'
      >
        追加
      </Button>
      <Modal
        allowPinchZoom={true}
        autoFocus={false}
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent maxH='90vh' maxW='90vw' p={2} w='450px'>
          <ModalHeader color='gray.800' fontSize='md' fontWeight='medium'>
            科目候補 新規作成
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
                    <Select
                      id='day'
                      {...SelectItemProps}
                      {...register('day', { valueAsNumber: true })}
                    >
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
                      {DEFAULT_PERIODS.sort((a, b) => a.index - b.index).map((period) => (
                        <option key={period.index} value={period.index}>
                          {period.index + 1}
                        </option>
                      ))}
                    </Select>
                    <div>〜</div>
                    <Select
                      id='endPeriod'
                      {...SelectItemProps}
                      {...register('endPeriod', { valueAsNumber: true })}
                    >
                      {DEFAULT_PERIODS.sort((a, b) => a.index - b.index).map((period) => (
                        <option key={period.index} value={period.index}>
                          {period.index + 1}
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
                    <Input
                      id='creditCategory'
                      {...InputItemProps}
                      {...register('creditCategory')}
                    />
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
                onClose()
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
              onClick={handleSubmit(submit)}
              px={5}
              py={1}
            >
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
