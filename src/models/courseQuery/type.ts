export type CourseQueryItem = {
  display: string
  value: string
}

export type CourseQueryGetResponse = {
  campuses: CourseQueryItem[]
  courseCategories: { [key: string]: CourseQueryItem[] }
  creditCategories: { [key: string]: CourseQueryItem[] }
  days: CourseQueryItem[]
  eligibleYears: CourseQueryItem[]
  faculties: CourseQueryItem[]
  mainLangs: CourseQueryItem[]
  periods: CourseQueryItem[]
  terms: CourseQueryItem[]
  years: CourseQueryItem[]
}

export type CourseQuery = {
  campus?: string
  courseCategory?: string
  creditCategory?: string
  day?: string
  eligibleYear?: string
  faculty?: string
  keyword?: string
  mainLang?: string
  period?: string
  term?: string
  year: string
}
