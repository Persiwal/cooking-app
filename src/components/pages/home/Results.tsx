"use client"

import useRecipes from '@/hooks/query/recipes/useRecipes';
import useTranslationsObject from '@/hooks/useTranslationsObject';
import { Box, Container, Heading, Text } from '@radix-ui/themes';

const Results = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const t = useTranslationsObject('pages.home.results');

  if (isLoading) return <Text>{t.LOADING}</Text>;
  if (error) return <Text>{t.ERROR}</Text>;
  if (recipes.length === 0) return <Text>{t.NO_RECIPES}</Text>;

  return (
    <Container>
      {recipes.map((recipe: any) => (
        <Box key={recipe.id}>
          <Heading>{recipe.title}</Heading>
          <Text>{recipe.description}</Text>
        </Box>
      ))}
    </Container>
  );
};

export default Results;