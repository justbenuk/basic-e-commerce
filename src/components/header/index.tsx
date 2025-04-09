import Link from 'next/link'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import MenuItems from './menu-items'

export default function Header() {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href={'/'} className='flex-start'>
            <Image src={'/images/logo.svg'} alt='Logo image' height={48} width={48} property='true' />
            <span className='hidden lg:block font-bold text-2xl ml-3'>{APP_NAME}</span>
          </Link>
        </div>
        <MenuItems />
      </div>
    </header>
  )
}

