// src/components/ChallengeCard.tsx

"use client"
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CircleUser, Gem } from "lucide-react";
import { LuLoader2 } from "react-icons/lu";
import { useToast } from "./use-toast";
import { ToastProvider } from "@radix-ui/react-toast";
import More from "@/app/challenges/more/page";
import { Challenge } from "@prisma/client";

type ChallengeCardProps = {
  challenge: Challenge;
  type: string;
  status: boolean;
};

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, type, status }) => {
  const { toast } = useToast();
  const { gameName, consoleType, challengeAmount, createdAt } = challenge;

  const handleLoaderClick = () => {
    toast({
      title: "Challenge Status",
      description: "Your challenge is still not accepted by any other users.",
      duration: 3000,
    });
  };

  const handleAcceptClick = async () => {
    try {
      const response = await fetch(`/api/challenges/accept?challengeId=${challenge.id}`, {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: "Challenge Accepted",
          description: "You can proceed further in the accepted tag.",
          duration: 3000,
        });
      } else if (response.status === 409) {
        toast({
          title: "Challenge Already Accepted",
          description: "Another user just accepted this challenge. Please refresh the page.",
          duration: 3000,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Something went wrong",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error accepting challenge:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        duration: 3000,
      });
    }
  };

  const gameImageSrc = gameName === 'fc24' ? '/challengeImage/eafc24.jpg' : '/challengeImage/eafc24.jpg';
  const consoleImageSrc = consoleType === 'ps5' ? '/challengeImage/ps5.png' : '/challengeImage/ps4.png';

  return (
    <div>
      <ToastProvider>
        <Card className="w-max h-60 bg-secondary mt-3 mb-1 bg-opacity-5 shadow-inner border-solid shadow-[#161e2b] border-[#161e2b] sliding-div">
          <CardHeader className="flex flex-row gap-3 align-middle text-left justify-center">
            <CardTitle>
              <img src={gameImageSrc} alt="game" className="w-28 mix-blend-lighten" />
            </CardTitle>
            <div className="pt-1 italic font-thin text-muted-foreground">challenge</div>
          </CardHeader>
          <CardContent>
            <div className="challenge-card flex flex-col gap-6">
              <img className="w-20" src={consoleImageSrc} alt="console" />
              <div className="flex flex-row text-left justify-between gap-1">
                <div className="flex flex-row gap-1">
                  {<CircleUser className="h-6 w-6" />}
                  <CardDescription className="text-muted-foreground animate-pulse pt-0.5">{new Date(createdAt).toDateString()}</CardDescription>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row align-middle justify-between gap-5">
            {challenge.accepterId ? (
              <More />
            ) : type === "my" ? (
              status === true ? (
                <More />
              ) : (
                <button onClick={handleLoaderClick}>
                  <LuLoader2 className="animate-spin mt-3 text-blue-300 text-2xl" />
                </button>
              )
            ) : (
              <button onClick={handleAcceptClick} className="w-max md:w-auto ml-0 md:ml-0 px-5 py-2 bg-[#5b6081] hover:bg-[#4c5275] hover:text-blue-300 text-blue-100 rounded-sm">
                Accept
              </button>
            )}
            <div className="flex flex-row gap-1">
              <Gem className="w-5 h-5 self-center text-yellow-50" />
              <div className="font-light text-muted-foreground text-yellow-50">{challengeAmount}</div>
            </div>
          </CardFooter>
        </Card>
      </ToastProvider>
    </div>
  );
}
