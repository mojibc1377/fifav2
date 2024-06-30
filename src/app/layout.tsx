import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  Headset,
  Menu,
  Swords,
  Package2,
  Search,
  Trophy,
  UserCog,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChampsPlus+",
  description: "developed by MojiBc",
};
export default function RootLayout({
  children,
  activePath,
}: Readonly<{
  children: React.ReactNode;
  activePath: string;
}>) {

  // Function to check if the link is active
  const isActive = (path: string) => activePath === path;

  return (
    <html lang="en" className="dark">
      <body>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full justify-between max-h-screen flex-col gap-2">
              <div>
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground animate-pulse transition-all hover:text-primary ${isActive("/") ? "italic" : ""}`}>
                    <img src="/ea-logo.png" className="w-9" />
                  <span className="text-white">ChampsPlus+</span>
                </Link>
              </div>
              <div className="flex-1 mt-3 sliding-div">
                <nav className="grid items-start gap-3 px-2 text-sm font-medium lg:px-4">
                  <Link
                    href="/"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/") ? "italic" : ""}`}>
                  
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    href="/tournoments"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive("/tournoments") ? "italic" : ""}`}>
                  
                    <Trophy className="h-4 w-4" />
                    Tournaments
                  </Link>
                  <Link
                    href="/challenges"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Swords className="h-4 w-4" />
                    Challenges
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <UserCog className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/support"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Headset className="h-4 w-4" />
                    Support
                  </Link>
                </nav>
              </div>
              </div>
              <div>
              <div className="mt-auto p-4 sliding-div bottom-0">
                <Card x-chunk="dashboard-02-chunk-0  ">
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our support
                      team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Button size="sm" className="w-full bg-[#5b6081] hover:bg-[#4c5275] text-white">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5 text-white" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="/"
                      className="flex items-center gap-2 mb-5 font-thin"
                    >
                      <img src="/ea-logo.png" className="w-9" />
                      <span className="text-white">ChampsPlus+</span>
                    </Link>
                    <Link
                      href="/"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                    <Link
                      href="/tournoments"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Trophy className="h-5 w-5" />
                      Tournaments
                    </Link>
                    <Link
                      href="/challenges"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Swords className="h-5 w-5" />
                      Challenges
                    </Link>
                    <Link
                      href="/dashboard"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <UserCog className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/support"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Headset className="h-5 w-5" />
                      Support
                    </Link>
                  </nav>
                  <div className="mt-auto">
                    <Card className=" self-end">
                      <CardHeader>
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                          Unlock all features and get unlimited access to our
                          support team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button size="sm" className="w-full bg-[#5b6081] hover:bg-[#4c5275]">
                          Upgrade
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search Challenges..."
                      className="w-full appearance-none text-white bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                  </div>
                </form>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/dashboard'}>Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}

      </div>
    </div>
    </body>
    </html>
  );
}
