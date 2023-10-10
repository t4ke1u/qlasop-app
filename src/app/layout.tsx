import { ChakraProvider } from '@/libs/chakra'

export const metadata = {
  description: '',
  title: 'opclass',
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
