"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

export default function SignOut() {
  return (
    <Button className='bg-transparent text-muted-foreground text-base pl-0 px-0 hover:bg-transparent hover:text-primary py-2 h-5' onClick={()=> signOut()}>
        LogOut
    </Button>
  )
}
