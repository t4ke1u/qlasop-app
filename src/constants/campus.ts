export const CAMPUSES: CampusesType = {
  en: { 3: 'Nishiwaseda', 99: 'None' },
  jp: { 3: '西早稲田', 99: '無' },
}

type CampusesType = {
  en: { [key: number]: string },
  jp: { [key: number]: string }
}
