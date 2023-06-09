import { ClientDataModel } from "@/models/ClientDataModel"

export const getClientData = async (): Promise<ClientDataModel> => {
  const res = await fetch("http://localhost:3000/initial_client_data.json")
  const data = await res.json()
  return data
}
