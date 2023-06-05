"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

import { ClientDataModel } from "@/models/ClientDataModel"

type ClientDataContextProps = {
  clientData: ClientDataModel
  setClientData: Dispatch<SetStateAction<ClientDataModel>>
}

const ClientDataContext = createContext<ClientDataContextProps>({} as ClientDataContextProps)

type ClientDataProviderProps = {
  initialClientData: ClientDataModel
  children: ReactNode
}

const ClientDataProvider = ({ initialClientData, children }: ClientDataProviderProps) => {
  const [clientData, setClientData] = useState<ClientDataModel>(initialClientData)
  const value: ClientDataContextProps = {
    clientData,
    setClientData,
  }

  return <ClientDataContext.Provider value={value}>{children}</ClientDataContext.Provider>
}

const useClientData = () => useContext(ClientDataContext)

export { ClientDataProvider, useClientData }
