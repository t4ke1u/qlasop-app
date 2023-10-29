import { AppHeader } from '@/components/ui/layout/common/AppHeader'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AppHeader>{children}</AppHeader>
}

export default Layout
