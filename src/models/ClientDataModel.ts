import { ClassModel } from "./ClassModel"
import { TimeTableClassModel } from "./timetable/TimeTableClassModel"
import { TimeTablePeriodLabelModel } from "./timetable/TimeTableLabelModel"

export type ClientDataModel = {
  classes: Array<TimeTableClassModel>
  stagedClasses: Array<ClassModel>
  setting: {
    tableTitle: string
    periodLabels: Array<TimeTablePeriodLabelModel>
    dayLabels: Array<string>
  }
}
