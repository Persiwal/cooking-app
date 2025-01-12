import { fetchRecipes } from '@/helpers/api-helpers/recipes';
import { useQuery } from '@tanstack/react-query';

const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
};

export default useRecipes;
