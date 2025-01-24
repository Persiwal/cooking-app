import { NewRecipe } from '@/types/recipe';

const fetchRecipes = async () => {
  const response = await fetch('/api/recipes');
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

const createRecipe = async (recipe: NewRecipe) => {
  console.log(recipe);

  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to create recipe');
  }
  return response.json();
};

export { createRecipe, fetchRecipes };
