

import Results from '@/components/pages/home/Results';
import FeaturedRecipeCard from '@/components/ui/FeaturedRecipeCard/FeaturedRecipeCard';
import { Container } from '@radix-ui/themes';

export default async function Home() {
  const featuredRecipeRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/recipes');
  const featuredRecipe = await featuredRecipeRes.json();


  return (
    <Container>
      <FeaturedRecipeCard featuredRecipe={featuredRecipe[0]} />
      <h2>All recipes</h2>
      <Results />
    </Container >
  );
}
