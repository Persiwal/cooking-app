import prisma from '@/libs/prismadb';

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return new Response(JSON.stringify(ingredients), {
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
