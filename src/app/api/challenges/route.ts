// pages/api/challenges/index.ts

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(authOptions);
    

      const challenges = await db.challenge.findMany({
        include: {
          challenger: true,
          accepter: true,
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
