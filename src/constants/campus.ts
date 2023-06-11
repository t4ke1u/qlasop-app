const CAMPUSES: CampusesType = {
  jp: { 3: "西早稲田", 99: "無" },
  en: { 3: "Nishiwaseda", 99: "None" },
}

type CampusesType = {
  jp: { [key: number]: string }
  en: { [key: number]: string }
}
