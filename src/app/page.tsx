import TimeTableFrame from "@/components/timetable/TimeTableFrame"
import { ClientDataProvider } from "@/hooks/ClientDataContext"
import { getClientData } from "@/utils/getClientData"

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
