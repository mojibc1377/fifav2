// pages/api/challenges/index.ts

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
    

      const challenges = await db.challenge.findMany({
        select: {
          id: true,
          createdAt: true,
          challengerId: true,
          accepterId: true,
          challengeAmount : true,
          consoleType : true,
          mode : true
        },
      });

      return NextResponse.json(challenges,{status:200} )
    } catch (error) {
      console.error("Error fetching challenges:", error);
      return NextResponse.json({ error: "Internal Server Error" } ,{status : 500});
    }
  } else {
    return NextResponse.json({ error: "method not allowed" } ,{status : 405});
  }
}
