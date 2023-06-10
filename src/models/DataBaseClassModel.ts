export type DataBaseClassModel = {
  /*
  subjectKey(string):     科目キー
  classCode(string):      科目クラスコード
  linkKey(string):        授業実施科目キー
  union(number):          合併区分
  subjectNameJp(string):  漢字科目名
  subjectNameEn(string):  英字科目名
  classNameJp?(string):   漢字クラス名
  classNameEn?(string):   英字クラス名
  status(number):         クラス開講区分
  year(number):           配当年度
  term(number):           学期コード
  day(number):            曜日コード
  startPeriod(number):    開始時限
  endPeriod(number):      終了時限
  faculty(number):        学部コード
  attribute(string):      所属
  unit(number):           単位数
  category(number):       科目区分
  campus?(number):        キャンパスコード
  grade(number):          配当年次
  type(string):           授業形式
  teachers?(string):      教員
  */

  subjectKey: string
  classCode: string
  linkKey: string
  union: number
  subjectNameJp: string
  subjectNameEn: string
  classNameJp?: string
  classNameEn?: string
  status: number
  year: number
  term: number
  day: number
  startPeriod: number
  endPeriod: number
  faculty: number
  attribute: string
  unit: number
  category: number
  campus?: number
  grade: number
  type: string
  teachers?: string
}
