import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Chat from "@/components/ui/chat";
import { GrDocumentUpload } from "react-icons/gr";
import { Gem } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ToastProvider } from '@radix-ui/react-toast';
import { SessionProvider } from 'next-auth/react';


type MoreProps = {
  challengerId: number;
  accepterId: number;
  challengeId: number;
  price: number;
  date: string;
};

const More: React.FC<MoreProps> = ({ challengerId, accepterId, challengeId, price, date }) => {
  const [winner, setWinner] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState('http://www.google.com');
  const { toast } = useToast();


  const handleWinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinner(e.target.value);
  };

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!winner) {
      toast({
        title: 'Careful',
        description: 'Please select a winner first',
        duration: 3000,
        variant: "destructive"
      });
      return;
    }
  
    if (!screenshot) {
      toast({
        title: 'Careful',
        description: 'Please upload a screenshot too',
        duration: 3000,
        variant: "destructive"
      });
      return;
    }
  
    const body = { winner, screenshot };
    console.log(JSON.stringify(body))
    try {
      const response = await fetch(`/api/challenges/${challengeId}/results`, {
        method: 'POST',
       
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast({
          title: 'Results sent',
          description: 'Winner declared successfully.',
          duration: 3000,
        });
      } else {
        toast({
          title: 'Error',
          description: `${data.message}`,
          duration: 3000,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: "An unexpected error occurred",
        duration: 3000,
        variant: "destructive"
      });
    }
  };
  

  return (
    <ToastProvider>
    <div className="mt-1">
      <Dialog>
        <DialogTrigger className="">
          <button>
            <MdOutlineMoreHoriz className="text-blue-300 text-3xl pt-1 animate-pulse" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl items-start flex flex-row-reverse px-5 justify-between">
          <SessionProvider>
            <Chat challengerId={challengerId} accepterId={accepterId} challengeId={challengeId} />
          </SessionProvider>
          <div className="h-full flex pt-2 flex-col justify-evenly gap-5 items-start">
            <img src="/challengeImage/eafc24.jpg" alt="game" className="w-28 mix-blend-lighten" />
            <img className="w-20" src="/challengeImage/ps5.png" />
            <div className="text-muted-foreground animate-pulse pt-0.5">{(date.slice(0, 10)).replaceAll("-", "/")}</div>
            <div className="flex flex-row gap-1">
              <Gem className="w-5 h-5 self-center text-yellow-50" />
              <div className="font-light text-muted-foreground text-yellow-50">{price}</div>
            </div>
            <hr />
            <form onSubmit={handleSubmit} className="flex flex-col mt-2">
              <div>
              <h1>Winner:</h1>
              <div className="flex flex-col">
                <label>
                  <input type="radio" name="winner" value="challenger" onChange={handleWinnerChange} className="mr-2" required />
                  You 
                </label>
                <label>
                  <input type="radio" name="winner" value="accepter" onChange={handleWinnerChange} className="mr-2" required />
                  Opp 
                </label>
              </div>
              <h1>screenshot:</h1>

              <div className="file-upload p-1 cursor-pointer w-min">
              <GrDocumentUpload/>
             
              <input type="url" value={"http://google.com"} />
              </div>
            </div>
              <button type="submit" className="mt-4 px-2 fixed bottom-10 py-2 bg-blue-500 text-white rounded">
                Send Winner
              </button>

            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </ToastProvider>
  );
};

export default More;
