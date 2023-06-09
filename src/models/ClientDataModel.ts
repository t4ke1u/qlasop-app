import { ClassModel } from "./ClassModel"
import { TimeTableCellModel } from "./timetable/TimeTableCellModel"
import { TimeTablePeriodLabelModel } from "./timetable/TimeTableLabelModel"

export type ClientDataModel = {
  classes: Array<TimeTableCellModel>
  stagedClasses: Array<ClassModel>
  setting: {
    tableTitle: string
    periodLabels: Array<TimeTablePeriodLabelModel>
  }
}
