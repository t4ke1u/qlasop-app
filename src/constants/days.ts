export const DAYS_LENGTH = 6

export const TIMETABLE_DAYS: DaysType = {
  en: { 0: 'Mon', 1: 'Tue', 2: 'Wed', 3: 'Thu', 4: 'Fri', 5: 'Sat' },
  jp: { 0: '月曜日', 1: '火曜日', 2: '水曜日', 3: '木曜日', 4: '金曜日', 5: '土曜日' },
}

export const CLASS_DAYS: DaysType = {
  en: { 0: 'Mon', 1: 'Tue', 2: 'Wed', 3: 'Thu', 4: 'Fri', 5: 'Sat', 9: 'None' },
  jp: { 0: '月曜日', 1: '火曜日', 2: '水曜日', 3: '木曜日', 4: '金曜日', 5: '土曜日', 9: '無' },
}

type DaysType = {
  en: { [key: string]: string },
  jp: { [key: string]: string }
}
