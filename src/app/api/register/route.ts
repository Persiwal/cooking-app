import prisma from '@/app/_libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const DEFAULT_PASSWORD_SALT = 10;

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, DEFAULT_PASSWORD_SALT);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  return NextResponse.json(user);
}
