export const STATUS: StatusType = {
  jp: { 0: "開講", 1: "隔年開講", 4: "休講", 5: "隔年休講" },
  en: { 0: "Beginning", 1: "Alternate Beginning", 4: "No", 5: "Alternate No" },
}

type StatusType = {
  jp: { [key: number]: string }
  en: { [key: number]: string }
}
