import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextApiRequest,{params} : {params: {id : string}} ) {
  const  id  = params.id
  
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, {status : 401});
  }

  if (req.method === 'GET') {
    try {
      const userId = Number(id);

      if (isNaN(userId)) {
        return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
      }

      const transactions = await db.transaction.findMany({
        where: { userId: userId },
        orderBy: { timestamp: 'desc' },
      });

      return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }
}
