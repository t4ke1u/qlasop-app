'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

import { usePeriodLabelForm } from './EditModal.hooks'

type Props = {
  isOpen: boolean
  onClose: () => void
  index: number
}

const InputItemProps: InputProps = {
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

export const EditModal: React.FC<Props> = ({ isOpen, onClose, index }) => {
  const { register, onSubmit, reset, errors } = usePeriodLabelForm(index)

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent p={2} maxH='90vh' w='450px' maxW='90vw'>
        <ModalHeader fontSize='md' fontWeight='medium' color='gray.800'>
          時間編集
        </ModalHeader>
        <ModalBody>
          <form>
            <Stack direction='column' gap={2}>
              {/* 開始時刻 */}
              <FormControl isInvalid={!!errors.startTime}>
                <Flex align='center' gap={5}>
                  <FormLabel
                    htmlFor='instructor'
                    w={14}
                    m={0}
                    textAlign='right'
                    fontSize='sm'
                    color='gray.500'
                  >
                    開始時刻
                  </FormLabel>
                  <Input id='instructor' type='time' {...InputItemProps} {...register.startTime} />
                </Flex>
              </FormControl>

              {/* 終了時刻 */}
              <FormControl isInvalid={!!errors.endTime}>
                <Flex align='center' gap={5}>
                  <FormLabel
                    htmlFor='instructor'
                    w={14}
                    m={0}
                    textAlign='right'
                    fontSize='sm'
                    color='gray.500'
                  >
                    終了時刻
                  </FormLabel>
                  <Input id='instructor' type='time' {...InputItemProps} {...register.endTime} />
                </Flex>
              </FormControl>
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
              onClose()
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
            onClick={onSubmit(onClose)}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
