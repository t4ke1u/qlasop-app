import { extendTheme } from '@chakra-ui/react'

import { notoSansJP } from '@/styles/font'

export const theme = extendTheme({
  // ボタンのフォーカスを削除
components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
  
  fonts: {
    body: notoSansJP.style.fontFamily,
    heading: notoSansJP.style.fontFamily,
  },
})
