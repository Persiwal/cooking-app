'use client';

import useRecipes from '@/hooks/query/recipes/useRecipes';
import useTranslationsObject from '@/hooks/useTranslationsObject';
import { Recipe } from '@/types/recipe';
import { Card, Container, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './Results.module.scss';
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard';

const Results = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const t = useTranslationsObject('pages.home.results');

  if (isLoading) return <Text>{t.LOADING}</Text>;
  if (error) return <Text>{t.ERROR}</Text>;
  if (recipes.length === 0) return <Text>{t.NO_RECIPES}</Text>;


  return (
    <Container>
      <Flex wrap="wrap" gap="2" justify="between">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe}/>
        ))}
      </Flex>
    </Container>
  );
};

export default Results;
