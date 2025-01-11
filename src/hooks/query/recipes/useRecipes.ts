import { fetchRecipes } from '@/helpers/api-helpers/recipes';
import { useQuery } from 'react-query';

const useRecipes = () => {
  return useQuery('recipes', fetchRecipes, {
    onError: (error) => {
      console.error('Error fetching recipes:', error);
    },
  });
};

export default useRecipes;
