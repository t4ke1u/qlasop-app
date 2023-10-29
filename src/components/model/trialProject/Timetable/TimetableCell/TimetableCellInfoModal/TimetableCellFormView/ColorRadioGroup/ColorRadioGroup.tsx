import { Flex, Wrap, Button, Text, Box } from '@chakra-ui/react'
import { useState } from 'react'

import { COLORS } from '@/constants/project'

import type { CellColor } from '@/models/trialProject/type'
import type { ButtonProps } from '@chakra-ui/react'

type ColorRadioGroupProps = {
  defaultColor?: CellColor
  onChange?: (color: CellColor) => void
}

export const ColorRadioGroup = ({ defaultColor, onChange }: ColorRadioGroupProps) => {
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
