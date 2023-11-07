import type { CellColor, PeriodLabel } from '@/models/trialProject/type'

export const DEFAULT_COLOR = 'gray'

export const COLORS: Array<CellColor> = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]

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
  en: { [key: string]: string }
  jp: { [key: string]: string }
}

export const FACULTIES: FacultyType = {
  en: { 26: 'Fund', 27: 'Cre', 28: 'Adv' },
  jp: { 26: '基幹', 27: '創造', 28: '先進' },
}

type FacultyType = { en: { [key: number]: string }; jp: { [key: number]: string } }

export const DEFAULT_PERIODS: Array<PeriodLabel> = [
  { endTime: '10:30', index: 0, startTime: '08:50' },
  { endTime: '12:20', index: 1, startTime: '10:40' },
  { endTime: '14:50', index: 2, startTime: '13:10' },
  { endTime: '16:45', index: 3, startTime: '15:05' },
  { endTime: '18:40', index: 4, startTime: '17:00' },
  { endTime: '20:35', index: 5, startTime: '18:55' },
  { endTime: '21:35', index: 6, startTime: '20:45' },
]

export const TERMS: TermsType = {
  en: {
    1: 'All Year',
    12: 'Spring Term',
    13: 'Fall Term',
    64: 'Intensive Course (Spring)',
    65: 'Intensive Course (Fall)',
    66: 'Intensive Course (Spring, Fall)',
    81: 'Spring Quarter',
    82: 'Summer Quarter',
    83: 'Fall Quarter',
    84: 'Winter Quarter',
  },
  jp: {
    1: '通年',
    12: '春学期',
    13: '秋学期',
    64: '集中講義（春）',
    65: '集中講義（秋）',
    66: '集中講義（春・秋）',
    81: '春クォーター',
    82: '夏クォーター',
    83: '秋クォーター',
    84: '冬クォーター',
  },
}

type TermsType = {
  en: { [key: number]: string }
  jp: { [key: number]: string }
}
