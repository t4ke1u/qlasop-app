import { useForm } from 'react-hook-form'

import { CellColor, UserCell } from '@/models/user/type'
import { useCellsStore } from '@/store/user'

export const useCellForm = (
  time?: { day: number; startPeriod: number; endPeriod: number },
  cell?: UserCell,
) => {
  // cellsStore の利用
  const addCell = useCellsStore((state) => state.add)
  const editCell = useCellsStore((state) => state.edit)

  // 初期値の設定
  const mode = cell ? 'edit' : 'add'
  const defaultValues: UserCell = {
    title: cell?.title ?? '',
    day: time?.day ?? cell?.day ?? 0,
    startPeriod: time?.startPeriod ?? cell?.startPeriod ?? 0,
    endPeriod: time?.endPeriod ?? cell?.endPeriod ?? 0,
    instructor: cell?.instructor ?? '',
    creditCategory: cell?.creditCategory ?? '',
    credits: cell?.credits ?? 0,
    link: cell?.link ?? undefined,
    color: cell?.color ?? 'gray',
    clientMemo: cell?.clientMemo ?? '',
  }

  const {
    register: basicRegister,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserCell>({ defaultValues })

  const register = {
    title: basicRegister('title', { required: '入力が必須です' }),
    day: basicRegister('day', { valueAsNumber: true }),
    startPeriod: basicRegister('startPeriod', { valueAsNumber: true }),
    endPeriod: basicRegister('endPeriod', {
      valueAsNumber: true,
      validate: (value) => {
        if (value < getValues('startPeriod')) {
          return '終了時限が開始時限よりも前になっています'
        }
      },
    }),
    instructor: basicRegister('instructor'),
    creditsCategory: basicRegister('creditCategory'),
    credits: basicRegister('credits', { valueAsNumber: true }),
    color: basicRegister('color'),
    clientMemo: basicRegister('clientMemo'),
  }

  const onSubmit =
    (force: boolean = false, successAction?: () => void, failAction?: () => void) =>
    (e?: React.BaseSyntheticEvent) =>
      handleSubmit((formCell: UserCell) => {
        const result = mode === 'edit' ? editCell(cell!, formCell, force) : addCell(formCell, force)
        if (!result && failAction !== undefined) {
          failAction()
        } else if (successAction !== undefined) {
          successAction()
        }
      })(e)

  const handleChangeColor = (color: CellColor) => {
    setValue('color', color)
  }

  return { register, onSubmit, reset, handleChangeColor, errors, isSubmitting }
}
