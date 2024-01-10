import type { Course } from '@/models/course/type'

export type RequiredCredits = { creditCategory: string; credits: number }[]

export type FreetimePeriods = { day: number; period: number }[]

export type SolverType = 'AMPLIFY_AE' | 'QUBO_SA' | 'NO_QUBO_SA'

export type SolveRequestCache = {
  freetimePeriods: FreetimePeriods
  requiredCredits: RequiredCredits
  solverType: SolverType
}

export type SolveRequest = SolveRequestCache & {
  currentCourses: Course[]
  stageCourses: Course[]
}

export type SolveResult = {
  assignedCourses: Course[]
  credits: RequiredCredits
  currentCourses: Course[]
  energy: number
  executionTime: number
  freetimePeriods: FreetimePeriods
  isSatisfaction: boolean
  solverType: SolverType
}

export type SolveResponse = { solveResult: SolveResult }
