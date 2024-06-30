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
    <Tabs defaultValue="account" className="w-full px-4 md:px-10 lg:px-48 mt-3">
      <TabsList className="flex w-full px-2 md:px-10 gap-2 md:gap-6 mb-5 justify-evenly flex-col md:flex-row">
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
        <ChallengeGrid status={false} type="all"/>
      </TabsContent>

      <TabsContent value="my">
      <ChallengeGrid status={false} type="my"/>
      </TabsContent>

      <TabsContent value="accepted">
      <ChallengeGrid status={true} type="my"/>
      </TabsContent>

      <TabsContent value="create">
      <div className="container mx-auto mt-10">
      <AddChallengeForm />
    </div>
      </TabsContent>
    </Tabs>
  );
}