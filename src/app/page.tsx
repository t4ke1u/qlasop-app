"use client"

import TabLayout from "./tab"
import { ClientDataProvider } from "@/hooks/ClientDataContext"
import { getClientData } from "@/utils/getClientData"

const Home = async () => {
  const initialClientData = await getClientData()

  return (
    <main>
      <ClientDataProvider initialClientData={initialClientData}>
        <TabLayout />
      </ClientDataProvider>
    </main>
  )
}

export default Home
