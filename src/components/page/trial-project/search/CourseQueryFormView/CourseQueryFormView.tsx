import { FormLabel, HStack, Select, Stack, Text, Input, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { useCourseQueryCache } from '@/usecases/courseQuery/reader'
import { useCourseQueryCacheUsecase } from '@/usecases/courseQuery/usecase'

import { useCourseQueryForm } from './CourseQueryFormView.hooks'

import type { CourseQuerySchemaType } from './CourseQueryFormView.hooks'
import type { CourseQueryGetResponse } from '@/models/courseQuery/type'
import type { InputProps, SelectProps } from '@chakra-ui/react'

const SelectItemProps: SelectProps = {
  alignContent: 'center',
  color: 'gray.700',
  display: 'inline-block',
  fontSize: 'sm',
  fontWeight: 'medium',
  maxW: '250px',
  minW: '250px',
  rounded: 'base',
}

const InputItemProps: InputProps = {
  alignContent: 'center',
  color: 'gray.700',
  display: 'inline-block',
  fontSize: 'sm',
  fontWeight: 'medium',
  maxW: '250px',
  minW: '250px',
  rounded: 'base',
}

type Props = {
  data: CourseQueryGetResponse
  isLoading: boolean
}

export const CourseQueryFormView: React.FC<Props> = ({ data, isLoading }) => {
  const { courseQuery } = useCourseQueryCache()
  const { updateCourseQueryCache } = useCourseQueryCacheUsecase()
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useCourseQueryForm(data, courseQuery)
  const watchFaculty = watch('faculty')

  useEffect(() => {
    if (watchFaculty !== courseQuery?.faculty) {
      setValue('courseCategory', '')
      setValue('creditCategory', '')
    }
  }, [watchFaculty, setValue, courseQuery])

  const submit = async (query: CourseQuerySchemaType) => updateCourseQueryCache(query)

  return (
    <Stack
      borderRight='1px'
      borderRightColor='gray.300'
      maxH='calc(100vh - 120px)'
      minH='calc(100vh - 120px)'
      minW='400px'
      overflowY='auto'
      px='20px'
      spacing='8px'
    >
      <Text color='gray.400' fontSize='sm' fontWeight='bold' py='16px' w='60px'>
        検索条件
      </Text>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          年度
        </FormLabel>
        <Select id='year' {...SelectItemProps} {...register('year')}>
          {data.years.map((year, index) => (
            <option key={index} value={year.value}>
              {year.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          学部
        </FormLabel>
        <Select id='faculty' {...SelectItemProps} {...register('faculty')}>
          {data.faculties.map((faculty, index) => (
            <option key={index} value={faculty.value}>
              {faculty.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          科目区分
        </FormLabel>
        {data.courseCategories[watchFaculty] ? (
          <Select id='courseCategory' {...SelectItemProps} {...register('courseCategory')}>
            {data.courseCategories[watchFaculty].map((courseCategory, index) => (
              <option key={index} value={courseCategory.value}>
                {courseCategory.display}
              </option>
            ))}
          </Select>
        ) : (
          <Select {...SelectItemProps} disabled={true} />
        )}
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          単位区分
        </FormLabel>
        {data.creditCategories[watchFaculty] ? (
          <Select id='creditCategory' {...SelectItemProps} {...register('creditCategory')}>
            {data.creditCategories[watchFaculty].map((creditCategory, index) => (
              <option key={index} value={creditCategory.value}>
                {creditCategory.display}
              </option>
            ))}
          </Select>
        ) : (
          <Select {...SelectItemProps} disabled={true} />
        )}
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          配当学年
        </FormLabel>
        <Select id='eligibleYear' {...SelectItemProps} {...register('eligibleYear')}>
          {data.eligibleYears.map((eligibleYear, index) => (
            <option key={index} value={eligibleYear.value}>
              {eligibleYear.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          学期
        </FormLabel>
        <Select id='term' {...SelectItemProps} {...register('term')}>
          {data.terms.map((term, index) => (
            <option key={index} value={term.value}>
              {term.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          曜日
        </FormLabel>
        <Select id='day' {...SelectItemProps} {...register('day')}>
          {data.days.map((day, index) => (
            <option key={index} value={day.value}>
              {day.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          時限
        </FormLabel>
        <Select id='period' {...SelectItemProps} {...register('period')}>
          {data.periods.map((period, index) => (
            <option key={index} value={period.value}>
              {period.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          キャンパス
        </FormLabel>
        <Select id='campus' {...SelectItemProps} {...register('campus')}>
          {data.campuses.map((campus, index) => (
            <option key={index} value={campus.value}>
              {campus.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          使用言語
        </FormLabel>
        <Select id='mainLang' {...SelectItemProps} {...register('mainLang')}>
          {data.mainLangs.map((mainLang, index) => (
            <option key={index} value={mainLang.value}>
              {mainLang.display}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack align='center' spacing='md'>
        <FormLabel color='gray.700' fontSize='md' fontWeight='medium' m={0} minW='100px'>
          科目名
        </FormLabel>
        <Input id='keyword' {...InputItemProps} {...register('keyword')} />
      </HStack>
      <HStack justify='end' py='20px' spacing='20px'>
        <Button
          colorScheme='blackAlpha'
          onClick={() => {
            updateCourseQueryCache(undefined)
            reset({
              campus: '',
              courseCategory: '',
              creditCategory: '',
              day: '',
              eligibleYear: '',
              faculty: '',
              keyword: '',
              mainLang: '',
              period: '',
              term: '',
              year: data.years[0].value,
            })
          }}
          size='md'
          variant='outline'
        >
          クリア
        </Button>
        <Button
          _hover={{ backgroundColor: 'green.200' }}
          bg='green.100'
          color='teal.400'
          isLoading={isSubmitting || isLoading}
          minW='100px'
          onClick={handleSubmit(submit)}
          size='md'
        >
          検索
        </Button>
      </HStack>
    </Stack>
  )
}
