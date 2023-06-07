export const TIMETABLE_DAYS: TimeTableDaysType = {
  jp: { 0: "月曜日", 1: "火曜日", 2: "水曜日", 3: "木曜日", 4: "金曜日", 5: "土曜日" },
  en: { 0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat" },
}

type TimeTableDaysType = {
  jp: { [key: number]: string }
  en: { [key: number]: string }
}
