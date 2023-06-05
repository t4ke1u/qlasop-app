import TimeTableFrame from "@/components/timetable/TimeTableFrame"
import TimeTablePeriodLabel from "@/components/timetable/TimeTablePeriodLabel"
import { ClientDataProvider } from "@/hooks/ClientDataContext"
import { ClientDataModel } from "@/models/ClientDataModel"

const getClientData = async (): Promise<ClientDataModel> => {
  const res = await fetch("http://localhost:3000/initial_client_data.json")
  const data = await res.json()
  return data
}

const Home = async () => {
  const initialClientData = await getClientData()

  return (
    <main>
      <ClientDataProvider initialClientData={initialClientData}>
        <TimeTableFrame />
      </ClientDataProvider>
    </main>
  )
}

export default Home
