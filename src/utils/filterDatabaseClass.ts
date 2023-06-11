import { DatabaseClassModel } from "@/models/DatabaseClassModel"

export const filterDatabaseClass = async (
  databaseClassArray: Array<DatabaseClassModel>,
  query: {
    faculty?: number
    grade?: number
    term?: number
    keyword?: string
    status?: Array<number>
    day?: Array<number>
    periods?: Array<number>
    attribute?: Array<string>
    category?: Array<number>
  },
) => {
  const filteredArray: Array<DatabaseClassModel> = databaseClassArray.filter((databaseClass) => {
    const { faculty, grade, term, keyword, status, day, periods, attribute, category } = query
    const stringList =
      databaseClass.subjectNameJp +
      databaseClass.subjectNameEn +
      databaseClass.classNameJp +
      databaseClass.classNameEn +
      databaseClass.attribute +
      (!!databaseClass.teachers && databaseClass.teachers)

    if (
      (!!faculty && databaseClass.faculty !== faculty) ||
      (!!grade && databaseClass.grade !== grade) ||
      (!!term && databaseClass.term !== term) ||
      (!!keyword && !stringList.includes(keyword)) ||
      (!!status && status.length !== 0 && !status.includes(databaseClass.status)) ||
      (!!day && day.length !== 0 && !day.includes(databaseClass.day)) ||
      (!!periods && periods.length !== 0 && !periods.includes(databaseClass.day)) ||
      (!!attribute && attribute.length !== 0 && !attribute.includes(databaseClass.attribute)) ||
      (!!category && category.length !== 0 && !category.includes(databaseClass.category))
    ) {
      return false
    }
    return true
  })
  return filteredArray
}
