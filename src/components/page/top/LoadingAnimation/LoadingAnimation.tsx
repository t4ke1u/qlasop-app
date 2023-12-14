'use client'

import { Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const LoadingAnimation = () => {
  const text = '量子技術で時間割作成をもっと気軽に'
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <Flex
      align='center'
      animate={{ opacity: 0, transition: { delay: 4, duration: 0.5 } }}
      as={motion.div}
      bg='white'
      h='full'
      initial={{ opacity: 1 }}
      justify='center'
      w='full'
    >
      <motion.text>
        {text.split('').map((char, index) => (
          <Text
            animate={{
              opacity: [0, 1, 0],
              transition: { delay: 0.1 * index, duration: 3 - 0.1 * index },
            }}
            as={motion.text}
            fontSize='3xl'
            key={index}
            opacity={0}
          >
            {char}
          </Text>
        ))}
      </motion.text>
    </Flex>
  )
}
