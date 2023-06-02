import { Noto_Sans_JP, Roboto } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export { notoSansJP, roboto }
