"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleUser, Gem } from "lucide-react"
import { LuLoader2 } from "react-icons/lu";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useToast } from "./use-toast"
import { ToastProvider } from "@radix-ui/react-toast"
import { Toaster } from "./toaster"



type ChallengeCardProps = {
  type: string;
  status: boolean;
};
export const ChallengeCard: React.FC<ChallengeCardProps> = ({ type, status }) => {
  const {toast} = useToast();
  let dateTime = new Date().toLocaleDateString

  const handleLoaderClick = () => {
    toast({
      title: "Challenge Status",
      description: "Your challenge is still not accepted by any other users.",
      duration: 3000,
    });
  };
  return (
    <div>
    <ToastProvider>

    <Card className="w-max h-60 bg-secondary mt-3 mb-1 bg-opacity-5 shadow-inner border-solid shadow-[#161e2b] border-[#161e2b] sliding-div">
      <CardHeader className="flex flex-row gap-3 align-middle text-left justify-center">
        <CardTitle>
            <img src="/challengeImage/eafc24.jpg" alt="game" className=" w-28 mix-blend-lighten"></img>
        </CardTitle>
        <div className="pt-1 italic font-thin text-muted-foreground">challenge</div>
      </CardHeader>
      <CardContent>
        <div className="challenge-card flex flex-col gap-6">
            <img className="w-20" src="/challengeImage/ps5.png"></img>
            <div className="flex flex-row text-left justify-between gap-1">
            <div className="flex flex-row gap-1">

                <CircleUser className="h-6 w-6"/>
                <CardDescription className="text-muted-foreground animate-pulse pt-0.5">{Date().slice(4,16)}</CardDescription> 
                {/* date created */}

            </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row align-middle justify-between gap-5 ">
        {
          type === "my" ? 
            status === true ? 
            (<button><MdOutlineMoreHoriz className="text-blue-300 text-3xl pt-1 animate-pulse"/></button> ): 
            (<button onClick={handleLoaderClick}><LuLoader2 className="animate-spin mt-1 text-blue-300 text-2xl"/></button> ):
            (<button className="w-max md:w-auto ml-0 md:ml-0 px-5 py-2 bg-[#5b6081] hover:bg-[#4c5275] hover:text-blue-300 text-blue-100 rounded-sm "> Accept </button>)
        }

        <div className="flex flex-row gap-1">
            <Gem className="w-5 h-5 self-center text-yellow-50" />
            <div className="font-light text-muted-foreground text-yellow-50">15</div>
        </div>
      </CardFooter>
    </Card>
    </ToastProvider>
    </div>
  )
}
