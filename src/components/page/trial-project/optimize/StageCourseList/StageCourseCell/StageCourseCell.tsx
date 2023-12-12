import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React from 'react'

import { DEFAULT_PERIODS, TIMETABLE_DAYS } from '@/constants/project'
import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import { useCourseForm } from './StageCourseCell.hooks'

import type { CourseSchemaType } from './StageCourseCell.hooks'
import type { Course } from '@/models/course/type'
import type { InputProps, NumberInputFieldProps, SelectProps } from '@chakra-ui/react'

type Props = {
  course: Course
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

export const StageCourseCell: React.FC<Props> = ({ course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useCourseForm(course)

  const { updateStageCourse } = useTrialProjectUsecase()

  const submit = async (data: CourseSchemaType) => {
    updateStageCourse(course, data)
    onClose()
    toast({
      isClosable: true,
      position: 'bottom-right',
      status: 'success',
      title: `${data.title} を更新しました`,
      variant: 'subtle',
    })
  }

  return (
    <>
      <Stack
        _hover={{ backgroundColor: 'gray.100', transition: '0.3s' }}
        h='130px'
        justify='start'
        onClick={onOpen}
        px='16px'
        py='12px'
        shadow='md'
        spacing='8px'
        w='250px'
      >
        <HStack align='center' justify='space-between'>
          <Text
            fontSize='md'
            fontWeight='semibold'
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
          >
            {course.title}
          </Text>
        </HStack>
        <Stack px='4px' spacing='8px'>
          <HStack spacing='9px'>
            <Text
              color='gray.600'
              fontSize='xs'
              maxW='100px'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
            >
              {course.creditCategory}
            </Text>
            <Text color='gray.600' fontSize='xs'>
              {`${course.credits}単位`}
            </Text>
          </HStack>
          <HStack spacing='9px'>
            <Text color='gray.600' fontSize='xs'>
              {TIMETABLE_DAYS.jp[course.day]}
            </Text>
            <Text color='gray.600' fontSize='xs'>
              {course.startPeriod === course.endPeriod
                ? `${course.startPeriod + 1} 限`
                : `${course.startPeriod + 1} - ${course.endPeriod + 1} 限`}
            </Text>
          </HStack>
          <HStack spacing='9px'>
            <Text
              color='gray.600'
              fontSize='xs'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
            >
              {course.instructor}
            </Text>
          </HStack>
        </Stack>
      </Stack>

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
            科目候補編集
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
                    {/* <Select id='creditCategory' {...SelectItemProps} {...register('creditCategory')}>
                  {Object.values(DEFAULT_CRESITS_CAGEGORIES.jp).map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </Select> */}
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
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
