import { useState, useEffect } from 'react'

import { useTrialProjectStore } from '@/store/trialProject'

import type { Course } from '@/models/course/type'
import type { Cell, CreditRanges, TrialProject } from '@/models/trialProject/type'

export const useTrialProject = () => {
  const store = useTrialProjectStore()

  const [trialProject, setTrialProject] = useState<TrialProject>(store)
  useEffect(() => setTrialProject(store), [store])

  return { trialProject }
}

export const useTrialProjectCreditRanges = () => {
  const store = useTrialProjectStore()

  const [creditRanges, setCreditRanges] = useState<CreditRanges>([])
  useEffect(() => {
    const creditRanges: CreditRanges = store.cells.reduce((prev: CreditRanges, cell: Cell) => {
      const creditRange = prev.find(
        (creditRange) => creditRange.creditCategory === cell.creditCategory,
      )
      if (creditRange) {
        return [
          ...prev.filter((cr) => cr !== creditRange),
          {
            creditCategory: creditRange.creditCategory,
            current: creditRange.current + cell.credits,
            max: creditRange.max + cell.credits,
          },
        ]
      } else {
        return [
          ...prev,
          { creditCategory: cell.creditCategory, current: cell.credits, max: cell.credits },
        ]
      }
    }, [])
    setCreditRanges(
      store.stage.reduce((prev: CreditRanges, course: Course) => {
        const creditRange = prev.find(
          (creditRange) => creditRange.creditCategory === course.creditCategory,
        )
        if (creditRange) {
          return [
            ...prev.filter((cr) => cr !== creditRange),
            {
              creditCategory: creditRange.creditCategory,
              current: creditRange.current,
              max: creditRange.max + course.credits,
            },
          ]
        } else {
          return [
            ...prev,
            { creditCategory: course.creditCategory, current: 0, max: course.credits },
          ]
        }
      }, creditRanges),
    )
  }, [store])

  return { creditRanges }
}
