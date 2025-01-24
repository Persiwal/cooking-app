'use client';

import BackgroundImage from '@/components/ui/BackgroundImage/BackgroundImage';
import useRecipes from '@/hooks/query/recipes/useRecipes';
import useTranslationsObject from '@/hooks/useTranslationsObject';
import { Recipe } from '@/types/recipe';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import styles from './Results.module.scss';

const Results = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const t = useTranslationsObject('pages.home.results');

  if (isLoading) return <Text>{t.LOADING}</Text>;
  if (error) return <Text>{t.ERROR}</Text>;
  if (recipes.length === 0) return <Text>{t.NO_RECIPES}</Text>;


  return (
    <Container>
      <Flex wrap="wrap">
        {recipes.map((recipe: Recipe) => (
          <Box key={recipe.id} className={styles.box}>
            <BackgroundImage img={recipe.image || `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/elementor-placeholder-image_jpuhxr.webp`} />
            <Flex p="4" width="100%" justify="end" height="100%" direction="column" wrap="wrap">
              <Heading style={{ color: 'white' }}>{recipe.title}</Heading>
            </Flex>
          </Box>
        ))}</Flex>
    </Container>
  );
};

export default Results;
