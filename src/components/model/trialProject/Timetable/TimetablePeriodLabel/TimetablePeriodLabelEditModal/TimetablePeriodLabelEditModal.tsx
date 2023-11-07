'use client'

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
  Stack,
} from '@chakra-ui/react'

import { useTrialProjectUsecase } from '@/usecases/trialProject/usecase'

import { usePeriodLabelForm } from './TimetablePeriodLabelEditModal.hooks'

import type { PeriodLabelSchemaType } from './TimetablePeriodLabelEditModal.hooks'
import type { PeriodLabel } from '@/models/trialProject/type'
import type { InputProps } from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  periodLabel: PeriodLabel
}

const InputItemProps: InputProps = {
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

export const TimetablePeriodLabelEditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  periodLabel,
}) => {
  const { updatePeriodLabel } = useTrialProjectUsecase()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = usePeriodLabelForm(periodLabel)

  const submit = async (data: PeriodLabelSchemaType) => {
    try {
      updatePeriodLabel(data)
    } catch (e) {
      console.log(e)
    } finally {
      onClose()
    }
  }

  return (
    <Modal
      allowPinchZoom={true}
      autoFocus={false}
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxH='90vh' maxW='90vw' p={2} w='450px'>
        <ModalHeader color='gray.800' fontSize='md' fontWeight='medium'>
          時間編集
        </ModalHeader>
        <ModalBody>
          <form>
            <Stack direction='column' gap={2}>
              {/* 開始時刻 */}
              <FormControl isInvalid={!!errors.startTime}>
                <Flex align='center' gap={5}>
                  <FormLabel
                    color='gray.500'
                    fontSize='sm'
                    htmlFor='instructor'
                    m={0}
                    textAlign='right'
                    w={14}
                  >
                    開始時刻
                  </FormLabel>
                  <Input
                    id='instructor'
                    type='time'
                    {...InputItemProps}
                    {...register('startTime')}
                  />
                </Flex>
              </FormControl>

              {/* 終了時刻 */}
              <FormControl isInvalid={!!errors.endTime}>
                <Flex align='center' gap={5}>
                  <FormLabel
                    color='gray.500'
                    fontSize='sm'
                    htmlFor='instructor'
                    m={0}
                    textAlign='right'
                    w={14}
                  >
                    終了時刻
                  </FormLabel>
                  <Input id='instructor' type='time' {...InputItemProps} {...register('endTime')} />
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
              onClose()
              reset(periodLabel)
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
            onClick={handleSubmit(submit)}
            px={5}
            py={1}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
