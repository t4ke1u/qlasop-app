import type { Course } from '@/models/course/type'

export type TrialProject = {
  cells: Cell[]
  periodLabels: PeriodLabel[]
  staged: Course[]
}

export type Cell = Course & {
  /*
    color(string): セルの色
    clientMemo?(string): メモ
  */
  clientMemo?: string
  color: CellColor
}

export type CellColor =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'pink'

export type PeriodLabel = {
  endTime: string
  index: number
  startTime: string
}
