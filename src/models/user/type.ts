export type UserCell = {
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
  day: number
  startPeriod: number
  endPeriod: number
  instructor?: string
  creditCategory: string
  credits: number
  link?: [string, string]
  color: CellColor
  clientMemo?: string
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
  // 各時限の開始時間と終了時間
  startTime: string
  endTime: string
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
