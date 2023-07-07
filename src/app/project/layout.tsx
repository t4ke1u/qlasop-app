import { ProjectSidebarWithHeader } from '@/components/ui/layout/project'

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProjectSidebarWithHeader>{children}</ProjectSidebarWithHeader>
}

export default ProjectLayout
