import prisma from '@/app/_libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const DEFAULT_PASSWORD_SALT = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, DEFAULT_PASSWORD_SALT);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  return NextResponse.json(user);
  } catch(error: any) {

    if (error.code === "P2002" && error.meta.target === "User_name_key") {
      console.error(error);
      return NextResponse.json({ error: "User with that username already exists." }, { status: 400 });
    }

    if (error.code === "P2002" && error.meta.target === "User_email_key") {
      console.error(error);
      return NextResponse.json({ error: "User with that email already exists." }, { status: 400 });
    }

    console.error(error)
    throw error;
  }

}
