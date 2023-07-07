import { ChakraProvider } from '@/libs/chakra'

export const metadata = {
  title: 'opclass',
  description: '',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja'>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}

export default RootLayout
