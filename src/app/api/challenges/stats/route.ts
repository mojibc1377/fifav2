import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export  async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' },{status:403});
  }

  try {
    const totalChallenges = await db.challenge.count();
    const noAccepterChallenges = await db.challenge.count({
      where: { accepterId: null },
    });
    const acceptedChallenges = await db.challenge.count({
      where: { NOT: { accepterId: null } },
    });
    const completedChallenges = await db.challenge.count({
        where: {
            AND: [
              { NOT: { accepterId: null } },
              { winner: {
                isEmpty : false
              } } ,
            ],
          },
    });

    return NextResponse.json({
      totalChallenges,
      noAccepterChallenges,
      acceptedChallenges,
      completedChallenges,
    },{status:200});
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching challenge stats' },{status:500});
  }
}
