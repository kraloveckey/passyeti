import "./globals.css"

export const metadata = {
  title: 'PassYeti',
  description: 'Protect your most intimate secrets with a strong password :D',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en" suppressHydrationWarning>
      {
      }
      <head>
        <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap' rel='stylesheet'/>
      </head>
      <body>{children}</body>
    </html>
  )
}