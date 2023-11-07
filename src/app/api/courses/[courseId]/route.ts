import { NextResponse } from 'next/server'

import { supabase } from '@/libs/supabase'

import type { DetailCourse } from '@/models/course/type'

export const GET = async (request: Request, { params }: { params: { courseId: string } }) => {
  // 日本語
  const { data: coursesData } = await supabase
    .from('courses')
    .select(
      'id, title_jp, year, term, day, start_period, end_period, faculty, credits, eligible_year, class_room_jp, credit_category, instructor_jp, outline, objectives, syllabus_url_jp, campus',
    )
    .eq('id', params.courseId)
  if (!coursesData || coursesData?.length !== 1) {
    return NextResponse.json({ detailCourse: undefined })
  }
  const {
    title_jp: title,
    year,
    term: termId,
    day: dayId,
    start_period: startPeriod,
    end_period: endPeriod,
    faculty: facultyId,
    credits,
    eligible_year: eligibleYear,
    class_room_jp: classRoom,
    credit_category: creditCategoryId,
    instructor_jp: instructor,
    outline,
    objectives,
    syllabus_url_jp: url,
    campus: campusId,
  } = coursesData[0]
  const { data: termData } = await supabase.from('course-term').select('jp').eq('id', termId)
  const { data: dayData } = await supabase.from('course-day').select('jp').eq('id', dayId)
  const { data: startPeriodData } = await supabase
    .from('course-period')
    .select('jp')
    .eq('id', startPeriod)
  const { data: endPeriodData } = await supabase
    .from('course-period')
    .select('jp')
    .eq('id', endPeriod)
  const { data: facultyData } = await supabase
    .from('course-faculty')
    .select('jp')
    .eq('id', facultyId)
  const { data: creditCategoryData } = await supabase
    .from('course-credit-category')
    .select('jp')
    .eq('id', creditCategoryId)
  const { data: campusData } = await supabase.from('course-campus').select('jp').eq('id', campusId)

  const detailCourse: DetailCourse = {
    campus: campusData ? campusData[0].jp : undefined,
    classRoom: classRoom ? classRoom : undefined,
    course: {
      creditCategory: creditCategoryData ? creditCategoryData[0].jp : '',
      credits: credits,
      day: dayId,
      endPeriod: endPeriod,
      instructor: instructor,
      startPeriod: startPeriod,
      title: title,
    },
    credit: `${credits}単位`,
    creditCategory: creditCategoryData ? creditCategoryData[0].jp : undefined,
    day: dayData![0].jp,
    eligibleYear: `${eligibleYear}年以上`,
    faculty: facultyData![0].jp,
    id: params.courseId,
    instructor: instructor ? instructor : undefined,
    objective: objectives ? objectives : undefined,
    outline: outline ? outline : undefined,
    period:
      startPeriod === endPeriod
        ? startPeriodData![0].jp
        : `${startPeriodData![0].jp} - ${endPeriodData![0].jp}`,
    term: termData![0].jp,
    title: title,
    url: url,
    year: `${year}年度`,
  }

  return NextResponse.json({ detailCourse })
}
