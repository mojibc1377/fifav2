import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';


export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (req.method === 'POST') {
    
    try {
      const body = await req.json()
      const { winner, screenshot } = body;


      const challenge = await db.challenge.findUnique({
        where: { id: Number(id) },
      });

      if (!challenge) {
        return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
      }

      const winnerId = winner == 'challenger' ? challenge.challengerId : challenge.accepterId;
      if (!winnerId) {
        return NextResponse.json({ error: 'Winner ID not found' }, { status: 400 });
      }

      // Update the challenge with the winner information and screenshot
      await db.challenge.update({
        where: { id: Number(id) },
        data: {
          winner: 
            {push : winnerId?.toString()}
          ,
          resultPhoto: 
            { push : screenshot?.toString()}
          
        },
      });
      return NextResponse.json({ message: 'Winner declared successfully' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
