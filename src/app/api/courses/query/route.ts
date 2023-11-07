import { supabase } from '@/libs/supabase'

import type { CourseQueryItem } from '@/models/courseQuery/type'

export const GET = async () => {
  // 日本語
  const { data: yearData } = await supabase.from('course-year').select('id')
  const { data: facultyData } = await supabase.from('course-faculty').select('id, jp')
  const { data: courseCategoryData } = await supabase
    .from('course-category')
    .select('id, faculty_id, jp')
  const { data: creditCategoryData } = await supabase
    .from('course-credit-category')
    .select('id, faculty_id, jp')
  const { data: termData } = await supabase.from('course-term').select('id, jp')
  const { data: dayData } = await supabase.from('course-day').select('id, jp')
  const { data: periodData } = await supabase.from('course-period').select('id, jp')
  const { data: campusData } = await supabase.from('course-campus').select('id, jp')
  const { data: mainLangData } = await supabase.from('course-main-language').select('id, jp')
  const { data: eligibleYearData } = await supabase.from('course-eligible-year').select('id')

  const years: CourseQueryItem[] = yearData!.map((d) => ({ display: `${d.id}年度`, value: d.id }))
  const faculties: CourseQueryItem[] = facultyData!
    .map((d) => ({ display: d.jp, value: d.id }))
    .sort((a, b) => a.value - b.value)
  faculties.unshift({ display: '', value: '' })
  const courseCategories: { [key: string]: CourseQueryItem[] } = {}
  courseCategoryData?.forEach(({ id, faculty_id, jp }) => {
    if (courseCategories[faculty_id]) {
      courseCategories[faculty_id].push({ display: jp, value: id })
    } else {
      courseCategories[faculty_id] = [
        { display: '', value: '' },
        { display: jp, value: id },
      ]
    }
  })
  const creditCategories: { [key: string]: CourseQueryItem[] } = {}
  creditCategoryData?.forEach(({ id, faculty_id, jp }) => {
    if (creditCategories[faculty_id]) {
      creditCategories[faculty_id].push({ display: jp, value: id })
    } else {
      creditCategories[faculty_id] = [
        { display: '', value: '' },
        { display: jp, value: id },
      ]
    }
  })
  const terms: CourseQueryItem[] = termData!.map((d) => ({ display: d.jp, value: d.id }))
  terms.unshift({ display: '', value: '' })
  const days: CourseQueryItem[] = dayData!.map((d) => ({ display: d.jp, value: d.id }))
  days.unshift({ display: '', value: '' })
  const periods: CourseQueryItem[] = periodData!.map((d) => ({ display: d.jp, value: d.id }))
  periods.unshift({ display: '', value: '' })
  const campuses: CourseQueryItem[] = campusData!.map((d) => ({
    display: d.jp,
    value: d.id,
  }))
  campuses.unshift({ display: '', value: '' })
  const mainLangs: CourseQueryItem[] = mainLangData!.map((d) => ({
    display: d.jp,
    value: d.id,
  }))
  mainLangs.unshift({ display: '', value: '' })
  const eligibleYears: CourseQueryItem[] = eligibleYearData!.map((d) => ({
    display: `${d.id}年以上`,
    value: d.id,
  }))
  eligibleYears.unshift({ display: '', value: '' })

  return Response.json({
    campuses,
    courseCategories,
    creditCategories,
    days,
    eligibleYears,
    faculties,
    mainLangs,
    periods,
    terms,
    years,
  })
}
