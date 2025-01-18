enum RecipeDifficulty {
  EASY,
  MEDIUM,
  HARD,
}

type Ingredient = {
  id: number;
  name: string;
};

type RecipeIngredient = {
  id: number;
  recipeId: number;
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
  id: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  title: string;
  description?: string;
  userId: string;
  cuisine?: string;
  difficulty: RecipeDifficulty;
  prepareTime: number;
  numberOfPortions: number;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
};
