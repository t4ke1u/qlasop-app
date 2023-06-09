export type TimeTableDialogCellModel = {
  class?: {
    subjectName?: string
    day?: number
    startPeriod?: number
    endPeriod?: number
    teachers?: string
    faculty?: number
    unit?: number
    category?: number
    link?: {
      subjectKey: string
      classCode: string
    }
  }
  color?: string
  clientMemo?: string
}
