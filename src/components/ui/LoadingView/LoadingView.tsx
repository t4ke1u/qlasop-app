import { CircularProgress, Flex } from '@chakra-ui/react'

export const LoadingView = () => {
  return (
    <Flex align='center' h='calc(100vh - 120px)' justify='center' w='full'>
      <CircularProgress color='cyan.300' isIndeterminate />
    </Flex>
  )
}
