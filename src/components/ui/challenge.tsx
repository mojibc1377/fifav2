'use client'

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AiOutlineLoading } from 'react-icons/ai';
import { CircleUser, Gem } from 'lucide-react';
import { LuLoader2 } from 'react-icons/lu';
import { useToast } from './use-toast';
import { ToastProvider } from '@radix-ui/react-toast';
import More from '@/app/challenges/more/page';
import { Challenge } from '@prisma/client';

type ChallengeCardProps = {
  challenge: Challenge;
  type: string;
  status: boolean;
};

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, type, status }) => {
  const { toast } = useToast();
  const { gameName, consoleType, challengeAmount, createdAt, mode } = challenge; // Added mode
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleLoaderClick = () => {
    toast({
      title: 'Challenge Status',
      description: 'Your challenge is still not accepted by any other users.',
      duration: 3000,
    });
  };

  const handleAcceptClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/challenges/accept?challengeId=${challenge.id}`, {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: 'Challenge Accepted',
          description: 'You can proceed further in the accepted tag.',
          duration: 3000,
        });

        // Trigger fade-out effect
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // Duration of the fade-out transition
      } else if (response.status === 409) {
        toast({
          title: 'Challenge Already Accepted',
          description: 'Another user just accepted this challenge. Please refresh the page.',
          duration: 3000,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error || 'Something went wrong',
          duration: 3000,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error accepting challenge:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        duration: 3000,
      });
    }
  };

  const gameImageSrc = gameName === 'fc24' ? '/challengeImage/eafc24.jpg' : '/challengeImage/eafc24.jpg';
  const consoleImageSrc = consoleType == 'ps5' ? '/challengeImage/ps5.png' : '/challengeImage/ps4.png';

  if (!isVisible) return null;

  return (
    <div className="">
        <Card className={`w-max card h-72 bg-secondary mt-3 mb-1 bg-opacity-5 shadow-inner border-solid  sliding-div transition-opacity duration-500', ${ isFadingOut ? 'opacity-0':'' }`}>
          <CardHeader className="flex flex-row gap-3 align-middle text-left justify-center">
            <CardTitle>
              <img src={gameImageSrc} alt="game" className="w-28 mix-blend-lighten" />
            </CardTitle>
            <div className=' flex flex-row gap-1 items-center'>
                <div>{challengeAmount}</div>
                <Gem size={18}/>
              </div>
            </CardHeader>
          <CardContent>
            <div className="challenge-card flex flex-col gap-6">
            <div className="flex flex-row gap-2 items-center">
                <img className="w-8 mr-1" src={mode !== 'fut' ? (mode !== 'kick-off' ? '/challengeImage/modes/95.png' : '/challengeImage/modes/kickoff.png') : '/challengeImage/modes/ultimate.png'} alt="mode" />
                <p className="text-muted-foreground">{mode}</p>
                
              </div>
              <img className="w-20" src={consoleImageSrc} alt="console" />
              
              <div className="flex flex-row text-left justify-between gap-1">
                <div className="flex flex-row gap-1">
                  <CircleUser className="h-6 w-6" />
                  <CardDescription className="text-muted-foreground animate-pulse pt-0.5">{new Date(createdAt).toDateString()}</CardDescription>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row align-middle justify-between gap-5">
            {challenge.accepterId ? (
              <More challengerId={challenge.challengerId} accepterId={challenge.accepterId} challengeId={challenge.id} price={challenge.challengeAmount} date={new Date(createdAt).toDateString()} />
            ) : type === 'my' ? (
              status === true ? (
                <More challengerId={challenge.challengerId} accepterId={Number(challenge.accepterId)} challengeId={challenge.id} price={challenge.challengeAmount} date={new Date(createdAt).toDateString()} />
              ) : (
                <button onClick={handleLoaderClick}>
                  <LuLoader2 className="animate-spin mt-3 text-blue-300 text-2xl" />
                </button>
              )
            ) : (
              <button onClick={handleAcceptClick} className="w-max md:w-auto ml-0 md:ml-0 px-5 py-2 bg-[#5b6081] hover:bg-[#4c5275] hover:text-blue-300 text-blue-100 rounded-sm">
                {loading ? <AiOutlineLoading className="mx-4 my-1 animate-spin" /> : 'Accept'}
              </button>
            )}
          </CardFooter>
        </Card>
    </div>
  );
};

export default ChallengeCard;
