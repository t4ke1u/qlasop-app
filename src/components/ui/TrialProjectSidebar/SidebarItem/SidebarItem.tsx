'use client'

import { HStack, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { IconType } from 'react-icons'

type Props = {
  color: string
  href?: string
  icon: IconType
  name: string
}

export const SidebarItem: React.FC<Props> = ({ icon, name, href, color }) => {
  const pathname = usePathname()
  const selected = href ? pathname.includes(href) : false

  const item = (
    <HStack
      _hover={{ color: `${color}.400` }}
      align='center'
      fontWeight={selected ? 'semibold' : 'normal'}
      gap='16px'
      px='10px'
      py='14px'
    >
      <Icon as={icon} size='14px' />
      <Text cursor='pointer' fontSize='sm'>
        {name}
      </Text>
    </HStack>
  )

  return href ? <Link href={href}>{item}</Link> : item
}
