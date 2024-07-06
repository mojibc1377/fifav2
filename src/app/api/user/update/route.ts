// pages/api/user/update.js
import { getSession } from 'next-auth/react';

import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST ( req: Request){
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, {status:405});
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, {status:401});
  }
  const body = await req.json();

  const { email, name, lastName, phone, userName, password, currentPassword } = body;

  try {
    const user = await db.user.findUnique({
      where: { id: Number(session.user.id) },
    });

    if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
      return NextResponse.json({ message: 'Current password is incorrect' }, {status:403});
    }

    const updatedData = {
      email,
      name,
      lastName,
      phone,
      userName,
      password
    };

    if (password) {
      updatedData.password = bcrypt.hashSync(password, 10);
    }

    await db.user.update({
      where: { id: Number(session.user.id) },
      data: updatedData,
    });

    return NextResponse.json({ message: 'User updated successfully' }, {status:200});
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, {status:500});
  }
};
