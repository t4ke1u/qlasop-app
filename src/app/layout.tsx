import "@/styles/globals.css"
import { notoSansJP, roboto } from "@/styles/font"

export const metadata = {
  title: "Optimetable",
  description: "",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}
