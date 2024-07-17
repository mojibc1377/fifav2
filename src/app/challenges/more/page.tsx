import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Chat from "@/components/ui/chat";
import {GrDocumentUpload} from "react-icons/gr"
import { Gem } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';

type MoreProps = {
  challengerId: number;
  accepterId: number;
  challengeId : number;
  price : number;
  date : string;
};

const More: React.FC<MoreProps> = ({ challengerId, accepterId, challengeId, price, date }) => {
  return (
    <div className="mt-1">
      <Dialog>
        <DialogTrigger className="">
          <button>
            <MdOutlineMoreHoriz className="text-blue-300 text-3xl pt-1 animate-pulse" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl items-start flex flex-row-reverse px-5 justify-between">
          <SessionProvider>
          <Chat challengerId={challengerId} accepterId={accepterId} challengeId={ challengeId} />
          </SessionProvider>
          <div className="h-full flex pt-2 flex-col justify-evenly gap-5 items-start">
            <img src="/challengeImage/eafc24.jpg" alt="game" className="w-28 mix-blend-lighten" />
            <img className="w-20" src="/challengeImage/ps5.png" />
            <div className="text-muted-foreground animate-pulse pt-0.5">{(date.slice(0,10)).replaceAll("-","/")}</div>
            <div className="flex flex-row gap-1">
              <Gem className="w-5 h-5 self-center text-yellow-50" />
              <div className="font-light text-muted-foreground text-yellow-50">{price}</div>
            </div>
            <hr />
            <div className="flex flex-col gap-2 mt-2">
              <h1>winner:</h1>
              <div className="flex flex-col">
                <label>
                  <input type="checkbox" value="fc24" className="mr-2" required />
                  You
                </label>
                <label>
                  <input type="checkbox" value="fc25" className="mr-2" required />
                  Opp
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Upload:</h1>
              <GrDocumentUpload />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default More;
