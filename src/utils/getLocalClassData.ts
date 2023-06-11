import { DatabaseClassModel } from "@/models/DatabaseClassModel"

export const getLocalClassData = async (): Promise<Array<DatabaseClassModel>> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/class_data.json`)
  const dataArray = await res.json()
  const classDataArray: Array<DatabaseClassModel> = dataArray.map((data: any) => {
    const { classNameJp, classNameEn, campus, teachers, ...rest } = data
    return {
      classNameJp: classNameJp !== "" ? classNameJp : undefined,
      classNameEn: classNameEn !== "" ? classNameEn : undefined,
      campus: campus !== "" ? Number(campus) : undefined,
      teachers: teachers !== "" ? teachers : undefined,
      ...rest,
    }
  })
  return classDataArray
}
