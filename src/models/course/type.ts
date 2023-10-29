export type Course = {
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
  */
  creditCategory: string
  credits: number
  day: number
  endPeriod: number
  instructor?: string
  startPeriod: number
  title: string
}
