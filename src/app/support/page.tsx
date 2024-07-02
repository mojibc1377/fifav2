"use client";
import React, { ChangeEvent, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";

export default function Support() {
  const [messageBody, setMessageBody] = useState<string>('');
  const [messageSubject, setMessageSubject] = useState<string>('');

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageBody(event.target.value);
  };

  const handleSubjectChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageSubject(event.target.value);
  };

  return (
    <div className='w-full min-h-screen px-4 md:px-10'>
      <Tabs defaultValue="n" className="w-full min-h-screen mt-3">
        <TabsList className="flex w-full gap-2 md:gap-6 mb-5 justify-evenly flex-col md:flex-row">
          <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="socials">
            Socials
          </TabsTrigger>
          <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="email">
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="n">
          <h1 className="mb-3 text-center md:text-left">All Challenges</h1>
          <div className="container mx-auto items-center justify-center flex mt-10">
          </div>
        </TabsContent>

        <TabsContent value="socials">
          <div className="grid gap-2">
            <a href="https://t.me/+989330726042" className='bg-blue-400 hover:bg-blue-700 w-min px-4 py-2 rounded-md flex items-center gap-2'>
              <p>Telegram</p>
              <PiTelegramLogo />
            </a>
            <a href="https://wa.me/+989330726042" className='bg-green-500 hover:bg-green-700 w-min px-4 py-2 rounded-md flex items-center gap-2'>
              Whatsapp
              <FaWhatsapp />
            </a>
          </div>
        </TabsContent>

        <TabsContent value="email">
          <div className="grid gap-2">
            <Textarea
              value={messageSubject}
              onChange={handleSubjectChange}
              placeholder="Enter subject here"
              className='w-full md:w-2/3 min-h-[40px]'
            />
            <Textarea
              value={messageBody}
              onChange={handleBodyChange}
              placeholder="Enter text here"
              className='w-full min-h-[100px]'
            />
            <a href={`mailto:mojibc1377@gmail.com?subject=${messageSubject}&body=${messageBody}`} target="_blank" className='bg-[#5b6081] hover:bg-[#4c5275] w-min px-4 py-2 rounded-md'>
              Send
            </a>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}