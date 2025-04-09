import React from 'react'
import { APP_NAME } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-2'>
      <div className='p-5 flex-center'>{currentYear} {APP_NAME}.All Rights Reserved</div>
    </footer>
  )
}

