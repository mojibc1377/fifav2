// app/api/challenges/accept/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const challengeId = searchParams.get('challengeId');

    if (!challengeId) {
      return NextResponse.json({ error: 'Challenge ID is required' }, { status: 400 });
    }

    const userId = Number(session.user.id);

    // Find the challenge
    const challenge = await db.challenge.findUnique({
      where: { id: Number(challengeId) },
    });

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
    }

    if (challenge.accepterId) {
      return NextResponse.json({ error: 'Challenge already accepted' }, { status: 409 });
    }

    // Check if user has enough credit
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { credit: true },
    });

    if (!user || user.credit < challenge.challengeAmount) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 402 });
    }

    // Update the challenge's accepterId and decrease user's credit
    await db.challenge.update({
      where: { id: Number(challengeId) },
      data: { accepterId: userId },
    });

    await db.user.update({
      where: { id: userId },
      data: {
        credit: {
          decrement: challenge.challengeAmount,
        },
      },
    });

    return NextResponse.json({ message: 'Challenge accepted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error accepting challenge:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
