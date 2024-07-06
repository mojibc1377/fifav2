import SignUpForm from '@/components/form/sign-up'
import Image from 'next/image'
import React from 'react'

export default function SignUp() {
  return (
    <div className="w-full min-h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-5">
        <div className="mx-auto grid w-[350px] gap-2">
          <SignUpForm/>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/images/tekkz.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    )
}
