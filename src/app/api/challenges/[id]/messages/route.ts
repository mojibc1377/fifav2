import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
  const id  = req.query;
  console.log(id)

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, {status : 401});
  }
 
  if (req.method === 'GET') {
    try {
      const challenge = await prisma.challenge.findUnique({
        where: { id: Number(id) },
        select: { messages: true },
      });

      if (!challenge) {
        return NextResponse.json({ error: 'Challenge not found' }, {status : 404});
      }

      return NextResponse.json({message:challenge.messages}, {status : 200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, {status : 500});
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, {status:405});
  }
}
