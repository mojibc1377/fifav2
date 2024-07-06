// src/pages/challenges.tsx

import AddChallengeForm from "@/components/ui/ChallengeForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChallengeGrid from "@/components/ui/challengeGrid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SessionProvider } from "next-auth/react";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="all" className="w-full min-h-screen md:px-10 px-10 mt-3">
      <TabsList className="flex w-full md:px-10 gap-2 md:gap-6 mb-5 justify-evenly flex-col md:flex-row">
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2 " value="all">
          All
        </TabsTrigger>
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="my">
          My
        </TabsTrigger>
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="accepted">
          Accepted
        </TabsTrigger>
        <TabsTrigger className="px-3 py-2 md:px-5 md:py-2" value="create">
          Create
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <h1 className="mb-3 mx-10 text-center">All Challenges<br/>
Explore a variety of challenges that are waiting to be accepted.<br/> Dive in, find something that excites you, and take on a new challenge today!</h1>
        <div className="container mx-auto items-center justify-center flex mt-10">
          <ChallengeGrid filterType="all" />
        </div>
      </TabsContent>

      <TabsContent value="my">
      <h1 className="mb-3 mx-10 text-center">My Challenges<br/>
Here you can find all the challenges you have created, whether they have been accepted by others or not.<br/> Keep track of your challenges and see how others are engaging with them.
</h1>
        <div className="container mx-auto items-center justify-center flex mt-10">
          <ChallengeGrid filterType="my" />
        </div>
      </TabsContent>

      <TabsContent value="accepted">
      <h1 className="mb-3 mx-10 text-center">
      Accepted Challenges<br/>
These are the challenges you have accepted.
<br/>
 Stay on top of your game and keep track of your progress with the challenges you are actively participating in.
</h1>
        <div className="container mx-auto items-center justify-center flex mt-10">
          <ChallengeGrid filterType="accepted" />
        </div>
      </TabsContent>

      <TabsContent value="create">
      <h1 className="mb-3 mx-10 text-center">

      Create a Challenge<br/>
Have an idea for a new challenge? Share it here! Post your challenge to the wall and see who steps up to take it on. <br/>Let your creativity shine and inspire others.
</h1>
        <div className="container mx-auto mt-10">
          <AddChallengeForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}
