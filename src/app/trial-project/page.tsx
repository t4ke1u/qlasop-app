import { redirect } from 'next/navigation'

import { pagesPath } from '@/generated/$path'

const Page = () => {
  redirect(pagesPath.trial_project.timetable.$url().pathname)
}

export default Page
