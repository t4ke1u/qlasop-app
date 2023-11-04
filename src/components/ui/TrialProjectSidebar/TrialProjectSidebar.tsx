'use client'
import { Stack, Text } from '@chakra-ui/react'
import { RxGear, RxLightningBolt, RxMagnifyingGlass, RxTable } from 'react-icons/rx'

import { pagesPath } from '@/generated/$path'

import { SidebarItem } from './SidebarItem'

export const TrialProjectSidebar = () => {
  return (
    <Stack borderRight='1px' borderRightColor='gray.300' gap='8px' h='100vh' p='20px' w='200px'>
      <Stack gap='8px' py='8px'>
        <Text fontSize='xs' fontWeight='bold' px='10px'>
          Trial Project
        </Text>
        <SidebarItem
          color='red'
          href={pagesPath.trial_project.timetable.$url().pathname}
          icon={RxTable}
          name='Timetable'
        />
        <SidebarItem
          color='blue'
          href={pagesPath.trial_project.search.$url().pathname}
          icon={RxMagnifyingGlass}
          name='Search'
        />
        <SidebarItem color='green' icon={RxLightningBolt} name='Optimize' />
        <SidebarItem color='purple' icon={RxGear} name='Settings' />
      </Stack>
    </Stack>
  )
}