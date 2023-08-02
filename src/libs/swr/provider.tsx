'use client'

import { SWRConfig } from 'swr'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false }}>
      {children}
    </SWRConfig>
  )
}
