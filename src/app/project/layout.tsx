import { AppHeader } from '@/components/ui/layout/common/AppHeader'

import type { BreadCrumb } from '@/components/ui/layout/common/AppHeader/AppHeader'

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const breadcrumbs: BreadCrumb[] = [
    { displayName: 'Projects' },
    { displayName: 'Project Name' },
    { displayName: 'Timetable', isCurrentPage: true },
  ]
  return <AppHeader breadcrumbs={breadcrumbs}>{children}</AppHeader>
}

export default ProjectLayout
