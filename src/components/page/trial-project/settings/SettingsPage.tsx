import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

import { ImportantPanel } from './ImportantPanel'

export const SettingsPage = () => {
  return (
    <Stack maxH='calc(100vh - 80px)' overflow='auto' p='20px'>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton gap='md'>
            <HStack align='center' px='20px' py='10px' spacing='20px'>
              <AccordionIcon boxSize='30px' />
              <Text fontSize='lg' fontWeight='semibold'>
                重要
              </Text>
            </HStack>
          </AccordionButton>
          <ImportantPanel />
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}
