import { ChakraProvider } from '@/libs/chakra'
import { NextAuthProvider } from '@/libs/nextauth'

export const metadata = {
  description: '',
  title: 'Qlasop',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja'>
      <body>
        <NextAuthProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
