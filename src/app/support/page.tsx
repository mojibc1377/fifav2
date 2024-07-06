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
          <div className='p-10 text-ellipsis font-sans'>
          <h1 className="mb-3 text-center text-2xl mt-10 ">Need Help? We are Here for You!</h1>
          <div className="container mx-auto items-center justify-center text-center flex mt-8">
          If you have any questions or need support, you can easily reach out to us through Telegram, WhatsApp, or direct email. 
          <br/>
          We’re always here to help you out.<br/>
          We’re a small team and sometimes it might take a little while to get back to you. <br/>
          But don’t worry, we’ll respond as soon as possible. <br/>
          Your patience and understanding are greatly appreciated!<br/>
          Thank you for being a part of our community. <br/>
          We’re here to support you every step of the way.<br/>
          </div>
          </div>
        </TabsContent>

        <TabsContent value="socials">
          <div className='items-center flex flex-row justify-center pt-20'>
          <div className=" flex flex-row gap-10">
            <a href="https://t.me/+989330726042" className='bg-blue-400 hover:bg-blue-700 w-min px-4 py-2 rounded-md flex items-center gap-2'>
              <p>Telegram</p>
              <PiTelegramLogo />
            </a>
            <a href="https://wa.me/+989330726042" className='bg-green-500 hover:bg-green-700 w-min px-4 py-2 rounded-md flex items-center gap-2'>
              Whatsapp
              <FaWhatsapp />
            </a>
          </div>
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