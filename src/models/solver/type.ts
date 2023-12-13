import type { Course } from '@/models/course/type'

export type RequiredCredits = { creditCategory: string; credits: number }[]

export type FreetimePeriods = { day: number; period: number }[]

export type SolverType = 'AMPLIFY_AE' | 'QUBO_SA' | 'NO_QUBO_SA'

export type SolverRequest = {
  courses: Course[]
  freetimePeriods: FreetimePeriods
  requiredCredits: RequiredCredits
  solverType: SolverType
  stageCourses: Course[]
}
