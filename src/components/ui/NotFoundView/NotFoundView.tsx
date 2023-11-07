import { Icon, Stack, Text } from '@chakra-ui/react'
import { RxQuestionMark } from 'react-icons/rx'

export const NotFoundView = () => {
  return (
    <Stack align='center' h='full' justify='center' spacing='20px' w='full'>
      <Icon as={RxQuestionMark} boxSize='80px' color='gray.500' />
      <Text color='gray.500' fontSize='lg' fontWeight='medium'>
        ページが見つかりません
      </Text>
    </Stack>
  )
}
