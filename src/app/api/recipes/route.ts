import prisma from '@/libs/prismadb';
import { NewRecipe } from '@/types/recipe';

export async function GET() {
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

export async function POST(request: Request) {
  const requestBody: NewRecipe = await request.json();
  console.log(requestBody);

  try {
    const user = await prisma.user.findUnique({
      where: { email: requestBody.userEmail },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    const recipe = await prisma.recipe.create({
      data: {
        title: requestBody.title,
        image: requestBody.image,
        description: requestBody.description,
        cuisine: requestBody.cuisine,
        difficulty: requestBody.difficulty,
        prepareTime: requestBody.prepareTime,
        numberOfPortions: requestBody.numberOfPortions,
        ingredients: {
          createMany: {
            data: requestBody.ingredients.map((ingredient) => ({
              ingredientId: ingredient.ingredientId,
              quantity: ingredient.quantity,
            })),
          },
        },
        steps: {
          createMany: {
            data: requestBody.steps.map((step) => ({
              order: step.order,
              content: step.content,
            })),
          },
        },
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(recipe), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(JSON.stringify(error));
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
