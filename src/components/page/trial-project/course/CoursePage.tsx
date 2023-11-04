'use client'
import { HStack, Stack, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

import { LoadingView } from '@/components/ui/LoadingView'
import { NotFoundView } from '@/components/ui/NotFoundView'
import { useCourse } from '@/usecases/course/reader'

import { AddCourseTimetableButton } from './AddCourseTimetableButton'

export const CoursePage = () => {
  const { courseId } = useParams()
  const { data } = useCourse(typeof courseId !== 'object' ? courseId : courseId[0])

  if (!data) {
    return <LoadingView />
  }

  if (!data.detailCourse) {
    return <NotFoundView />
  }

  return (
    <Stack spacing='8px'>
      <Text color='gray.500' fontSize='sm' fontWeight='bold'>
        {data.detailCourse.year}
      </Text>
      <HStack align='center' justify='space-between'>
        <Text fontSize='2xl' fontWeight='bold'>
          {data.detailCourse.title}
        </Text>
        <HStack spacing='16px'>
          <AddCourseTimetableButton course={data.detailCourse.course} />
        </HStack>
      </HStack>
      <Text color='gray.500' fontSize='sm' fontWeight='bold'>
        基本情報
      </Text>
      <Stack px='20px' spacing='8px'>
        <Text color='gray.700' fontSize='md'>
          {data.detailCourse.instructor}
        </Text>
        <HStack spacing='16px'>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.term}
          </Text>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.day}
          </Text>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.period}
          </Text>
        </HStack>
        <HStack spacing='16px'>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.faculty}
          </Text>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.creditCategory}
          </Text>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.credit}
          </Text>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.eligibleYear}
          </Text>
        </HStack>
        <HStack spacing='16px'>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.campus}
          </Text>
          <Text color='gray.700' fontSize='md'>
            {data.detailCourse.classRoom}
          </Text>
        </HStack>
        <ChakraLink
          _visited={{ color: 'purple.500' }}
          as={Link}
          color='blue.500'
          href={data.detailCourse.url}
          target='_blank'
        >
          {data.detailCourse.url}
        </ChakraLink>
      </Stack>
      <Text color='gray.500' fontSize='sm' fontWeight='bold'>
        授業概要
      </Text>
      <Stack px='20px'>
        <Text color='gray.700' fontSize='md'>
          {data.detailCourse.outline}
        </Text>
      </Stack>
      <Text color='gray.500' fontSize='sm' fontWeight='bold'>
        授業目標
      </Text>
      <Stack px='20px'>
        <Text color='gray.700' fontSize='md'>
          {data.detailCourse.objective}
        </Text>
      </Stack>
    </Stack>
  )
}
