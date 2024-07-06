import { Button } from "@/components/ui/button"
import Chat from "@/components/ui/chat"
import {
  Dialog,
  DialogContent,
  
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GrDocumentUpload } from "react-icons/gr";



import { CircleUser, Gem } from "lucide-react"
import { MdOutlineMoreHoriz } from "react-icons/md";

export default function More() {
  return (
    <div className="mt-1">
    <Dialog>
      <DialogTrigger className="" >
      <button ><MdOutlineMoreHoriz className="text-blue-300 text-3xl pt-1 animate-pulse"/></button>      </DialogTrigger>
      <DialogContent className=" max-w-2xl items-start flex flex-row-reverse px-5 justify-between">
        <Chat/>
        <div className="h-full flex pt-2 flex-col justify-evenly gap-5 items-start">
            <img src="/challengeImage/eafc24.jpg" alt="game" className=" w-28 mix-blend-lighten"></img>
            <img className="w-20" src="/challengeImage/ps5.png"></img>
            <div className="text-muted-foreground animate-pulse pt-0.5">{Date().slice(4,16)}</div> 
            <div className="flex flex-row gap-1">
                <Gem className="w-5 h-5 self-center text-yellow-50" />
                <div className="font-light text-muted-foreground text-yellow-50">15</div>
            </div>
            <hr/>
            <div className="flex flex-col gap-2 mt-2">
                <h1>winner:</h1>
                <div className="flex flex-col ">
              <label>
                <input
                  type="checkbox"
                  value="fc24"
                  className=" mr-2"
                  required
                />
                You
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fc25"
                  className=" mr-2"
                  required
                />
                Opp
              </label>
            </div>
            </div>
            <div className="flex flex-col gap-2">
            <h1>Upload:</h1>
         <GrDocumentUpload/>
         </div>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}
