// route.ts

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import * as z from "zod"
const ChallengeSchema = z.object({
  gameType: z.enum(['fc24', 'fc25']).optional(), // Enum for game types
  consoleType: z.string().min(1, "Console type is required"),
  price: z.number().min(100, "Price must be at least 10 coins").max(1000, "Price cannot exceed 100 coins"),
  mode : z.enum(['kick-off', '95-overall', 'fut'])
});

export async function POST (req:Request)  {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" });
      }
      const body = await req.json();

      const { gameType, consoleType, price, mode } = ChallengeSchema.parse(body);

      const user = await db.user.findUnique({
        where: { id: Number(session.user.id) },
        select: { credit: true },
      });

      if (!user || user.credit < price) {
        // Insufficient funds
        return NextResponse.json({ error : "insuficient funds" ,message: "please charge your account" }, { status: 402 });

      }

      // Create the new challenge in the database
      const newChallenge = await db.challenge.create({
        data: {
          gameName: gameType || "ps5", // Default gameName if not provided
          consoleType,
          challengeAmount: price,
          challengerId: Number(session.user.id), // User ID who created the challenge
          mode,
        },
      });

      // Deduct the price from the user's credit after creating the challenge
      const updatedUser = await db.user.update({
        where: { id: Number(session.user.id) },
        data: {
          credit: {
            decrement: price, // Decrease the credit by the price of the challenge
          },
        },
      });
      return NextResponse.json({newChallenge , message:"challenge created successfully" }, {status:201})
    } catch (error) {
      console.error("Error adding challenge:", error);
      NextResponse.json({ error: "Internal Server Error" } ,{status:500});
    }
  } else {
    
    NextResponse.json("allow post")
  }
};
