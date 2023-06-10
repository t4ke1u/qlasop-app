import { ClientDataModel } from "@/models/ClientDataModel"

export const getClientData = async (): Promise<ClientDataModel> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/initial_client_data.json`)
  const data = await res.json()
  return data
}
