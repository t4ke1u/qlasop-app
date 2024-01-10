import { Heading, Link, Stack, Text } from '@chakra-ui/react'

import { pagesPath } from '@/generated/$path'

import { LoadingAnimation } from './LoadingAnimation'

export const TopPage = () => {
  return (
    <Stack align='center' h='100vh' justify='center' pos='relative' spacing='20px' w='100vw'>
      <Heading fontSize='6xl'>Qlasop</Heading>
      <Text fontSize='lg'>量子技術で時間割作成をもっと気軽に</Text>
      <Link
        _hover={{ bg: 'cyan.200', textDecoration: 'none' }}
        bg='cyan.100'
        color='cyan.500'
        fontWeight='semibold'
        href={pagesPath.trial_project.$url().pathname}
        isExternal
        px='20px'
        py='10px'
        rounded='md'
      >
        プロジェクトを始める
      </Link>

      <LoadingAnimation />
    </Stack>
  )
}
