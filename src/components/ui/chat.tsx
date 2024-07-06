import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
  } from "lucide-react"
  import { FaArrowDown } from "react-icons/fa6";

  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
  export default function Chat() {
    return (
        <TooltipProvider>
      <div className="grid w-full">
         
        <div className="flex flex-col">
     
          <main className="grid  gap-4 overflow-auto p-4  lg:grid-cols-2">
            
            <div className="relative flex h-full min-h-[50vh]  flex-col rounded-xl bg-background/50 p-3 lg:col-span-2">
              <Badge variant="outline" className="absolute bg-secondary-foreground text-background right-3 top-3">
                Chat with your challenger
              </Badge>
              <div className="flex-1" />
              <form
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <div className="flex flex-row">
                <Textarea
                  id="message"
                  placeholder="Type your message ..."
                  className="min-h-5 resize-none border-0 placeholder:text-italic placeholder:pt-2 placeholder:font-light p-3 focus-within:placeholder:invisible shadow-none bg-background focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-2">
             
                  <Button type="submit" size="sm" className="ml-auto bg-transparent ">
                     <FaArrowDown size={15} className=" rotate-180 text-secondary"/>

                  </Button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      </TooltipProvider>
    )
  }
  