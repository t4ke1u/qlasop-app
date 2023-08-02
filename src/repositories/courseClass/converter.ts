import { CourseClassResponse } from '@/generated/api/@types'
import { CourseClass } from '@/models/courseClass/type'

export const convertCourseClassFromResponse = (data: CourseClassResponse): CourseClass => {
  return data
}
