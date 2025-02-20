import RecipeDetails from '@/components/pages/recipe-details/RecipeDetails';
import prisma from '@/libs/prismadb';
import { Recipe } from '@/types/recipe';

export default async function Page({
    params,
}: {
    params: Promise<{ recipeId: string }>
}) {
    const id = (await params).recipeId

    const recipe = await prisma.recipe.findUnique({
        where: { id: parseInt(id) },
        include: {
            ingredients: {
                include: {
                    ingredient: true
                }
            },
            steps: true,
            user: true,
        },
    });

    if (!recipe) {
        return <div>Recipe not found</div>;
    }


    return <div>
        <RecipeDetails recipe={recipe as unknown as Recipe} />
    </div>
}