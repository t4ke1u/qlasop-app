import { CheckBox } from "@/components/common/checkbox"
import TimeTableClassAddDialog from "@/components/timetable/dialog/TimeTableClassAddDialog"
import { CATEGORIES } from "@/constants/categories"
import { DAYS } from "@/constants/days"
import { FACULTIES } from "@/constants/faculties"
import { PERIODS } from "@/constants/periods"
import { TERMS } from "@/constants/terms"
import { DatabaseClassModel } from "@/models/DatabaseClassModel"
import { TimeTableDialogCellModel } from "@/models/timetable/TimeTableDialogCellModel"

type Props = {
  databaseClass: DatabaseClassModel
}

const SearchClassCell = ({ databaseClass }: Props) => {
  const convertDatabaseClass = (): TimeTableDialogCellModel => {
    return {
      class: {
        subjectName: databaseClass.subjectNameJp,
        day: databaseClass.day,
        startPeriod: databaseClass.startPeriod,
        endPeriod: databaseClass.endPeriod,
        faculty: databaseClass.faculty,
        unit: databaseClass.unit,
        category: databaseClass.category,
      },
      color: "gray",
    }
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-2 outline outline-1 outline-gray-200">
      <div className="flex items-center justify-start gap-4">
        <div className="flex flex-col gap-2">
          {/* 1行目 */}
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-500 md:text-base">
              {databaseClass.subjectNameJp}
            </div>
            <div className="text-sm font-medium text-gray-500 md:text-base">
              {databaseClass.classNameJp}
            </div>
          </div>
          {/* 2行目 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="text-xs font-medium text-gray-500">{TERMS.jp[databaseClass.term]}</div>
            <div className="text-xs font-medium text-gray-500">
              {FACULTIES.jp[databaseClass.faculty]}
            </div>
            <div className="text-xs font-medium text-gray-500">{`${databaseClass.grade}年以上`}</div>
            <div className="text-xs font-medium text-gray-500">{databaseClass.attribute}</div>
            <div className="text-xs font-medium text-gray-500">
              {CATEGORIES.jp[databaseClass.category]}
            </div>
          </div>
          {/* 3行目 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="text-xs font-medium text-gray-500">{`単位数: ${databaseClass.unit}`}</div>
            <div className="text-xs font-medium text-gray-500">{`曜日: ${
              DAYS.jp[databaseClass.day]
            }`}</div>
            <div className="text-xs font-medium text-gray-500">
              {databaseClass.startPeriod === databaseClass.endPeriod
                ? `時限: ${PERIODS.jp[databaseClass.startPeriod]}`
                : `時限: ${databaseClass.startPeriod + 1} - ${databaseClass.endPeriod + 1} 限`}
            </div>
          </div>
        </div>
      </div>
      <TimeTableClassAddDialog cellData={convertDatabaseClass()}>
        <button className="ml-7 inline-flex h-9 max-w-[100px] items-center justify-center rounded bg-blue-100 px-5 py-1 text-sm font-medium leading-none text-blue-800 hover:bg-blue-200">
          追加
        </button>
      </TimeTableClassAddDialog>
    </div>
  )
}

export default SearchClassCell
