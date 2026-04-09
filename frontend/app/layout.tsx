import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raushni - Educational & Social Welfare Trust',
  description: 'Empowering communities through education and social welfare',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}