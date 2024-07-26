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
import { SessionProvider } from 'next-auth/react';
import AddPaymentMethod from '@/components/form/addPayment';


const Dashboard = () => {
  const [avatar, setAvatar] = useState('');
  const handleAvatarSelect = (avatarLink: SetStateAction<string>) => {
    setAvatar(avatarLink);
  };

  return (
    <SessionProvider>
    <Tabs defaultValue="n" className="w-full min-h-screen px-4 md:px-10 flex-col items-center justify-center lg:px-48 mt-3">
      <TabsList className="flex w-full px-2 md:px-10 gap-2 md:gap-6 mb-5 justify-evenly flex-col md:flex-row">
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="account-settings">
          Account Settings
        </TabsTrigger>
       
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2 " value="chargeaccount">
          Credit panel
        </TabsTrigger>
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2 " value="history">
          Credit history
        </TabsTrigger>
      </TabsList>
      <TabsContent value='n'>
        <div className='items-center mx-10 text-center'>
      <h1 className='text-2xl mb-3 mt-5'>Account Settings</h1>
      <p>
      In the Account Settings section,<br/> you can manage your personal information and update your account details.
     Keep your profile up-to-date to ensure you receive the best experience on our platform.

      </p>
      <h1 className='text-2xl mt-10 mb-3'>Credit Settings</h1>
<p>
In the Credit section, you can easily manage your account balance. <br/>
Whether you want to charge your account to increase your credit or withdraw money, this section provides you with the tools to stay in control of your finances.

</p>
</div>
      </TabsContent>
      <TabsContent value="account-settings">
        <UserDetailsForm />
      </TabsContent>

     

      <TabsContent value="chargeaccount">
        <SessionProvider>
        <AddPaymentMethod/>

        </SessionProvider>
      </TabsContent>


      <TabsContent value="history">
        <SessionProvider>
        <AddPaymentMethod/>

        </SessionProvider>
      </TabsContent>
    </Tabs>
    </SessionProvider>
  );
};

export default Dashboard;