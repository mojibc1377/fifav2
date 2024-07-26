import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

const SubmissionSchema = z.object({
  screenshot: z.string().url(),
});

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const userId = Number(session.user.id);
    const body = await req.json();
    const { screenshot } = SubmissionSchema.parse(body);

    const newSubmission = await db.submission.create({
      data: {
        userId,
        rewardId: Number(id),
        screenshot,
      },
    });

    // Fetch the current submittedUserIds
    const reward = await db.reward.findUnique({
      where: { id: Number(id) },
      select: { submittedUserIds: true },
    });

    if (!reward) {
      return NextResponse.json({ message: "Reward not found" }, { status: 404 });
    }

    // Convert all user IDs to numbers and append the new userId to the array
    const updatedSubmittedUserIds = [...reward.submittedUserIds.map(Number), userId];

    // Update the reward with the new submittedUserIds array
    await db.reward.update({
      where: { id: Number(id) },
      data: {
        submittedUserIds: updatedSubmittedUserIds,
      },
    });

    return NextResponse.json({ newSubmission, message: "Submission created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json({ message: "Error creating submission" }, { status: 500 });
  }
}
