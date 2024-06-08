import { useEffect, useState } from 'react'

import { useSolveRequestStore } from '@/store/solveRequest/solveRequest.store'
import { useTrialProjectStore } from '@/store/trialProject'

import type { SolveRequest } from '@/models/solve/type'

export const useSolveRequest = () => {
  const solveRequestStore = useSolveRequestStore()
  const trialProjectStore = useTrialProjectStore()

  const [solveRequest, setSolveRequest] = useState<SolveRequest>({
    currentCourses: trialProjectStore.cells.map(({ color, clientMemo, ...course }) => course),
    stageCourses: trialProjectStore.stage,
    ...solveRequestStore,
  })
  useEffect(
    () =>
      setSolveRequest({
        currentCourses: trialProjectStore.cells.map(({ color, clientMemo, ...course }) => course),
        stageCourses: trialProjectStore.stage,
        ...solveRequestStore,
      }),
    [solveRequestStore, trialProjectStore],
  )

  return { solveRequest }
}
