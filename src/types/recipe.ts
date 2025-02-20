import { User } from 'next-auth';

enum RecipeDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

type Ingredient = {
  id: number;
  name: string;
};

type RecipeIngredient = {
  id: number;
  recipeId: number;
  ingredient: Ingredient;
  ingredientId: number;
  quantity: number;
  unit: string;
};

type RecipeStep = {
  id: number;
  recipeId: number;
  order: number;
  content: string;
};

type Recipe = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  title: string;
  description?: string;
  userId: number;
  user: User;
  cuisine?: string;
  difficulty: RecipeDifficulty;
  prepareTime: number;
  numberOfPortions: number;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
};

type NewRecipe = {
  image?: string;
  title: string;
  description?: string;
  userEmail: string;
  cuisine?: string;
  difficulty: RecipeDifficulty;
  prepareTime: number;
  numberOfPortions: number;
  steps: NewRecipeStep[];
  ingredients: NewRecipeIngredient[];
};

type NewRecipeStep = {
  order: number;
  content: string;
};

type NewRecipeIngredient = {
  //recipeId: number;
  ingredientId: number;
  quantity: number;
};

export { RecipeDifficulty };
export type { Ingredient, NewRecipe, Recipe, RecipeIngredient, RecipeStep };
