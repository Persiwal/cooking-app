import { fetchIngredients } from '@/helpers/api-helpers/ingredients';
import { useQuery } from '@tanstack/react-query';

export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  });
};
