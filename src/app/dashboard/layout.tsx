import { NextAuthProvider } from '@/libs/nextauth'

export const metadata = {
  description: '',
  title: 'opclass',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>
}

export default Layout
