// src/pages/api/rewards/index.ts

import { db } from '../../../lib/db';  // Adjust the import path according to your structure
import { NextResponse } from 'next/server';

export async function GET(req:Request) {
  try {
    const rewards = await db.reward.findMany();
    return NextResponse.json( rewards, {status:200});
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching rewards'}, {status:500} );
  }
}
