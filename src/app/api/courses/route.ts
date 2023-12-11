import { NextResponse } from 'next/server'

import { supabase } from '@/libs/supabase'

import type { AbstractCourse } from '@/models/course/type'
import type { CourseQuery } from '@/models/courseQuery/type'
import type { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const body: CourseQuery = await request.json()
  const query = `year.eq.${body.year}${body.campus !== '' ? `, campus.eq.${body.campus}` : ''}${
    body.courseCategory !== '' ? `, course_category.cs.{${body.courseCategory}}` : ''
  }${body.creditCategory !== '' ? `, credit_category.eq.${body.creditCategory}` : ''}${
    body.day !== '' ? `, day.eq.${body.day}` : ''
  }${body.eligibleYear !== '' ? `, eligible_year.eq.${body.eligibleYear}` : ''}${
    body.faculty !== '' ? `, faculty.eq.${body.faculty}` : ''
  }${body.keyword !== '' ? `, title_jp.like.%${body.keyword}%` : ''}${
    body.mainLang !== '' ? `, main_language.eq.${body.mainLang}` : ''
  }${body.period !== '' ? `, start_period.lte.${body.period}, end_period.gte.${body.period}` : ''}${
    body.term !== '' ? `, term.eq.${body.term}` : ''
  }`
  // 日本語
  const { data: coursesData } = await supabase
    .from('courses')
    .select(
      'id, title_jp, faculty, term, day, start_period, end_period, instructor_jp, credit_category, credits',
    )
    .or(`and(${query})`)
    .limit(2500)

  if (!coursesData) {
    return NextResponse.json({ courses: [] })
  }

  const { data: facultyData } = await supabase.from('course-faculty').select('id, jp')
  const { data: periodData } = await supabase.from('course-period').select('id, jp')
  const { data: dayData } = await supabase.from('course-day').select('id, jp')
  const { data: termData } = await supabase.from('course-term').select('id, jp')
  const { data: creditCategoryData } = await supabase
    .from('course-credit-category')
    .select('id, jp')
  const courses: AbstractCourse[] = coursesData.map((courseData) => ({
    course: {
      creditCategory: courseData.credit_category
        ? creditCategoryData?.filter((d) => d.id === courseData.credit_category)[0].jp
        : '',
      credits: courseData.credits,
      day: courseData.day,
      endPeriod: courseData.end_period,
      instructor: courseData.instructor_jp,
      startPeriod: courseData.start_period,
      title: courseData.title_jp,
    },
    creditCategory: courseData.credit_category
      ? creditCategoryData?.filter((d) => d.id === courseData.credit_category)[0].jp
      : '',
    credits: `${courseData.credits}単位`,
    day: dayData?.filter((d) => d.id === courseData.day)[0].jp,
    faculty: facultyData?.filter((d) => d.id === courseData.faculty)[0].jp,
    id: courseData.id,
    instructor: courseData.instructor_jp,
    period:
      courseData.start_period === courseData.end_period
        ? periodData?.filter((d) => d.id === courseData.start_period)[0].jp
        : `${periodData?.filter((d) => d.id === courseData.start_period)[0].jp} - ${
            periodData?.filter((d) => d.id === courseData.end_period)[0].jp
          }`,
    term: termData?.filter((d) => d.id === courseData.term)[0].jp,
    title: courseData.title_jp,
  }))

  return NextResponse.json({ courses })
}
