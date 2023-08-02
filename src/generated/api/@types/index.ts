import { CourseClass } from '@/models/courseClass/type'

export type CourseClassResponse = CourseClass

export type CourseClassQueryRequest = {
  year?: number
  term: Array<number>
  faculty: number
  courseCategoryJp?: string
  courseCategoryEn?: string
  eligibleYear: Array<number>
}
