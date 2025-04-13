import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <div className='flex-center min-h-screen w-full'>
      {children}
    </div>
  )
}

