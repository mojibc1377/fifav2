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
        <h1 className="mb-3">All Challenges</h1>
        <div className="container mx-auto items-center justify-center flex mt-10">

        <ChallengeGrid status={false} type="all"/>

</div></TabsContent>

      <TabsContent value="my">
      <div className="container mx-auto items-center justify-center flex mt-10">

      <ChallengeGrid status={false} type="my"/>
      </div>
      </TabsContent>

      <TabsContent value="accepted">
      <div className="container mx-auto items-center justify-center flex mt-10">
      <ChallengeGrid status={true} type="my"/>
      </div>
      </TabsContent>

      <TabsContent value="create">
      <div className="container mx-auto mt-10">
      <AddChallengeForm />
    </div>
      </TabsContent>
    </Tabs>
  );
}