import { PrismaClient } from '@prisma/client';

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  try {
    return prisma.user.findMany();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
