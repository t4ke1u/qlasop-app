"use client"

import { useState } from "react"

import SearchLayout from "@/components/search/SearchLayout"
import TimeTableFrame from "@/components/timetable/TimeTableFrame"

type TabType = "timetable" | "search"

const TabLayout = () => {
  const [tab, setTab] = useState<TabType>("timetable")

  return (
    <div className="flex flex-col">
      <div className="mb-10 flex max-w-lg border-b-2 border-solid border-gray-200">
        <button
          className={`flex-1 select-none items-center justify-center py-3 text-sm hover:bg-blue-50 ${
            tab === "timetable"
              ? "relative font-medium text-blue-600 shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.6)] shadow-blue-600"
              : "text-gray-400"
          }`}
          onClick={() => setTab("timetable")}
        >
          時間割
        </button>
        <button
          className={`flex-1 select-none items-center justify-center py-3 text-sm hover:bg-green-50 ${
            tab === "search"
              ? "relative font-medium text-green-600 shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.6)] shadow-green-600"
              : "text-gray-400"
          }`}
          onClick={() => setTab("search")}
        >
          検索
        </button>
      </div>
      <div className={tab === "timetable" ? "" : "hidden"}>
        <TimeTableFrame />
      </div>
      <div className={tab === "search" ? "" : "hidden"}>
        <SearchLayout />
      </div>
    </div>
  )
}

export default TabLayout
