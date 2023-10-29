import { useState, useEffect } from 'react'

import { useTrialProjectStore } from '@/store/trialProject'

import type { TrialProject } from '@/models/trialProject/type'

export const useTrialProject = () => {
  const store = useTrialProjectStore()

  const [trialProject, setTrialProject] = useState<TrialProject>(store)
  useEffect(() => setTrialProject(store), [store])

  return { trialProject }
}
