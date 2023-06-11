export const TERMS: TermsType = {
  jp: {
    1: "通年",
    12: "春学期",
    13: "秋学期",
    64: "集中講義（春）",
    65: "集中講義（秋）",
    66: "集中講義（春・秋）",
    81: "春クォーター",
    82: "夏クォーター",
    83: "秋クォーター",
    84: "冬クォーター",
  },
  en: {
    1: "All Year",
    12: "Spring Term",
    13: "Fall Term",
    64: "Intensive Course (Spring)",
    65: "Intensive Course (Fall)",
    66: "Intensive Course (Spring, Fall)",
    81: "Spring Quarter",
    82: "Summer Quarter",
    83: "Fall Quarter",
    84: "Winter Quarter",
  },
}

type TermsType = {
  jp: { [key: number]: string }
  en: { [key: number]: string }
}
