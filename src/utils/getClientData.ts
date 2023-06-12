import { ClientDataModel } from "@/models/ClientDataModel"

export const getClientData = async (): Promise<ClientDataModel> => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/initial_client_data.json`)
  // const data = await res.json()
  // return data
  return {
    cells: [],
    stagedClasses: [],
    setting: {
      tableTitle: "No Name",
      periodLabels: [
        { period: "1", startTime: "8:50", endTime: "10:30" },
        { period: "2", startTime: "10:40", endTime: "12:20" },
        { period: "3", startTime: "13:10", endTime: "14:50" },
        { period: "4", startTime: "15:05", endTime: "16:45" },
        { period: "5", startTime: "17:00", endTime: "18:40" },
        { period: "6", startTime: "18:55", endTime: "20:35" },
        { period: "7", startTime: "20:45", endTime: "21:35" },
      ],
    },
  }
}
