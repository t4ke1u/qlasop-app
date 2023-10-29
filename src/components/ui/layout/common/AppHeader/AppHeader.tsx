'use client'

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { RxChevronRight } from 'react-icons/rx'

export type BreadCrumb = {
  displayName: string
  href?: string
  isCurrentPage?: boolean
}

type Props = {
  breadcrumbs?: BreadCrumb[]
  children: React.ReactNode
  uid?: string
}

export const AppHeader: React.FC<Props> = ({ children, breadcrumbs, uid }) => {
  return (
    <Box minH='100vh'>
      <Flex align='center' borderBottom='1px' borderBottomColor='gray.300' minW='100vw'>
        <Text fontSize='lg' px='72px' py={7}>
          Qlasop
        </Text>
        <Breadcrumb
          fontSize='sm'
          fontWeight='bold'
          separator={<RxChevronRight color='gray.500' />}
          spacing={5}
        >
          {breadcrumbs?.map((breadcrumb, index) => (
            <BreadcrumbItem isCurrentPage={breadcrumb.isCurrentPage} key={index}>
              <BreadcrumbLink>
                {breadcrumb.href ? (
                  <Link href={breadcrumb.href}>{breadcrumb.displayName}</Link>
                ) : (
                  breadcrumb.displayName
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Flex>
      {children}
    </Box>
  )
}
