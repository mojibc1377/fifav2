import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  const session = await getServerSession(authOptions);
  

  if (!session || !(session?.user.isAdmin)) {
    return NextResponse.json({ message: 'Forbidden' },{status : 403});
  }

  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' },{status:405});
  }

  try {
    const submission = await db.submission.update({
      where: { id: Number(id) },
      data: { approved: true },
    });

    const { userId, rewardId } = submission;

    // Fetch the reward amount
    const reward = await db.reward.findUnique({
      where: { id: rewardId },
    });

    if (reward) {
      const amount = reward.amount;

      // Update user credits
      await db.user.update({
        where: { id: userId },
        data: {
          credit: {
            increment: amount,
          },
        },
      });

      // Create a transaction
      await db.transaction.create({
        data: {
          amount,
          userId,
        },
      });

      // Delete the submission
      await db.submission.delete({
        where: { id: Number(id) },
      });
    }

     return NextResponse.json({ message: 'Submission approved successfully' },{status:200});
  } catch (error) {
     return NextResponse.json({ message: 'Error approving submission' },{status:500});
  }
}
