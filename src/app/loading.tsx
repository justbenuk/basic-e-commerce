import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh', width: '100dvw' }}>
      <Image src={'/assets/loader.gif'} height={150} width={150} alt='Loading...' />
    </div>
  )
}

