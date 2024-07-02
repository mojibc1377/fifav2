// pages/dashboard.js
"use client"
import AvatarSelector from '@/components/ui/AvatarSelector.jsx';
import UserDetailsForm from '../../components/userDetailsForm';
import { SetStateAction, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import History from '@/components/history';

const Dashboard = () => {
  const [ avatar ,setAvatar] = useState('')
  const handleAvatarSelect = (avatarLink: SetStateAction<string>) =>{
    setAvatar(avatarLink)
  }


  return (
   
<Tabs defaultValue="n" className="w-full min-h-screen px-4 md:px-10 lg:px-48 mt-3">
      <TabsList className="flex w-full px-2 md:px-10 gap-2 md:gap-6 mb-5 justify-evenly flex-col md:flex-row">
        
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="account-settings">
        Account Settings
        </TabsTrigger>

        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2 " value="history">
          History
        </TabsTrigger>

      </TabsList>

      <TabsContent value="account-settings">

        <UserDetailsForm />

      </TabsContent>

      <TabsContent value="history">
        <History/>
      </TabsContent>

    </Tabs>
  );
};

export default Dashboard;
