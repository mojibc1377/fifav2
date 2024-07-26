"use client"
import EarnPage from '@/components/earnRewards'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function RewardEarningsPage() {
  return (
    <div className='min-h-screen'>
      <SessionProvider>
      <EarnPage/>
      </SessionProvider>
    </div>
  )
}
