import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import * as z from 'zod';

// Schema input validation
const CreditSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const { amount } = CreditSchema.parse(body);

    // Update user's credit
    const updatedUser = await db.user.update({
      where: { id: Number(userId) },
      data: {
        credit: {
          increment: amount,
        },
      },
    });

    // Log the transaction
    await db.transaction.create({
      data: {
        amount,
        userId: Number(userId),
      },
    });

    const { password, ...rest } = updatedUser;
    return NextResponse.json({ user: rest, message: 'Credit updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error updating credit:", error);
    return NextResponse.json({ message: 'Error updating credit' }, { status: 500 });
  }
}
