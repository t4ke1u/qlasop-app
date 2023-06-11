export const PERIODS: PeriodsType = {
  jp: {
    0: "1限",
    1: "2限",
    2: "3限",
    3: "4限",
    4: "5限",
    5: "6限",
    6: "7限",
    8: "フルオンデマンド",
    9: "その他",
  },
}

type PeriodsType = {
  jp: { [key: number]: string }
}
