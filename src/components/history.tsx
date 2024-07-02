import React from 'react'
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { GiChessQueen } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { PiHandWithdraw } from "react-icons/pi";
import { PiHandDeposit } from "react-icons/pi";
import { Gem } from 'lucide-react';

export default function History() {
  return (
    <div className='flex flex-col h-screen gap-10 p-4 md:p-10'>
        
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row border-b-2 pb-2 gap-3'>
            <h2>Matches</h2>
            <button className='text-xl '><MdExpandMore/></button>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  1,0
                  <div className='status ml-4 text-green-300 text-base italic'> W </div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  1,3
                  <div className='status ml-4 text-red-500 text-base italic'> L </div>
                </div>
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <div className='flex flex-row border-b-2 pb-2 gap-3'>
            <h2>Tournaments</h2>
            <button className='text-xl '><MdExpandMore/></button>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  1st
                  <div className='status ml-4 text-yellow-300 text-lg italic'><GiChessQueen/> </div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  2nd
                  <div className='status ml-4 text-gray-500 text-lg italic'><GiChessQueen/></div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  3rd
                  <div className='status ml-4 text-amber-500 text-lg italic'><GiChessQueen/></div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  23th
                  <div className='status ml-4 text-red-500 text-lg italic'><RxCross2 /></div>
                </div>
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <div className='flex flex-row border-b-2 pb-2 gap-3'>
            <h2>Transactions</h2>
            <button className='text-xl '><MdExpandMore/></button>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  10
                  <Gem className="w-4 h-4 ml-1 text-yellow-50" />
                  <div className='status ml-4 text-green-400 text-lg italic'><PiHandDeposit/> </div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  30
                  <Gem className="w-4 h-4 ml-1 text-yellow-50" />
                  <div className='status ml-4 text-red-500 text-lg italic'><PiHandWithdraw/></div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  25
                  <Gem className="w-4 h-4 ml-1 text-yellow-50" />
                  <div className='status ml-4 text-green-400 text-lg italic'><PiHandDeposit/></div>
                </div>
                <div className='bg-muted-foreground w-full md:w-auto px-4 py-0.5 rounded-md flex items-center text-pretty font-light text-2xl border-2 border-solid border-muted-foreground'>
                  83
                  <Gem className="w-4 h-4 ml-1 text-yellow-50" />
                  <div className='status ml-4 text-red-500 text-lg italic'><PiHandWithdraw /></div>
                </div>
            </div>
        </div>
    </div>
  )
}