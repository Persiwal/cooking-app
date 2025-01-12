import prisma from '@/libs/prismadb';
import bcrypt from 'bcrypt';

const DEFAULT_PASSWORD_SALT = 10;

export async function POST(request: Request) {
  try {
    console.log(request.body);
    const body = await request.json();
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, DEFAULT_PASSWORD_SALT);

    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return Response.json({
      data: user,
      message: 'Successfully created account.',
    });
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta.target.includes('name')) {
      return Response.json(
        { error: 'User with that username already exists.' },
        { status: 409 }
      );
    }

    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      return Response.json(
        { error: 'User with that email already exists.' },
        { status: 409 }
      );
    }

    return Response.json({
      error: 'An error occurred while creating the account.',
      status: 500,
    });
  }
}
