"use client"

import { useState } from "react"

import { Select, SelectItem } from "../common/select"
import SearchClassList from "./list/SearchClassList"
import { FACULTIES } from "@/constants/faculties"
import { TERMS } from "@/constants/terms"
import { DatabaseClassModel } from "@/models/DatabaseClassModel"
import { filterDatabaseClass } from "@/utils/filterDatabaseClass"
import { getLocalClassData } from "@/utils/getLocalClassData"
import { ValidationSearchFilterModel, useSearchFilterForm } from "@/utils/useSearchFIlterForm"

const SearchLayout = () => {
  const { register, handleSubmit, convertFormData } = useSearchFilterForm()
  const [databaseClassArray, setDatabaseClassArray] = useState<Array<DatabaseClassModel>>([])
  const [faculty, setFaculty] = useState(26)

  const onSubmit = handleSubmit(async (data: ValidationSearchFilterModel) => {
    const convertData = convertFormData(data)
    const databaseClassArray = await getLocalClassData()
    console.log(databaseClassArray)
    const filterredClassArray = await filterDatabaseClass(databaseClassArray, {
      faculty: convertData.faculty,
      grade: convertData.grade,
      term: convertData.term,
      status: [0, 1],
    })
    console.log(filterredClassArray)
    setFaculty(convertData.faculty)
    setDatabaseClassArray(filterredClassArray)
  })

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex flex-col gap-4 rounded-md p-4 outline outline-1 outline-gray-200"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-5 py-1">
            <div className="w-14 text-right text-sm text-gray-500">学部</div>
            <Select className="w-40" {...register("faculty")}>
              {Object.keys(FACULTIES.jp).map((value) => {
                return (
                  <SelectItem key={value} value={value}>
                    {FACULTIES.jp[Number(value)]}
                  </SelectItem>
                )
              })}
            </Select>
          </div>
          <div className="flex items-center gap-5 py-1">
            <div className="w-14 text-right text-sm text-gray-500">学年</div>
            <Select className="w-40" {...register("grade")}>
              {[1, 2, 3, 4].map((value) => {
                return (
                  <SelectItem key={value} value={`${value}`}>
                    {`${value}年以上`}
                  </SelectItem>
                )
              })}
            </Select>
          </div>
          <div className="flex items-center gap-5 py-1">
            <div className="w-14 text-right text-sm text-gray-500">学期</div>
            <Select className="w-40" {...register("term")}>
              {Object.keys(TERMS.jp).map((value) => {
                return (
                  <SelectItem key={value} value={value}>
                    {TERMS.jp[Number(value)]}
                  </SelectItem>
                )
              })}
            </Select>
          </div>
        </div>
        <button
          className="ml-7 inline-flex h-9 max-w-[100px] items-center justify-center rounded bg-blue-100 px-5 py-1 text-sm font-medium leading-none text-blue-800 hover:bg-blue-200"
          type="submit"
        >
          検索
        </button>
      </form>
      <SearchClassList databaseClassArray={databaseClassArray} faculty={faculty} />
    </div>
  )
}

export default SearchLayout
