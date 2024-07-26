import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export async function GET(req:NextApiRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' },{status:403});
  }

  try {
    const challenges = await db.challenge.findMany({
      where: {
         winner: {
            isEmpty : false
           },
      },
    });

    return NextResponse.json({ challenges },{status:200});
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching challenges' },{status:500});
  }
}
