'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuCheckboxItem } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { SunIcon, MoonIcon, SunMoonIcon } from 'lucide-react'

export default function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <><DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='focus-visible:ring-0 focus-visible:ring-offset-0'>
          {theme === 'system' ? (
            <SunMoonIcon />
          ) : theme === 'dark' ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={theme === 'system'} onClick={() => setTheme('system')}>System</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'light'} onClick={() => setTheme('light')}>Light</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === 'dark'} onClick={() => setTheme('dark')}>Dark</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu></>
  )
}

