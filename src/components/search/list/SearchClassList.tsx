"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

import SearchClassCell from "./SearchClassCell"
import Toggle from "@/components/common/toggle"
import { ATTRIBUTES } from "@/constants/attributes"
import { CATEGORIES } from "@/constants/categories"
import { DAYS } from "@/constants/days"
import { PERIODS } from "@/constants/periods"
import { DatabaseClassModel } from "@/models/DatabaseClassModel"
import { filterDatabaseClass } from "@/utils/filterDatabaseClass"

type Props = {
  databaseClassArray: Array<DatabaseClassModel>
  faculty: number
}

type QueryType = {
  keyword: string
  status: Array<number>
  day: Array<number>
  periods: Array<number>
  attribute: Array<string>
  category: Array<number>
}

const SearchClassList = ({ databaseClassArray, faculty }: Props) => {
  const [query, setQuery] = useState<QueryType>({
    keyword: "",
    status: [],
    day: [],
    periods: [],
    attribute: [],
    category: [],
  })
  const [filteredClassArray, setFilteredClassArray] = useState<Array<DatabaseClassModel>>([])

  useEffect(() => {
    const action = async () => {
      setFilteredClassArray(await filterDatabaseClass(databaseClassArray, query))
    }
    action()
    console.log(query)
  }, [databaseClassArray, query])

  return (
    <div className={`flex flex-col gap-2 ${databaseClassArray.length === 0 ? "hidden" : ""}`}>
      <Accordion.Root
        type="single"
        className="rounded-md p-4 outline outline-1 outline-gray-200"
        collapsible
      >
        <Accordion.Item value="filter" className="">
          <Accordion.Header className="flex">
            <Accordion.Trigger className="flex flex-1 items-center justify-between text-sm font-medium text-gray-500">
              フィルター
              <ChevronDownIcon className="transition-transform" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="flex flex-col gap-2 pt-7">
            <div className="flex items-center gap-5 py-1">
              <div className="w-20 text-right text-xs text-gray-500">キーワード</div>
              <input
                className="inline-block h-9 w-full flex-1 items-center rounded p-2 text-sm text-gray-800 shadow-[0_0_0_1px_rgba(0,0,0,0)] shadow-blue-500 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.3)]"
                onChange={(e) =>
                  setQuery((prev) => {
                    const { keyword: prevKeyword, ...rest } = prev
                    return { keyword: e.target.value, ...rest }
                  })
                }
              />
            </div>
            <div className="flex items-start gap-5 py-1">
              <div className="w-20 text-right text-xs text-gray-500">曜日</div>
              <div className="flex flex-1 flex-wrap gap-5">
                {Object.keys(DAYS.jp).map((value) => {
                  return (
                    <Toggle
                      key={value}
                      toggleOn={() =>
                        setQuery((prev) => {
                          const { day: prevDays, ...rest } = prev
                          const newDays = prevDays.concat([Number(value)])
                          return { day: newDays, ...rest }
                        })
                      }
                      toggleOff={() =>
                        setQuery((prev) => {
                          const { day: prevDays, ...rest } = prev
                          const newDays = prevDays.filter((day) => {
                            return day !== Number(value)
                          })
                          return { day: newDays, ...rest }
                        })
                      }
                    >
                      {DAYS.jp[Number(value)]}
                    </Toggle>
                  )
                })}
              </div>
            </div>
            <div className="flex items-start gap-5 py-1">
              <div className="w-20 text-right text-xs text-gray-500">時限</div>
              <div className="flex flex-1 flex-wrap gap-5">
                {Object.keys(PERIODS.jp).map((value) => {
                  return (
                    <Toggle
                      key={value}
                      toggleOn={() =>
                        setQuery((prev) => {
                          const { periods: prevPeriods, ...rest } = prev
                          const newPeriods = prevPeriods.concat([Number(value)])
                          return { periods: newPeriods, ...rest }
                        })
                      }
                      toggleOff={() =>
                        setQuery((prev) => {
                          const { periods: prevPeriods, ...rest } = prev
                          const newPeriods = prevPeriods.filter((period) => {
                            return period !== Number(value)
                          })
                          return { periods: newPeriods, ...rest }
                        })
                      }
                    >
                      {PERIODS.jp[Number(value)]}
                    </Toggle>
                  )
                })}
              </div>
            </div>
            <div className="flex items-start gap-5 py-1">
              <div className="w-20 text-right text-xs text-gray-500">学科など</div>
              <div className="flex flex-1 flex-wrap gap-5">
                {ATTRIBUTES[faculty].map((value) => {
                  return (
                    <Toggle
                      key={value}
                      toggleOn={() =>
                        setQuery((prev) => {
                          const { attribute: prevAttributes, ...rest } = prev
                          const newAttributes = prevAttributes.concat([value])
                          return { attribute: newAttributes, ...rest }
                        })
                      }
                      toggleOff={() =>
                        setQuery((prev) => {
                          const { attribute: prevAttributes, ...rest } = prev
                          const newAttributes = prevAttributes.filter((attribute) => {
                            return attribute !== value
                          })
                          return { attribute: newAttributes, ...rest }
                        })
                      }
                    >
                      {value}
                    </Toggle>
                  )
                })}
              </div>
            </div>
            <div className="flex items-start gap-5 py-1">
              <div className="w-20 text-right text-xs text-gray-500">科目区分</div>
              <div className="flex flex-1 flex-wrap gap-5">
                {Object.keys(CATEGORIES.jp).map((value) => {
                  return (
                    <Toggle
                      key={value}
                      toggleOn={() =>
                        setQuery((prev) => {
                          const { category: prevCategories, ...rest } = prev
                          const newCategories = prevCategories.concat([Number(value)])
                          return { category: newCategories, ...rest }
                        })
                      }
                      toggleOff={() =>
                        setQuery((prev) => {
                          const { category: prevCategories, ...rest } = prev
                          const newCategories = prevCategories.filter((category) => {
                            return category !== Number(value)
                          })
                          return { category: newCategories, ...rest }
                        })
                      }
                    >
                      {CATEGORIES.jp[Number(value)]}
                    </Toggle>
                  )
                })}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      {filteredClassArray.map((classData, index) => {
        return <SearchClassCell key={index} databaseClass={classData} />
      })}
    </div>
  )
}

export default SearchClassList
