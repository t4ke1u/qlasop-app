export type CourseClass = {

  campusCode?: number,
  classCode: string
  classTitleEn?: string,
  classTitleJp?: string,
  courseCategoryEn: string,
  courseCategoryJp: string,
  creditCategoryEn: string,
  creditCategoryJp: string,
  credits: number,
  day: number
  eligibleYear: number,
  endPeriod: number
  faculty: number
  instructorEn?: string,
  instructorJp?: string,
  /*
    key(string): 科目キー
    classCode(string): クラスコード
    linkKey(string): 科目実施キー
    titleJp(string): 科目名(日本語)
    titleEn(string): 科目名(英語)
    classTitleJp?(string): クラス名(日本語)
    classTitleEn?(string): クラス名(英語)
    year(number): 年度
    term(number): 学期
        1: 通年
        12: 春学期, 13: 秋学期
        64: 集中講義（春）, 65: 集中講義（秋）, 66: 集中講義（春・秋）
        81: 春クォーター, 82: 夏クォーター, 83: 秋クォーター, 84: 冬クォーター
    day(number): 曜日
        0: 月曜 ~ 5: 土曜
        -1: 無
    startPeriod(number): 開始時限
    endPeriod(number): 終了時限
        0: 1限 ~ 6: 7限
        -1: フルオンデマンド
        -2: その他
    faculty(number): 学部
        26: 基幹, 27: 創造, 28: 先進
    courseCategoryJp(string): 科目区分(日本語)
    courseCategoryEn(string): 科目区分(英語)
    creditCategoryJp(string): 単位区分(日本語)
    creditCategoryEn(string): 単位区分(英語)
    credits(number): 単位数
    campusCode?(number): キャンパスコード
    eligibleYear(number): 対象最低学年
    modalityCategoryJp?(string): 授業方法区分(日本語)
    modalityCategoryEn?(string): 授業方法区分(英語)
    instructorJp?(string): 教員(日本語)
    instructorEn?(string): 教員(英語)
    outline?(string): 授業概要
    objectives?(string): 授業目標
    syllabusUrlJp?(string): シラバスURL(日本語)
    syllabusUrlEn?(string): シラバスURL(英語)
  */
  key: string,
  linkKey: string,
  modalityCategoryEn?: string,
  modalityCategoryJp?: string,
  objectives?: string,
  outline?: string,
  startPeriod: number,
  syllabusUrlEn?: string,
  syllabusUrlJp?: string,
  term: number,
  titleEn: string,
  titleJp: string,
  year: number
}
