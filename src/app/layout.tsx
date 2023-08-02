import { ChakraProvider } from '@/libs/chakra'
import { SWRProvider } from '@/libs/swr'

export const metadata = {
  title: 'opclass',
  description: '',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja'>
      <body>
        <SWRProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </SWRProvider>
      </body>
    </html>
  )
}

export default RootLayout
