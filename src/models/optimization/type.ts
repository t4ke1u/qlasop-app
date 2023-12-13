import type { Course } from '@/models/course/type'

export type RequiredCredit = { creditCategory: string; credits: number }[]

export type FreetimePeriods = { day: number; period: number }[]

export type SolverType = 'AMPLIFY_AE' | 'QUBO_SA' | 'NO_QUBO_SA'

export type SolverRequest = {
  courses: Course[]
  freetimePeriods: FreetimePeriods
  requiredCredit: RequiredCredit
  solverType: SolverType
  stageCourses: Course[]
}
