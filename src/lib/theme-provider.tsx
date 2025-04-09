import React, { ReactNode } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

type Props = {
  children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider attribute={'class'} enableSystem={true} disableTransitionOnChange>{children}</NextThemeProvider>
  )
}

