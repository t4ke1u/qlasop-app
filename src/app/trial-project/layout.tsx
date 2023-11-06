import { Box, Flex } from '@chakra-ui/react'

import { AppHeader } from '@/components/ui/AppHeader'
import { TrialProjectSidebar } from '@/components/ui/TrialProjectSidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppHeader>
      <Flex minH='full' w='full'>
        <TrialProjectSidebar />
        <Box maxH='full' w='full'>
          {children}
        </Box>
      </Flex>
    </AppHeader>
  )
}

export default Layout
