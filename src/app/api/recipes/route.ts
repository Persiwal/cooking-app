import prisma from '@/libs/prismadb';
import { NextApiResponse } from 'next';

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: true,
        user: true,
        steps: true,
      },
    });

    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
