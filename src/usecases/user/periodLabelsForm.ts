import { useForm } from 'react-hook-form'

import { UserPeriodLabel } from '@/models/user/type'
import { usePeriodLabelsStore } from '@/store/user'

export const usePeriodLabelsForm = (index: number, action: () => void) => {
  const label = usePeriodLabelsStore((state) => state.labels[index])
  const setLabel = usePeriodLabelsStore((state) => state.set)

  const {
    register: basicRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserPeriodLabel>({ defaultValues: label })

  const register = {
    startTime: basicRegister('startTime', { required: '入力が必須です' }),
    endTime: basicRegister('endTime', { required: '入力が必須です' }),
  }

  const onSubmit = handleSubmit((periodLabel: UserPeriodLabel) => {
    setLabel(index, periodLabel)
    action()
  })

  return { register, onSubmit, reset, errors }
}
