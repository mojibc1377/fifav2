import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
const session = getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Forbidden' },{status:403});
  }

  try {
    const submissions = await db.submission.findMany({
      where: {  },
    });
     return NextResponse.json({submissions},{status:200});
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching submissions' },{status:500});
  }
}
