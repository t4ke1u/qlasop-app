import { Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const ListItem = ({ label, content }: { label: ReactNode; content: ReactNode }) => {
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
