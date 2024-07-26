"use client"
import AdminComponent from '@/components/adminCheck'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function Admin() {
  return (
    <div>
        <SessionProvider>
            <AdminComponent/>
        </SessionProvider>
    </div>
  )
}
