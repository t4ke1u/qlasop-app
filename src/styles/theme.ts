import { extendTheme } from '@chakra-ui/react'
import { notoSansJP } from '@/styles/font'

export const theme = extendTheme({
  fonts: {
    body: notoSansJP.style.fontFamily,
    heading: notoSansJP.style.fontFamily,
  },
  // ボタンのフォーカスを削除
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
})
