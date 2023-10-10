export type UserCell = {

  clientMemo?: string,
  color: CellColor,
  creditCategory: string,
  credits: number,
  day: number,
  endPeriod: number,
  instructor?: string,
  link?: [string, string]
  startPeriod: number,
  /*
    title(string): 科目名
    day(number): 曜日
        0: 月曜 ~ 5: 土曜
    startPeriod(number): 開始時限
    endPeriod(number): 終了時限
        0: 1限 ~ 6: 7限
    instructor?(string): 教員
    creditCategory(string): 単位区分
    credits(number): 単位数
    link?([string, string]): [科目キー, クラスコード]
    color(string): セルの色
    clientMemo?(string): メモ
  */
  title: string
}

export type UserPeriodLabels = [
  // 1限〜7限までの情報を格納
  UserPeriodLabel,
  UserPeriodLabel,
  UserPeriodLabel,
  UserPeriodLabel,
  UserPeriodLabel,
  UserPeriodLabel,
  UserPeriodLabel,
]

export type UserPeriodLabel = {
  endTime: string,
  // 各時限の開始時間と終了時間
  startTime: string
}

export type CellColor =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'pink'

export const DEFAULT_PERIOD_LABELS: UserPeriodLabels = [
  { endTime: '10:30', startTime: '08:50' },
  { endTime: '12:20', startTime: '10:40' },
  { endTime: '14:50', startTime: '13:10' },
  { endTime: '16:45', startTime: '15:05' },
  { endTime: '18:40', startTime: '17:00' },
  { endTime: '20:35', startTime: '18:55' },
  { endTime: '21:35', startTime: '20:45' },
]
