"use client"
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

export default function SignOut() {
  return (
    <Button className=' text-white bg-transparent pl-0 hover:bg-transparent py-3 h-5' onClick={()=> signOut()}>
        SignOut
    </Button>
  )
}
