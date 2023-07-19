import { useForm } from 'react-hook-form'

import { UserPeriodLabel } from '@/models/user/type'
import { usePeriodLabels } from '@/store/user'

export const usePeriodLabelForm = (index: number) => {
  const label = usePeriodLabels((state) => state.labels[index])
  const update = usePeriodLabels((state) => state.update)

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

  const onSubmit = (action: () => void) => (e?: React.BaseSyntheticEvent) =>
    handleSubmit((periodLabel: UserPeriodLabel) => {
      update(index, periodLabel)
      action()
    })(e)

  return { register, onSubmit, reset, errors }
}
